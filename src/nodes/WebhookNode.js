'use strict';

/**
 * @typedef Webhook
 * 
 * @property {string} id
 * @property {number} type
 * @property {?string} guild_id
 * @property {string} channel_id
 * @property {?User} user
 * @property {string} name
 * @property {string} avatar
 * @property {?string} token
 */

class WebhookNode {
    /**
     * WebhookNode constructor
     * @param {import('./../client/Client')} client - Client
     * @param {?string} webhookID - Webhook ID
     * @param {?string} webhookToken - Webhook Token
     */
    constructor(client, webhookID, webhookToken) {
        /**
         * @type {import('./../client/Client')}
         */
        this.client = client;
        /**
         * @type {?string}
         */
        this.webhookID = webhookID;
        /**
         * @type {?string}
         */
        this.webhookToken = webhookToken;
    };

    /**
     * Create a new webhook. Requires the MANAGE_WEBHOOKS permission. Returns a webhook object on success. Webhook names follow our naming restrictions that can be found in our Usernames and Nicknames documentation, with the following additional stipulations:
     * @see https://discord.com/developers/docs/resources/webhook#create-webhook
     * @param {string} channelID - Channel ID
     * @param {{data: {name: string, avatar: string}}} options - options
     * @return {Promise<Webhook>}
     */
    async create(channelID, options) {
        return await this.client.instance.post(`/channels/${channelID}/webhooks`, options);
    };

    /**
     * Returns a list of channel webhook objects. Requires the MANAGE_WEBHOOKS permission.
     * @see https://discord.com/developers/docs/resources/webhook#get-channel-webhooks
     * @param {string} channelID - Channel ID
     * @return {Promise<Webhook[]>}
     */
    async getChannelWebhooks(channelID) {
        return await this.client.instance.get(`/channels/${channelID}/webhooks`);
    };

    /**
     * Returns a list of guild webhook objects. Requires the MANAGE_WEBHOOKS permission.
     * @see https://discord.com/developers/docs/resources/webhook#get-guild-webhooks
     * @param {string} guildID - Guild ID
     * @return {Promise<Webhook[]>}
     */
    async getGuildWebhooks(guildID) {
        return await this.client.instance.get(`/guilds/${guildID}/webhooks`);
    };

    /**
     * Returns the new webhook object for the given id.
     * @see https://discord.com/developers/docs/resources/webhook#get-webhook
     * @param {string} [id=this.webhookID] - Webhook ID
     * @return {Promise<Webhook>}
     */
    async get(id = this.webhookID) {
        return await this.client.instance.get(`/webhooks/${id}`);
    };

    /**
     * Same as above, except this call does not require authentication and returns no user in the webhook object.
     * @see https://discord.com/developers/docs/resources/webhook#get-webhook-with-token
     * @param {string} [id=this.webhookID] - Webhook ID
     * @param {string} [token=this.webhookToken] - Webhook token
     * @return {Promise<Webhook>}
     */
    async getWithToken(id = this.webhookID, token = this.webhookToken) {
        return await this.client.instance.get(`/webhooks/${id}/${token}`);
    };

    /**
     * Modify a webhook. Requires the MANAGE_WEBHOOKS permission. Returns the updated webhook object on success.
     * @see https://discord.com/developers/docs/resources/webhook#modify-webhook
     * @param {string} [id=this.webhookID] - Webhook ID
     * @param {?{data: ?{name: ?string, avatar: ?string, channel_id: ?string}}} options - options
     * @return {Promise<Webhook>}
     */
    async modify(id = this.webhookID, options) {
        return await this.client.instance.patch(`/webhooks/${id}`, {data: options});
    };

    /**
     * Same as above, except this call does not require authentication, does not accept a channel_id parameter in the body, and does not return a user in the webhook object.
     * @see https://discord.com/developers/docs/resources/webhook#modify-webhook
     * @param {string} [id=this.webhookID] - Webhook ID
     * @param {string} [token=this.webhookToken] - Webhook Token
     * @param {?{data: ?{name: string, avatar: ?string}}} options - options
     * @return {Promise<webhook>}
     */
    async modifyWithToken(id = this.webhookID, token = this.webhookToken, options) {
        return await this.client.instance.patch(`/webhooks/${id}/${token}`, {data: options});
    };

    /**
     * Delete a webhook permanently. Requires the MANAGE_WEBHOOKS permission. Returns a 204 NO CONTENT response on success.
     * @see https://discord.com/developers/docs/resources/webhook#delete-webhook
     * @param {string} [id=this.webhookID] - Webhook ID
     * @return {Promise<void>}
     */
    async delete(id = this.webhookID) {
        return await this.client.instance.delete(`/webhooks/${id}`);
    };

    /**
     * Same as above, except this call does not require authentication.
     * @see https://discord.com/developers/docs/resources/webhook#delete-webhook-with-token
     * @param {string} [id=this.webhookID] - Webhook ID
     * @param {string} [token=this.webhookToken] - Webhook Token
     * @return {Promise<void>}
     */
    async deleteWithToken(id = this.webhookID, token = this.webhookToken) {
        return await this.client.instance.delete(`/webhooks/${id}/${token}`);
    };

    /**
     * Hello world \^.^/
     * @see https://discord.com/developers/docs/resources/webhook#delete-webhook-with-token
     * @param {string} id - Webhook ID
     * @param {string} token - Webhook Token
     * @param {?{data: ?{content: string, username: ?string, avatar_url: ?string, tts: ?boolean, file: ?any, embeds: ?Embed[], payload_json: ?string, allowed_mentions: AllowedMentions}, params: {wait: ?boolean}, headers: ?{'Content-Type': 'application/json'}}} options - options
     * @return {Promise<any>}
     */
    async execute(id = this.webhookID, token = this.webhookToken, options) {
        return await this.client.instance.post(`/webhooks/${id}/${token}`, {data: options, params, headers: {'content-type': content_type}});
    };

    /**
     * @param {string} id - Webhook ID
     * @param {string} token - Webhook Token
     * @param {?{params: ?{wait: ?boolean}}} options - options
     */
    async executeSlack_Compatible(id = this.webhookID, token = this.webhookToken, options) {
        return await this.client.instance.post(`/webhooks/${id}/${token}/slack`, {params: options});
    };

    /**
     * @param {string} id - Webhook ID
     * @param {string} token - Webhook Token
     * @param {?{params: ?{wait: ?boolean}}} options - options
     */
    async executeGithub_Compatible(id = this.webhookID, token = this.webhookToken, options) {
        return await this.client.instance.post(`/webhooks/${id}/${token}/github`, {params: options});
    };
};

module.exports = WebhookNode;