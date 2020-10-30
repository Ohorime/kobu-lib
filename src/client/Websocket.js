'use strict';

const {EventEmitter} = require('events');
const WebSocketClient = require('ws');
const {concat} = require('./../util/Util');
const {defaultOptions} = require('./../util/Constants');

let erlpack;

try {
  erlpack = require('erlpack');
} catch (error) {};

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
  };

  /**
     * Connect to Discord WebSocket
     * @param {string} token
     */
  connect(token) {
    // Check if token is valid
    if (!token || token == '') throw Error('Invalid token');
    // Save token
    this.token = token;

    // Connect to Discord WebSocket
    this.ws = new WebSocketClient(
        `${this.options.ws.baseURL}&encoding=${erlpack ? 'etf' : 'json'}`);

    // Log close and error event
    this.ws.on('close', (...args) => console.log('event close', ...args));
    this.ws.on('error', (...args) => console.log('event error', ...args));

    // if has not erlpack
    if (!erlpack) {
      console.warn(`erlpack undetected !`);
      erlpack = {
        unpack: JSON.parse,
        pack: JSON.stringify,
      };
    };

    // Listen event message
    this.ws.on('message', (message) => {
      // Decode message
      const json = erlpack.unpack(message);

      // Emit raw
      this.emit('raw', json);

      // save sequence
      this.sequence = json.s;

      switch (json.op) {
        case 0:
          if (json.t === 'READY') this.session_id = json.d.user.session_id;
          // Emit every event
          this.emit(json.t, json.d);
          break;
        case 10:
          // save heartbeat
          this.heartbeat = json.d.heartbeat_interval;

          // send heartbeat
          setInterval(() => {
            // Save date
            this.lastSend = Date.now();
            // log heartbeat
            console.log('heartbeat %s', this.heartbeat);
            // Send heartbeat
            this.ws.send(erlpack.pack({
              op: 1,
              d: this.sequence,
            }));

            // Wait 15s for receive ACK
            setTimeout(() => {
              // If ACK is not received
              if (!this.ack) {
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

          // indentifation
          this.ws.send(erlpack.pack({
            op: 2,
            d: {
              token,
              properties: {
                $os: require('os').platform(),
                $browser: 'Ohorime core',
                $device: 'Ohorime core',
              },
              intents: this.options.intents,
            },
          }));
          break;
        case 11:
          // set ack for true
          this.ack = true;
          // set ping
          this.ping = Date.now() - this.lastSend;
          this.emit('ping', this.ping);
          break;
      };
    });
  };
};

module.exports = WebSocket;
