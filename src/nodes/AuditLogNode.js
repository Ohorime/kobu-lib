'use strict';

/**
 * @typedef AuditLog
 * 
 * @property {Array} webhooks
 * @property {Array} users
 * @property {Array} audit_log_entries
 * @property {Array} integrations
 */

class AuditLogNode {
    /**
     * 
     * @param {import('./../client/Client')} client 
     * @param {string} guildID 
     */
    constructor(client, guildID) {
        /**
         * @type {import('./../client/Client')}
         */
        this.client = client;
        /**
         * @type {string}
         */
        this.guildID = guildID;
    };

    /**
     * Returns an audit log object for the guild. Requires the 'VIEW_AUDIT_LOG' permission.
     * @see https://discord.com/developers/docs/resources/audit-log#get-guild-audit-log
     * @param {string} [id=this.guildID]
     * @param {{user_id: string, action_type: number, before: string, limit: number}} options
     * @return {Promise<AuditLog>}
     */
    async getAuditLog(id = this.guildID, options) {
        return await this.client.instance.get(`/guilds/${id}/audit-logs`, options);
    };
};

module.exports = AuditLogNode;