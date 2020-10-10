'use strict';

/**
 * @typedef EmojiOptions
 * 
 * @property {string} id
 * @property {string} name
 * @property {?Role[]} roles
 * @property {?User[]} users
 * @property {?boolean} require_colons
 * @property {?boolean} managed
 * @property {?boolean} animated
 * @property {?boolean} available
 */

class Emoji {
    /**
     * @param {import('./../client/Client')} client - Client
     * @param {EmojiOptions} data - Emoji
     */
    constructor(client, data) {
        this.client = client;
        this.id = data.id;
        this.name = data.name;
        this.roles = data.roles;
        this.user = data.user;
        this.require_colons = data.requires_colons;
        this.managed = data.managed;
        this.animated = data.animated;
        this.available = data.available;
    };
};


module.exports = Emoji;