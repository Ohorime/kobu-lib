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
    ws: {
        baseURL: 'wss://gateway.discord.gg/?v=6&encoding=etf',
        intents: 0 << 1,
    },
    http: {
        baseURL: 'https://discord.com/api/v6'
    },
};

module.exports = {
    defaultOptions,
};