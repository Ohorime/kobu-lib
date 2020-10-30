'use strict';

const WebSocket = require('./Websocket');
const axios = require('axios');

/**
 * @extends WebSocket
 */
class Client extends WebSocket {
  /**
   * @param {*} options
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
     * @param {*} data
     * @return {Promise<any>}
     */
  request(method, url, data) {
    return new Promise(async (resolve, reject) => {
      console.log(method, url, data);
      const req = await axios({
        url,
        method,
        data: data?.data,
        params: data?.params,
        headers: Object.assign(data?.headers, {
          'Authorization': `${data?.bearer || 'Bot'} ${this.token}`,
          'Content-Type': 'application/json',
        }),
        withCredentials: true,
      }).then((response) => response).catch((err) => err.response);

      resolve({
        status: req.status,
        data: req.data,
        error: req.axiosError,
      });
    });
  };
};

module.exports = Client;
