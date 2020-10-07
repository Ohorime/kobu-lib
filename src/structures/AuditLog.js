'use strict';

class AuditLog {
    constructor(client, data) {
        this.client = client;
        this.webhooks = data.webhooks;
        this.users = data.users;
        this.audit_log_entries = data.audit_log_entries;
        this.integrations = data.integrations;
    };
};

module.exports = AuditLog;