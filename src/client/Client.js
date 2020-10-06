'use strict';

const WebSocket = require('./Websocket');
const axios = require('axios');

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

        /**
         * @type {axios.AxiosInstance}
         */
        this.instance = axios.create({
            baseURL: this.options.http.baseURL,
            headers: {
                Authorization: `Bot ${this.token}`,
                'Content-Type': 'application/json',
            },
        });
    };
};

module.exports = Client;