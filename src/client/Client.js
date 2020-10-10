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
            get: (d) => this.request('GET', d),
            post: (d) => this.request('POST', d),
            patch: (d) => this.request('PATCH', d),
            put: (d) => this.request('PUT', d),
            delete: (d) => this.request('DELETE', d),
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
                params: data.params,
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