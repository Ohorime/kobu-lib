'use strict';

const { EventEmitter } = require('events');
const WebSocketClient = require('ws');
const { concat } = require('./../util/Util');
const { defaultOptions } = require('./../util/Constants');
const erlpack = require('erlpack');
const axios = require('axios');
const SendManagerNoSync = require('./SendManagerNoSync');

/**
 * @extends EventEmitter
 */
class WebSocket extends EventEmitter {
  /**
     * Options of WebSocket
     * @param {*} options
     */
  constructor(options) {
    super();
    this.options = concat(defaultOptions, options);

    /**
     * @type {string}
     */
    this.wsURL;

    /**
         * @type {string}
         */
    this.token;

    /**
         * @type {WebSocketClient}
         */
    this.ws;

    /**
         * @type {number}
         */
    this.heartbeat;

    /**
     * @type {any}
     */
    this.heartbeat_interval;

    /**
     * @type {any}
     */
    this.ack_timeout

    /**
         * @type {number}
         */
    this.sequence = null;
    /**
         * @type {boolean}
         */
    this.ack = false;
    /**
         * @type {string}
         */
    this.session_id = null;
    /**
         * @type {number}
         */
    this.ping = null;
    /**
         * @type {number}
         */
    this.lastSend = null;
    /**
     * @type {number}
     */
    this.shardID = process.env.shardID || 0;
    /**
     * @type {number}
     */
    this.shardCount = process.env.shardCount || 1;
    /**
     * @type {boolean}
     */
    this.maintained = false;
    /**
     * @type {any[][]}
     */
    this.queue = [];
    /**
     * @type {SendManagerNoSync}
     */
    this.sendManager;
  };

  /**
     * Connect to Discord WebSocket
     * @param {string} token
     */
  async connect(token) {
    await new Promise(async (resolve) => {
      // Check if token is valid
      if (!token || token == '') throw Error('Invalid token');
      // Save token
      this.token = token;

      // Fetch endpoint
      this.wsURL = await this.getEndpoint();

      this.emit('debug', `[SHARD ${this.shardID}] Websocket connect with url ${this.wsURL}`);

      this.emit('debug', `[SHARD ${this.shardID}] Token use ****.${token.slice(token.length - 5, token.length)}`);

      // Connect to Discord WebSocket
      this.ws = new WebSocketClient(
        `${this.wsURL}?v=8&encoding=etf`);

      this.sendManager = new SendManagerNoSync(this.ws);

      this.ws.on('open', (...args) => console.log('event open', ...args));

      // Log close and error event
      this.ws.on('close', (...args) => this.handleClose(...args));

      this.ws.on('error', (code, reason) => {
        console.log('event error', code, reason);
      });

      // Listen event message
      this.ws.on('message', (message) => this.handleMessage(message, resolve));
    });
  };

  identify() {
    this.sendManager.send(2, {
      token: this.token,
      properties: {
        $os: require('os').platform(),
        $browser: 'kobu-lib',
        $device: 'kobu-lib',
      },
      intents: this.options.intents,
      compress: false,
      large_threshold: this.options.large_threshold,
      guild_subscriptions: this.options.guild_subscriptions,
      shard: this.options.shard,
    },
    );
  };

  handleMessage(message, next) {
    // Decode message
    const json = erlpack.unpack(message);

    // Emit raw
    this.emit('raw', json);

    // save sequence
    this.sequence = json.s ? json.s : this.sequence;

    switch (json.op) {
      case 0:
        this.emit('debug', `Message received ${json.t} (length: ${JSON.stringify(json).length})`);
        if (json.t === 'READY') this.session_id = json.d.user.session_id;
        // Emit every event
        this.emit(json.t, json.d);
        break;
      case 10:
        this.emit('debug', `[SHARD ${this.shardID}] heartbeat received -> ${json.d.heartbeat_interval}`);
        // save heartbeat
        this.heartbeat = json.d.heartbeat_interval;

        // send heartbeat
        this.heartbeat_interval = setInterval(() => {
          // Save date
          this.lastSend = Date.now();
          // Send heartbeat
          this.sendManager.send(1, this.sequence);

          this.emit('debug', `[SHARD ${this.shardID}] Heartbeat send -> ${this.sequence} sequence`);

          // Wait 15s for receive ACK
          this.ack_timeout = setTimeout(() => {
            // If ACK is not received
            if (!this.ack) {
              this.emit('debug', `[SHARD ${this.shardID}] ACK not received, reconnecting ...`);
              // Close client
              this.close(false);
              // Log error ACK not reveived
              console.error(Error('Ack not receive'));
              // Reconnect to Discord WebSocket
              this.connect(this.token)
                .then(() => this.reconnect());
              // else reset ack to false
            } else this.ack = false;
          }, 15000);
        }, this.heartbeat);

        this.emit('debug', `[SHARD ${this.shardID}] Identification ...`);
        // indentify
        this.identify();

        // Execute all element
        this.sendManager.emptying();

        next();
        break;
      case 11:
        /* ACK */
        this.emit('debug', `[SHARD ${this.shardID}] ACK received`);
        // set ack for true
        this.ack = true;
        // set ping
        this.ping = Date.now() - this.lastSend;
        this.emit('ping', this.ping);
        break;
      case 9:
        /* INVALID SESSION */
        if (json.d) {
          this.reconnect();
        } else {
          console.log('Relogin after 5 seconds');
          setTimeout(() => this.connect(this.token), 5e3);
        };
        break;
      case 7:
        /* NEED RECONNECT */
        this.reconnect();
        break;
      default:
        console.log('OP not supported [%s]', json.op, json);
        break;
    };
  };

  handleClose() {
    clearInterval(this.heartbeat_interval);
    clearTimeout(this.ack_timeout);

    this.ws = null;
  };

  close(off = false) {
    this.ws.close(off ? 1000 : 4050);
  };

  /**
   * get ws endpoint
   */
  async getEndpoint() {
    return axios({
      url: this.options.http.baseURL + '/gateway',
      method: 'GET',
    }).then((response) => response.data?.url);
  };

  reconnect() {
    this.sendManager.send(6, {
      token: this.token,
      session_id: this.session_id,
      seq: this.sequence,
    });
  };
};

module.exports = WebSocket;
