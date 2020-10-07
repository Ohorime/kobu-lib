'use strict';

class User {
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