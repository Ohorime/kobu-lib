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

        this.instance = {
            get: (...args) => this.request('GET', ...args),
            post: (...args) => this.request('POST', ...args),
            patch: (...args) => this.request('PATCH', ...args),
            put: (...args) => this.request('PUT', ...args),
            delete: (...args) => this.request('DELETE', ...args),
        };
    };

    /**
     * Make request
     * @param {'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'} method
     * @param {string} url
     * @param {{data: ?any, params: ?any, headers: ?any, bearer: 'Bot' | 'Bearer'}} data
     * @param {Promise<any>}
     */
    request(method, url, data) {
        return new Promise((resolve, reject) => {
            axios({
                url,
                method,
                data: data.data,
                headers: Object.assign(data.headers, {
                    Authorization: `${data.bearer || 'Bot'} ${this.token}`,
                    'Content-Type': 'application/json',
                }),
                withCredentials: true,
            }).then(resolve).catch(reject);
        });
    };
};

module.exports = Client;