'use strict';

/**
 * @typedef Guild
 * 
 * @property {string} id
 * @property {string} name
 * @property {string} icon
 * @property {string} splash
 * @property {string} discovery_splash
 * @property {?boolean} owner
 * @property {string} owner_id
 * @property {?string} permissions
 * @property {string} region
 * @property {?string} afk_channel_id
 * @property {number} afk_timeout
 * @property {?boolean} widget_enabled
 * @property {?string} widget_channel_id
 * @property {number} verification_level
 * @property {number} default_message_notifications
 * @property {number} default_content_filter
 * @property {number} explicit_content_filter
 * @property {Role[]} roles
 * @property {Emoji[]} emojis
 * @property {Feature[]} features
 * @property {number} mfa_level
 * @property {string} application_id
 * @property {string} system_channel_id
 * @property {number} system_channel_flags
 * @property {string} rules_channel_id
 * @property {?number} joined_at
 * @property {?boolean} large
 * @property {?boolean} unavailable
 * @property {?number} member_count
 * @property {?VoiceState[]} voice_states
 * @property {?Member[]} members
 * @property {?Channel[]} channels
 * @property {?Presence[]} presences
 * @property {?number} max_members
 * @property {?string} vanity_url_code
 * @property {?string} description
 * @property {?string} banner
 * @property {?number} premium_tier
 * @property {?number} premium_subscription_count
 * @property {string} preferred_locale
 * @property {?string} public_updates_channel_id
 * @property {?number} max_video_channel_users
 * @property {?number} approximate_presence_count
 */

class GuildNode {
    constructor(client, guildID) {
        this.client = client;
        this.guildID = guildID;
    };

    async create(options) {
        return await this.client.instance.post('/guilds', {data: options});
    };

    async get(id = this.guildID, with_counts) {
        return await this.client.instance.get(`/guilds/${id}`, {params: {with_counts}});
    };

    async getPreview(id = this.guildID) {
        return await this.client.instance.get(`/guilds/${id}/preview`);
    };

    async modify(id = this.guildID, options) {
        return await this.client.instance.patch(`/guilds/${id}`, {data: options});
    };

    async delete(id = this.guildID) {
        return await this.client.instance.delete(`/guilds/${id}`);
    };

    async channels(id = this.guildID) {
        return await this.client.instance.get(`/guilds/${id}/channels`);
    };

    async createChannel(id = this.guildID, options) {
        return await this.client.instance.post(`/guilds/${id}/channels`, {data: options})
    };

    async modifyChannelPosition(id = this.guildID, options) {
        return await this.client.instance.patch(`/guilds/${id}/channels`, {data: options});
    };

    async getMember(guildID = this.guildID, userID) {
        return await this.client.instance.get(`/guilds/${guildID}/members/${userID}`);
    };

    async getMembers(id = this.guildID, options) {
        return await this.client.instance.get(`/guilds/${id}/members`, {params: options});
    };

    async addMember(guildID = this.guildID, userID, options) {
        return await this.client.instance.put(`/guilds/${guildID}/members/${userID}`, {data: options})
    };

    async modifyMember(guildID = this.guildID, userID, options) {
        return await this.client.instance.patch(`/guilds/${guildID}/members/${userID}`, {data: options});
    };

    async modifyCurrentUserNick(id = this.guildID, options) {
        return await this.client.instance.patch(`/guilds/${id}/members/@me/nick`, {params: options});
    };

    async addMemberRole(guildID = this.guildID, userID, roleID) {
        return await this.client.instance.put(`/guilds/${guildID}/members/${userID}/roles/${roleID}`);
    };

    async removeMemberRole(guildID = this.guildID, userID, roleID) {
        return await this.client.instance.delete(`/guilds/${guildID}/members/${userID}/roles/${roleID}`);
    };

    async removeMember(guildID = this.guildID, userID) {
        return await this.client.instance.delete(`/guilds/${guildID}/members/${userID}`);
    };

    async getBans(id = this.guildID) {
        return await this.client.instance.get(`/guilds/${id}/bans`);
    };

    async getBan(guildID = this.guildID, userID) {
        return await this.client.instance.get(`/guilds/${guildID}/bans/${userID}`);
    };

    async createBan(guildID = this.guildID, userID, options) {
        return await this.client.instance.put(`/guilds/${guildID}/bans/${userID}`, {data: options});
    };

    async removeBan(guildID = this.guildID, userID) {
        return await this.client.instance.delete(`/guilds/${guildID}/bans/${userID}`);
    };

    async getRoles(id = this.guildID) {
        return await this.client.instance.get(`/guilds/${id}/roles`);
    };

    async createRole(id = this.guildID, options) {
        return await this.client.instance.post(`/guilds/${id}/roles`, {data: options});
    };

    async modifyRolePosition(id = this.guildID, options) {
        return await this.client.instance.patch(`/guilds/${id}/roles`, {data: options});
    };

    async modifyRole(guildID = this.guildID, roleID, options) {
        return await this.client.instance.path(`/guilds/${guildID}/roles/${roleID}`, {data: options});
    };

    async deleteRole(guildID = this.guildID, roleID) {
        return await this.client.instance.delete(`/guilds/${guildID}/roles/${roleID}`);
    };

    async getPruneCount(id = this.guildID, options) {
        return await this.client.instance.get(`/guilds/${id}/prune`, {params: options});
    };

    async beginPrune(id = this.guildID, options) {
        return await this.client.instance.post(`/guilds/${id}/prune`, {data: options});
    };

    async getVoiceRegion(id = this.guildID) {
        return await this.client.instance.get(`/guilds/${id}/regions`);
    };

    async getInvite(id = this.guildID) {
        return await this.client.instance.get(`/guilds/${id}/invites`);
    };

    async getIntegrations(id = this.guildID) {
        return await this.client.instance.get(`/guilds/${id}/integrations`);
    };

    async createIntegration(id = this.guildID, options) {
        return await this.client.instance.post(`/guilds/${id}/integrations`, {data: options});
    };

    async modifyIntegration(guildID = this.guildID, integrationID, options) {
        return await this.client.instance.patch(`/guilds/${guildID}/integrations/${integrationID}`, {data: options});
    };

    async deleteIntegration(guildID = this.guildID, integrationID) {
        return await this.client.instance.delete(`/guilds/${guildID}/integrations/${integrationID}`);
    };

    async syncIntegration(guildID = this.guildID, integrationID) {
        return await this.client.instance.post(`/guilds/${guildID}/integrations/${integrationID}/sync`);
    };

    async getWidgetSettings(id = this.guildID) {
        return await this.client.instance.get(`/guilds/${id}/widget`);
    };

    async modifyWidget(id = this.guildID, options) {
        return await this.client.instance.patch(`/guilds/${id}/widget`, {data: options});
    };

    async getWidget(id = this.guildID) {
        return await this.client.instance.get(`/guilds/${id}/widget.json`);
    };

    async getVanityURL(id = this.guildID) {
        return await this.client.instance.get(`/guilds/${id}/vanity-url`);
    };

    async getWidgetImage(id = this.guildID, options) {
        return await this.client.instance.get(`guilds/${id}/widget.png`, {params: options});
    };
};

module.exports = GuildNode;