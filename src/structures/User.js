'use strict';

/**
 * @typedef UserObject
 * 
 * @property {string} id
 * @property {string} username
 * @property {string} discriminator
 * @property {string} avatar
 * @property {?boolean} bot
 * @property {?boolean} system
 * @property {?boolean} mfa_enabled
 * @property {?string} locale
 * @property {?boolean} verified
 * @property {?string} email
 * @property {?number} flags
 * @property {?number} premium_type
 * @property {?number} public_flags
 */

class User {
    /** 
     * @param {import('./../client/Client')} client - Client
     * @param {UserObject} data - User
     */
    constructor(client, data) {
        this.client = client;

        this.id = data.id;
        this.username = data.username;
        this.discriminator = data.discriminator;
        this.avatar = data.avatar;
        this.bot = data.bot;
        this.system = data.system;
        this.mfa_enabled = data.mfa_enabled;
        this.locale = data.locale,
        this.verified = data.verified;
        this.email = data.email;
        this.flags = data.flags;
        this.premium_type = data.premium_type;
        this.public_flags = data.public_flags;
    };
};

module.exports = User;