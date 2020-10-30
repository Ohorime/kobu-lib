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
};

module.exports = {
  defaultOptions,
};
