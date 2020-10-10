'use strict';

/**
 * @typedef WebhookObject
 * 
 * @property {string} id
 * @property {number} type
 * @property {?string} guild_id
 * @property {string} channel_id
 * @property {?User} user
 * @property {string} name
 * @property {string} avatar
 * @property {?string} token
 */

class Webhook {
    /**
     * @param {import('./../client/Client')} client - Client
     * @param {WebhookObject} data - Webhook
     */
    constructor(client, data) {
        this.client = client;

        this.id = data.id;
        this.type = data.type;
        this.guild_id = data.guild_id;
        this.channel_id = data.channel_id;
        this.user = data.user;
        this.name = data.name;
        this.avatar = data.avatar;
        this.token = data.token;
    };
};

module.exports = Webhook;