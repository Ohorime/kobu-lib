'use strict';

const WebSocket = require('./Websocket');

/**
 * @extends WebSocket
 */
class Client extends WebSocket {
    /**
     * Options of Client
     * @param {import('../util/Constants').DefaultOptions} options 
     */
    constructor(options = {}) {
        super(options);
    };
};

module.exports = Client;