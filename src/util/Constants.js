'use strict';


/**
 * @typedef DefaultOptions
 *
 * @property {baseURL: string, intents: number} ws - Options of websocket
 * @property {{baseURL: string}} http - Options of HTTP REST request
 */

/**
 * @type {DefaultOptions}
 */
const defaultOptions = {
  http: {
    baseURL: 'https://discord.com/api/v8',
  },
  intents: 1 << 0,
  compress: false,
  large_threshold: 50,
  guild_subscriptions: false,
  shard: [
    parseInt(process.env.shardID) || 0,
    parseInt(process.env.shardCount) || 1,
  ],
};

module.exports = {
  defaultOptions,
};
