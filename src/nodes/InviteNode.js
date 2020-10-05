'use strict';

class InviteNode {
    constructor(client, inviteCode) {
        this.client = client;
        this.inviteCode = inviteCode;
    };

    async get(inviteCode = this.inviteCode) {
        return await this.client.instance.get(`/invites/${inviteCode}`);
    };

    async delete(inviteCode = this.inviteCode) {
        return await this.client.instance.delete(`/invites/${inviteCode}`);
    };
};

module.exports = InviteNode;