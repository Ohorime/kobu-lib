'use strict';

class User {
    constructor(client, data) {
        this.client = client;

        this.avatar = data.avatar;
        this.bot = data.bot;
        this.discriminator = data.discriminator;
        this.email = data.email;
        this.flags = data.flags;
        this.id = data.id;
        this.mfa_enabled = data.mfa_enabled;
        this.username = data.username;
        this.verified = data.verified;
    };
};

module.exports = User;