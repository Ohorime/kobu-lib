'use strict';

const { EventEmitter } = require('events');
const WebSocketClient = require('ws');
const erlpack = require('erlpack');
const { concat } = require('./../util/Util');

class WebSocket extends EventEmitter {
    constructor(options) {
        super();
        this.options = concat({
            ws: {
                baseURL: 'wss://gateway.discord.gg/?v=6&encoding=etf'
            },
            http: {
                baseURL: 'https://discord.com/api/v6'
            }
        }, options);

        this.token;

        this.ws;

        this.heartbeat;
        this.sequence = null;
        this.ack = false;
    };

    connect(token) {
        if (!token || token == '') throw Error('Invalid token');
        this.token = token;

        this.ws = new WebSocketClient(this.options.ws.baseURL);

        this.ws.on('close', (...args) => console.log('event close', ...args));
        this.ws.on('error', (...args) => console.log('event error', ...args));

        this.ws.on('message', (message) => {
            // Decode message
            const json = erlpack.unpack(message);

            // Emit raw
            this.emit('raw', json);

            // save sequence
            this.sequence = json.s;

            switch(json.op) {
                case 0:
                    //this.emit(json.t, json.d);
                    break;
                case 10:
                    // save heartbeat
                    this.heartbeat = json.d.heartbeat_interval;

                    // send heartbeat
                    setTimeout(() => {
                        console.log('heartbeat', this.heartbeat);
                        this.ws.send(erlpack.pack({
                            op: 1,
                            d: this.sequence,
                        }));

                        setTimeout(() => {
                            if (!this.ack) {
                                this.ws.close();
                                console.error(Error('Ack not receive'));
                                this.connect(this.token);
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
                            intents: 1 << 0
                        },
                    }));
                    break;
                case 11:
                    this.ack = true;
                    break;
            };
        });
    };
};

module.exports = WebSocket;