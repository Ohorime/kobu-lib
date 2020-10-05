'use strict';

class WebhookNode {
    constructor(client, webhookID, webhookToken) {
        this.client = client;
        this.webhookID = webhookID;
        this.webhookToken = webhookToken;
    };

    async create(channelID, options) {
        return await this.client.instance.post(`/channels/${channelID}/webhooks`, {data: options});
    };

    async getChannelWebhooks(channelID) {
        return await this.client.instance.get(`/channels/${channelID}/webhooks`);
    };

    async getGuildWebhooks(guildID) {
        return await this.client.instance.get(`/guilds/${guildID}/webhooks`);
    };

    async get(id = this.webhookID) {
        return await this.client.instance.get(`/webhooks/${id}`);
    };

    async getWithToken(id = this.webhookID, token = this.webhookToken) {
        return await this.client.instance.get(`/webhooks/${id}/${token}`);
    };

    async modify(id = this.webhookID, options) {
        return await this.client.instance.patch(`/webhooks/${id}`, {data: options});
    };

    async modifyWithToken(id = this.webhookID, token = this.webhookToken, options) {
        return await this.client.instance.patch(`/webhooks/${id}/${token}`, {data: options});
    };

    async delete(id = this.webhookID) {
        return await this.client.instance.delete(`/webhooks/${id}`);
    };

    async deleteWithToken(id = this.webhookID, token = this.webhookToken) {
        return await this.client.instance.delete(`/webhooks/${id}/${token}`);
    };

    async execute(id = this.webhookID, token = this.webhookToken, options, params, content_type = 'application/json') {
        return await this.client.instance.post(`/webhooks/${id}/${token}`, {data: options, params, headers: {'content-type': content_type}});
    };

    async executeSlack_Compatible(id = this.webhookID, token = this.webhookToken, options) {
        return await this.client.instance.post(`/webhooks/${id}/${token}/slack`, {params: options});
    };

    async executeGithub_Compatible(id = this.webhookID, token = this.webhookToken, options) {
        return await this.client.instance.post(`/webhooks/${id}/${token}/github`, {params: options});
    };
};

module.exports = WebhookNode;