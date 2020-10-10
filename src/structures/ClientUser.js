'use strict';

const User = require('./User');

/**
 * @extends User
 */
class ClientUser extends User {
    /**
     * @param {import('./../client/Client')} client - Client
     * @param {{user: User, presences: Presences[], relationships: User[]}} data - ClientUser
     */
    constructor(client, data) {
        super(client, data.user);
        this.client = client;
        this.presences = data.presences;
        this.relationships = data.relationships;
    };
};

module.exports = ClientUser;