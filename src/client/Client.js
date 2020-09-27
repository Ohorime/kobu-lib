'use strict';

const WebSocket = require('./Websocket');

class Client extends WebSocket {
    constructor(options = {}) {
        super(options);

    };
};

module.exports = Client;