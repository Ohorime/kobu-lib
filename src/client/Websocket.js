'use strict';

const {EventEmitter} = require('events');
const WebSocketClient = require('ws');
const {concat} = require('./../util/Util');
const {defaultOptions} = require('./../util/Constants');
const erlpack = require('erlpack');
const axios = require('axios');

/**
 * @extends EventEmitter
 */
class WebSocket extends EventEmitter {
  #token;
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
         * @type {WebSocket}
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
  };

  destroy() {
    this.ws?.close(1000);
    clearInterval(this.heartbeat_interval);
    clearTimeout(this.ack_timeout);

    this.ws = null;
  };

  /**
     * Connect to Discord WebSocket
     * @param {string} token
     */
  async connect(token) {
    // Check if token is valid
    if (!token || token == '') throw Error('Invalid token');
    // Save token
    this.token = token;

    // Fetch endpoint
    this.wsURL = await this.getEndpoint();

    this.emit('debug', `[SHARD ${this.shardID}] Websocket connect with url ${this.wsURL}`);

    this.emit('debug', `[SHARD ${this.shardID}] Token use ****.${token.slice(token.length-5, token.length)}`);

    // Connect to Discord WebSocket
    this.ws = new WebSocketClient(
        `${this.wsURL}?v=8&encoding=etf`);

    this.ws.on('open', (...args) => console.log('event open', ...args));

    // Log close and error event
    this.ws.on('close', (...args) => {
      console.log('event close', ...args);
      this.destroy();
    });
    this.ws.on('error', (code, reason) => {
      if (code == 1001) {
        this.destroy()
        this.connect(this.token);
      };
      console.log('event error', code, reason);
    });

    // Listen event message
    this.ws.on('message', async (message) => {
      // Decode message
      const json = erlpack.unpack(message);

      // Emit raw
      this.emit('raw', json);

      // save sequence
      this.sequence = json.s;

      switch (json.op) {
        case 0:
          this.emit('debug', `[SHARD ${this.shardID}] message received ${json.t} (length: ${JSON.stringify(json).length})`);
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
            this.ws.send(erlpack.pack({
              op: 1,
              d: this.sequence,
            }));

            this.emit('debug', `[SHARD ${this.shardID}] Heartbeat send -> ${this.sequence} sequence`);

            // Wait 15s for receive ACK
            this.ack_timeout = setTimeout(() => {
              // If ACK is not received
              if (!this.ack) {
                this.emit('debug', `[SHARD ${this.shardID}] ACK not received, reconnecting ...`);
                // Close client
                this.ws.close();
                // Log error ACK not reveived
                console.error(Error('Ack not receive'));
                // Reconnect to Discord WebSocket
                this.connect(this.token);
                // else reset ack to false
              } else this.ack = false;
            }, 15000);
          }, this.heartbeat);

          if (this.maintained) {
            this.reconnect();
          } else {
            this.emit('debug', `[SHARD ${this.shardID}] Identification ...`);
            // indentifation
            this.ws.send(erlpack.pack({
              op: 2,
              d: {
                token,
                properties: {
                  $os: require('os').platform(),
                  $browser: 'kobu-lib',
                  $device: 'kobu-lib',
                },
                intents: this.options.intents,
                compress: this.options.compress,
                large_threshold: this.options.large_threshold,
                guild_subscriptions: this.options.guild_subscriptions,
                shard: this.options.shard,
              },
            }));

            this.maintained = true;
          };

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
            this.maintained = false;
            await new Promise((resolve) => setTimeout(resolve, 5e3));
            this.connect(this.token);
          };
          break;
        case 7:
          /* NEED RECONNECT */
          this.reconnect();
        default:
          console.log('OP not supported [%s]', json.op, json);
        break;
      };
    });
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
    this.emit('debug', `[SHARD ${this.shardID}] Reconnecting ...`);

    this.ws.send(erlpack.pack({
      op: 6,
      d: {
        token: this.token,
        session_id: this.session_id,
        seq: this.sequence,
      },
    }));
  };
};

module.exports = WebSocket;
