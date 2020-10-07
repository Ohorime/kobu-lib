'use strict';

class Emoji {
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