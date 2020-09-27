'use strict';

const WebSocket = require('./Websocket');
const axios = require('axios');

class Client extends WebSocket {
    constructor(options = {}) {
        super(options);

        this.guilds = new Map();

        this.instance = axios.create({
            baseURL: this.options.http.baseURL,
            headers: {
                Authorization: `Bot ${this.token}`,
                'Content-Type': 'application/json',
            },
        });
    };

    async createRequest() {

    };
};

module.exports = Client;