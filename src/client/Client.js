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
      get: (...d) => this.request('GET', ...d),
      post: (...d) => this.request('POST', ...d),
      patch: (...d) => this.request('PATCH', ...d),
      put: (...d) => this.request('PUT', ...d),
      delete: (...d) => this.request('DELETE', ...d),
    };
  };

  /**
     * Make request
     * @param {'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'} method
     * @param {string} url
     * @param {RequestData} data
     * @return {Promise<any>}
     */
  request(method, url, data) {
    return new Promise(async (resolve, reject) => {
      const req = await axios({
        url: `${this.options.http.baseURL}${url}`,
        method,
        data: data?.data,
        params: data?.params,
        headers: Object.assign({
          'Authorization': `${data?.bearer || 'Bot'} ${this.token}`,
          'Content-Type': 'application/json',
        }, data?.headers || {}),
        withCredentials: true,
      }).then((response) => response)
      .catch((err) => reject(err));

      resolve({
        status: req?.status,
        data: req?.data,
        error: req?.axiosError,
        response: req,
      });
    });
  };
};

module.exports = Client;
