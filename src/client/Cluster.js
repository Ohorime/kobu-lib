'use strict';

const cluster = require('cluster');
const axios = require('axios');
const {
  defaultOptions: {http: {baseURL: httpURL}},
} = require('./../util/Constants');
const path = require('path');

/**
 * Simple class
 */
class Cluster {
  /**
   * Simple Constructor
   * @param {string} file
   * @param {string} token
   */
  constructor(file, token) {
    this.file = file;
    this.token = token;

    this.gateway;
  };

  /** */
  async spawn() {
    if (!cluster.isMaster) {
      return require(path.resolve(path.join(process.cwd(), this.file)));
    };
    if (!Boolean(this.gateway)) {
      this.gateway = await this.getGateway(this.token);
    };

    const gatewaySession = this.gateway.session_start_limit;

    if (gatewaySession.remaining <= 0) {
      console.log('[⚠] session limit exceeded %s/%s, please wait %s ms',
          gatewaySession.remaining, gatewaySession.total,
          gatewaySession.reset_after/Date.now());
    } else if (gatewaySession.remaining <= 100) {
      console.log('[⚠] session limit soon exceeded');
    };

    for (let i = 0; i < this.gateway.shards; i++) {
      cluster.fork({
        shardCount: this.gateway.shards,
        shardID: i,
      });
    };
  };

  /**
   * @param {string} [token=this.token]
   */
  async getGateway(token = this.token) {
    return await axios({
      url: `${httpURL}/gateway/bot`,
      method: 'GET',
      headers: {
        Authorization: `Bot ${token}`,
      },
    }).then((response) => response.data);
  };
};

module.exports = Cluster;
