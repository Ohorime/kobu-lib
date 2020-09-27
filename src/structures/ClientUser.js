'use strict';

const User = require('./User');

class ClientUser extends User {
    constructor(client, data) {
        super(client, data.user);
        this.client = client;
        this.presences = data.presences;
        this.relationships = data.relationships;
    };
};

module.exports = ClientUser;