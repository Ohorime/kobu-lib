'use strict';

class AuditLogNode {
    constructor(client, guildID) {
        this.client = client;
        this.guildID = guildID;
    };

    async getAuditLog(id = this.guildID, options) {
        return await this.client.instance.get(`/guilds/${id}/audit-logs`, {params: options});
    };
};

module.exports = AuditLogNode;