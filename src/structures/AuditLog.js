'use strict';

/**
 * @typedef AuditLogObject
 * 
 * @property {Array} webhooks
 * @property {Array} users
 * @property {Array} audit_log_entries
 * @property {Array} integrations
 */

class AuditLog {
    /**
     * @param {import('./../client/Client')} client - Client
     * @param {AuditLogObject} data - AuditLog
     */
    constructor(client, data) {
        this.client = client;
        this.webhooks = data.webhooks;
        this.users = data.users;
        this.audit_log_entries = data.audit_log_entries;
        this.integrations = data.integrations;
    };
};

module.exports = AuditLog;