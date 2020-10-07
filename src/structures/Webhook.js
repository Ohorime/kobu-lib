'use strict';

class Webhook {
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