'use strict';

const ClientUser = require('./../structures/ClientUser');

class Ready {
    constructor(client) {
        this.name = 'READY';
        this.client = client;
    };

    handle(data) {
        this.client.application = data.application;
        console.log(data.guilds[1]);
        this.client.private_channels = data.private_channels;
        this.client.session_id = data.session_id;
        this.client.user = new ClientUser(this.client, data);
    };
};

module.exports = Ready;
