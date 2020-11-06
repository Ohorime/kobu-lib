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
    /**
     * GuildNode constructor
     * @param {import('./../client/Client')} client - Client
     * @param {?string} guildID - Guild ID
     */
    constructor(client, guildID) {
        /**
         * @type {import('./../client/Client')}
         */
        this.client = client;
        /**
         * @type {?string}
         */
        this.guildID = guildID;
    };

    /**
     * Create a new guild. Returns a guild object on success. Fires a Guild Create Gateway event.
     * @see https://discord.com/developers/docs/resources/guild#create-guild
     * @param {{data: {name: string, region: ?string, icon: ?string, verification_level: ?number, default_message_notifications: ?number, explicit_content_filter: ?number, roles: ?Role[], channels: ?Channel[], afk_channel_id: string, afk_timeout: number, system_channel_id: string}}} options - options
     * @return {Promise<Guild>}
     */
    async create(options) {
        return await this.client.instance.post('/guilds', options);
    };

    /**
     * Returns the guild object for the given id. If with_counts is set to true, this endpoint will also return approximate_member_count and approximate_presence_count for the guild.
     * @see https://discord.com/developers/docs/resources/guild#get-guild
     * @param {string} [id=this.guildID] - Guild ID
     * @param {?boolean} [with_counts=false] - when true, will return approximate member and presence counts for the guild
     * @return {Promise<Guild>}
     */
    async get(with_counts = false, id = this.guildID) {
        return await this.client.instance.get(`/guilds/${id}`, {params: {with_counts}});
    };

    /**
     * Returns the guild preview object for the given id, even if the user is not in the guild.
     * @see https://discord.com/developers/docs/resources/guild#get-guild-preview
     * @param {string} [id=this.guildID] - Guild ID
     * @return {Promise<void>}
     */
    async getPreview(id = this.guildID) {
        return await this.client.instance.get(`/guilds/${id}/preview`);
    };

    /**
     * Modify a guild's settings. Requires the MANAGE_GUILD permission. Returns the updated guild object on success. Fires a Guild Update Gateway event.
     * @see https://discord.com/developers/docs/resources/guild#modify-guild
     * @param {string} [id=this.guildID] - Guild ID
     * @param {?{?data: {name: ?string, region: ?string, verifiction_level: ?number, default_message_notifications: ?number, explicit_content_filter: ?number, afk_channel_id: ?string, afk_timeout: ?number, icon: ?string, owner_id: ?string, splash: ?string, banner: ?string, system_channel_id: ?string, rules_channel_id: ?string, public_updates_channel_id: ?string, preferred_locale: ?string}}} options - options
     * @return {Promise<Guild>}
     */
    async modify(options, id = this.guildID) {
        return await this.client.instance.patch(`/guilds/${id}`, options);
    };

    /**
     * Delete a guild permanently. User must be owner. Returns 204 No Content on success. Fires a Guild Delete Gateway event.
     * @see https://discord.com/developers/docs/resources/guild#delete-guild
     * @param {string} [id=this.guildID] - Guild ID
     * @return {Promise<void>}
     */
    async delete(id = this.guildID) {
        return await this.client.instance.delete(`/guilds/${id}`);
    };

    /**
     * Returns a list of guild channel objects.
     * @see https://discord.com/developers/docs/resources/guild#get-guild-channels
     * @param {string} [id=this.guildID] - Guild ID
     * @return {Promise<Channel[]>}
     */
    async channels(id = this.guildID) {
        return await this.client.instance.get(`/guilds/${id}/channels`);
    };

    /**
     * Create a new channel object for the guild. Requires the MANAGE_CHANNELS permission. Returns the new channel object on success. Fires a Channel Create Gateway event.
     * @see https://discord.com/developers/docs/resources/guild#create-guild-channel
     * @param {string} [id=this.guildID] - Guild ID
     * @param {{data: {name: string, type: ?number, topic: ?string, bitrate: ?number, user_limit: ?number, rate_limit_per_user: ?number, position: ?number, permission_overwrites: ?Overwrite[], parent_id: ?string, nsfw: ?boolean}}} options - options
     * @return {Promise<Channel>}
     */
    async createChannel(options, id = this.guildID) {
        return await this.client.instance.post(`/guilds/${id}/channels`, options);
    };

    /**
     * Modify the positions of a set of channel objects for the guild. Requires MANAGE_CHANNELS permission. Returns a 204 empty response on success. Fires multiple Channel Update Gateway events.
     * @see https://discord.com/developers/docs/resources/guild#modify-guild-channel-positions
     * @param {string} [id=this.guildID] - Guild ID
     * @param {{data: {id: string, position: number}}} options - options
     * @return {Promise<void>}
     */
    async modifyChannelPosition(options, id = this.guildID) {
        return await this.client.instance.patch(`/guilds/${id}/channels`, options);
    };

    /**
     * Returns a guild member object for the specified user.
     * @see https://discord.com/developers/docs/resources/guild#get-guild-member
     * @param {string} [guildID=this.guildID] - Guild ID
     * @param {string} userID - User ID
     * @return {Promise<Member[]>}
     */
    async getMember(userID, guildID = this.guildID) {
        return await this.client.instance.get(`/guilds/${guildID}/members/${userID}`);
    };

    /**
     * Returns a list of guild member objects that are members of the guild.
     * @see https://discord.com/developers/docs/resources/guild#list-guild-members
     * @param {string} [id=this.guildID] - Guild ID
     * @param {?{params: ?{limit: 1, after: 0}}} options - options
     * @return {Promise<Member[]>}   
     */
    async getMembers(options, id = this.guildID) {
        return await this.client.instance.get(`/guilds/${id}/members`, options);
    };

    /**
     * Adds a user to the guild, provided you have a valid oauth2 access token for the user with the guilds.join scope. Returns a 201 Created with the guild member as the body, or 204 No Content if the user is already a member of the guild. Fires a Guild Member Add Gateway event.
     * @see https://discord.com/developers/docs/resources/guild#add-guild-member
     * @param {string} [guildID=this.guildID] - Guild ID
     * @param {string} userID - User ID
     * @param {{data: {access_token: string, nick: ?string, roles: ?string[], mute: ?boolean, deaf: ?boolean}}} options - options
     * @return {Promise<Member>}
     */
    async addMember(userID, options, guildID = this.guildID) {
        return await this.client.instance.put(`/guilds/${guildID}/members/${userID}`, options);
    };

    /**
     * Modify attributes of a guild member. Returns a 204 empty response on success. Fires a Guild Member Update Gateway event. If the channel_id is set to null, this will force the target user to be disconnected from voice.
     * @see https://discord.com/developers/docs/resources/guild#modify-guild-member
     * @param {string} [guildID=this.guild] - Guild ID 
     * @param {string} userID - User ID
     * @param {?{data: ?{nick: ?string, roles: ?string, mute: ?boolean, deaf: ?boolean, channel_id: ?string}}} options - options
     * @return {Promise<void>}
     */
    async modifyMember(userID, options, guildID = this.guildID) {
        return await this.client.instance.patch(`/guilds/${guildID}/members/${userID}`, options);
    };

    /**
     * Modifies the nickname of the current user in a guild. Returns a 200 with the nickname on success. Fires a Guild Member Update Gateway event.
     * @see https://discord.com/developers/docs/resources/guild#modify-current-user-nick
     * @param {string} [id=this.guildID] - Guild ID
     * @param {{data: {nick: string}}} options - options
     * @return {Promise<void>}
     */
    async modifyCurrentUserNick(options, id = this.guildID) {
        return await this.client.instance.patch(`/guilds/${id}/members/@me/nick`, options);
    };

    /**
     * Adds a role to a guild member. Requires the MANAGE_ROLES permission. Returns a 204 empty response on success. Fires a Guild Member Update Gateway event.
     * @see https://discord.com/developers/docs/resources/guild#add-guild-member-role
     * @param {string} [guildID=this.guildID] - Guild ID
     * @param {string} userID - User ID
     * @param {string} roleID - Role ID
     * @return {Promise<void>}
     */
    async addMemberRole(userID, roleID, guildID = this.guildID) {
        return await this.client.instance.put(`/guilds/${guildID}/members/${userID}/roles/${roleID}`);
    };

    /**
     * Removes a role from a guild member. Requires the MANAGE_ROLES permission. Returns a 204 empty response on success. Fires a Guild Member Update Gateway event.
     * @see https://discord.com/developers/docs/resources/guild#remove-guild-member-role
     * @param {string} [guildID=this.guildID] - Guild ID
     * @param {string} userID - User ID
     * @param {string} roleID - Role ID
     * @return {Promise<void>}
     */
    async removeMemberRole(userID, roleID, guildID = this.guildID) {
        return await this.client.instance.delete(`/guilds/${guildID}/members/${userID}/roles/${roleID}`);
    };

    /**
     * Remove a member from a guild. Requires KICK_MEMBERS permission. Returns a 204 empty response on success. Fires a Guild Member Remove Gateway event.
     * @see https://discord.com/developers/docs/resources/guild#remove-guild-member
     * @param {string} guildID - Guild ID
     * @param {string} userID - User ID
     * @return {Promise<void>}
     */
    async removeMember(userID, guildID = this.guildID) {
        return await this.client.instance.delete(`/guilds/${guildID}/members/${userID}`);
    };

    /**
     * Returns a list of ban objects for the users banned from this guild. Requires the BAN_MEMBERS permission.
     * @see https://discord.com/developers/docs/resources/guild#get-guild-bans
     * @param {string} [id=this.guildID] - Guild ID
     * @return {Promise<Ban[]>}
     */
    async getBans(id = this.guildID) {
        return await this.client.instance.get(`/guilds/${id}/bans`);
    };

    /**
     * Returns a ban object for the given user or a 404 not found if the ban cannot be found. Requires the BAN_MEMBERS permission.
     * @see https://discord.com/developers/docs/resources/guild#get-guild-ban
     * @param {string} [guildID=this.guildID] - Guild ID
     * @param {string} userID - user ID
     * @return {Promise<Ban>}
     */
    async getBan(userID, guildID = this.guildID) {
        return await this.client.instance.get(`/guilds/${guildID}/bans/${userID}`);
    };

    /**
     * Create a guild ban, and optionally delete previous messages sent by the banned user. Requires the BAN_MEMBERS permission. Returns a 204 empty response on success. Fires a Guild Ban Add Gateway event.
     * @see https://discord.com/developers/docs/resources/guild#create-guild-ban
     * @param {string} [guildID=this.guildID] - Guild ID
     * @param {string} userID - User ID
     * @param {?{data: ?{delete_message_days: ?number, reason: ?string}}} options - options
     * @return {Promise<void>}
     */
    async createBan(userID, options, guildID = this.guildID) {
        return await this.client.instance.put(`/guilds/${guildID}/bans/${userID}`, options);
    };

    /**
     * Remove the ban for a user. Requires the BAN_MEMBERS permissions. Returns a 204 empty response on success. Fires a Guild Ban Remove Gateway event.
     * @see https://discord.com/developers/docs/resources/guild#remove-guild-ban
     * @param {string} [guildID=this.guildID] - Guild ID
     * @param {string} userID - User ID
     * @return {Promise<void>}
     */
    async removeBan(userID, guildID = this.guildID) {
        return await this.client.instance.delete(`/guilds/${guildID}/bans/${userID}`);
    };

    /**
     * Returns a list of role objects for the guild.
     * @see https://discord.com/developers/docs/resources/guild#get-guild-roles
     * @param {string} [id=this.guildID] - Guild ID
     * @return {Promise<Role[]>} 
     */
    async getRoles(id = this.guildID) {
        return await this.client.instance.get(`/guilds/${id}/roles`);
    };

    /**
     * Create a new role for the guild. Requires the MANAGE_ROLES permission. Returns the new role object on success. Fires a Guild Role Create Gateway event. All JSON params are optional.
     * @see https://discord.com/developers/docs/resources/guild#create-guild-role
     * @param {string} [id=this.guildID] - Guild ID
     * @param {?{data: ?{name: "new role", permissions: ?string, color: 0, hoist: false, mentionable: false}}} options - options
     * @return {Promise<Role>}
     */
    async createRole(options, id = this.guildID) {
        return await this.client.instance.post(`/guilds/${id}/roles`, options);
    };

    /**
     * Modify the positions of a set of role objects for the guild. Requires the MANAGE_ROLES permission. Returns a list of all of the guild's role objects on success. Fires multiple Guild Role Update Gateway events.
     * @see https://discord.com/developers/docs/resources/guild#modify-guild-role-positions
     * @param {string} [id=this.guildID] - guild ID
     * @param {{data: {id: string, position: ?number}}} options - options
     * @return {Promise<Role>}
     */
    async modifyRolePosition(options, id = this.guildID) {
        return await this.client.instance.patch(`/guilds/${id}/roles`, options);
    };

    /**
     * Modify a guild role. Requires the MANAGE_ROLES permission. Returns the updated role on success. Fires a Guild Role Update Gateway event.
     * @see https://discord.com/developers/docs/resources/guild#modify-guild-role
     * @param {string} [guildID=this.guildID] - Guild ID
     * @param {string} roleID - Role ID
     * @param {?{data: ?{name: ?string, permissions: ?string, color: ?number, hoist: ?boolean, mentionable: ?boolean}}} options - options
     * @return {Promise<Role>}
     */
    async modifyRole(roleID, options, guildID = this.guildID) {
        return await this.client.instance.path(`/guilds/${guildID}/roles/${roleID}`, options);
    };

    /**
     * Delete a guild role. Requires the MANAGE_ROLES permission. Returns a 204 empty response on success. Fires a Guild Role Delete Gateway event.
     * @see https://discord.com/developers/docs/resources/guild#delete-guild-role
     * @param {string} [guildID=this.guildID] - Guild ID
     * @param {string} roleID - Role ID
     * @return {Promise<void>}
     */
    async deleteRole(roleID, guildID = this.guildID) {
        return await this.client.instance.delete(`/guilds/${guildID}/roles/${roleID}`);
    };

    /**
     * Returns an object with one 'pruned' key indicating the number of members that would be removed in a prune operation. Requires the KICK_MEMBERS permission.
     * @see https://discord.com/developers/docs/resources/guild#get-guild-prune-count
     * @param {string} [id=this.guildID] - Guild ID
     * @param {?{params: ?{days: 7, include_roles: ?string}}} options - options
     * @return {Promise<*>}
     */
    async getPruneCount(options, id = this.guildID) {
        return await this.client.instance.get(`/guilds/${id}/prune`, options);
    };

    /**
     * Begin a prune operation. Requires the KICK_MEMBERS permission. Returns an object with one 'pruned' key indicating the number of members that were removed in the prune operation. For large guilds it's recommended to set the compute_prune_count option to false, forcing 'pruned' to null. Fires multiple Guild Member Remove Gateway events.
     * @see https://discord.com/developers/docs/resources/guild#begin-guild-prune
     * @param {string} [id=this.guildID] - Guild ID
     * @param {{data: {days: 7, compute_prune_count: true, include_roles: ?string[]}}} options - options
     * @return {Promise<*>}
     */
    async beginPrune(options, id = this.guildID) {
        return await this.client.instance.post(`/guilds/${id}/prune`, options);
    };

    /**
     * Returns a list of voice region objects for the guild. Unlike the similar /voice route, this returns VIP servers when the guild is VIP-enabled.
     * @see https://discord.com/developers/docs/resources/guild#get-guild-voice-regions
     * @param {string} [id=this.guildID] - Guild ID
     * @return {Promise<VoiceRegion[]>}
     */
    async getVoiceRegion(id = this.guildID) {
        return await this.client.instance.get(`/guilds/${id}/regions`);
    };

    /**
     * Returns a list of invite objects (with invite metadata) for the guild. Requires the MANAGE_GUILD permission.
     * @see https://discord.com/developers/docs/resources/guild#get-guild-invites
     * @param {string} [id=this.guildID] - Guild ID
     * @return {Promise<Invite>}
     */
    async getInvite(id = this.guildID) {
        return await this.client.instance.get(`/guilds/${id}/invites`);
    };

    /**
     * Returns a list of integration objects for the guild. Requires the MANAGE_GUILD permission.
     * @see https://discord.com/developers/docs/resources/guild#get-guild-integrations
     * @param {string} [id=this.guildID] - Guild ID
     * @return {Promise<Integration[]>}
     */
    async getIntegrations(id = this.guildID) {
        return await this.client.instance.get(`/guilds/${id}/integrations`);
    };

    /**
     * Attach an integration object from the current user to the guild. Requires the MANAGE_GUILD permission. Returns a 204 empty response on success. Fires a Guild Integrations Update Gateway event.
     * @see https://discord.com/developers/docs/resources/guild#create-guild-integration
     * @param {string} [id=this.guildID] - Guild ID
     * @param {{data: {type: string, id: string}}} options - options
     * @return {Promise<void>}
     */
    async createIntegration(options, id = this.guildID) {
        return await this.client.instance.post(`/guilds/${id}/integrations`, options);
    };

    /**
     *  Modify the behavior and settings of an integration object for the guild. Requires the MANAGE_GUILD permission. Returns a 204 empty response on success. Fires a Guild Integrations Update Gateway event.
     * @see https://discord.com/developers/docs/resources/guild#modify-guild-integration
     * @param {string} guildID - Guild ID
     * @param {string} integrationID - Integration ID
     * @param {?{data: ?{expire_behavior: ?number, expire_grace_period: ?number, enable_emoticons: ?boolean}}} options - options
     * @return {Promise<integrator>}
     */
    async modifyIntegration(integrationID, options, id = this.guildID) {
        return await this.client.instance.patch(`/guilds/${guildID}/integrations/${integrationID}`, options);
    };

    /**
     * Delete the attached integration object for the guild. Requires the MANAGE_GUILD permission. Returns a 204 empty response on success. Fires a Guild Integrations Update Gateway event.
     * @see https://discord.com/developers/docs/resources/guild#delete-guild-integration
     * @param {string} guildID - Guild ID
     * @param {string} integrationID - Integration ID
     * @return {Promise<void>}
     */
    async deleteIntegration(integrationID, guildID = this.guildID) {
        return await this.client.instance.delete(`/guilds/${guildID}/integrations/${integrationID}`);
    };

    /**
     * Sync an integration. Requires the MANAGE_GUILD permission. Returns a 204 empty response on success.
     * @see https://discord.com/developers/docs/resources/guild#sync-guild-integration
     * @param {string} guildID - Guild ID
     * @param {string} integrationID - Integration ID
     * @return {Promise<void>}
     */
    async syncIntegration(integrationID, guildID = this.guildID) {
        return await this.client.instance.post(`/guilds/${guildID}/integrations/${integrationID}/sync`);
    };

    /**
     * Returns a guild widget object. Requires the MANAGE_GUILD permission.
     * @see https://discord.com/developers/docs/resources/guild#get-guild-widget-settings
     * @param {string} [id=this.guildID] - Guild ID
     * @return {Promise<Widget>}
     */
    async getWidgetSettings(id = this.guildID) {
        return await this.client.instance.get(`/guilds/${id}/widget`);
    };

    /**
     * Modify a guild widget object for the guild. All attributes may be passed in with JSON and modified. Requires the MANAGE_GUILD permission. Returns the updated guild widget object.
     * @see https://discord.com/developers/docs/resources/guild#modify-guild-widget
     * @param {string} [id=this.guildID] - Guild ID
     * @param {{data: Widget}} options - options
     * @return {Promise<Widget>}
     */
    async modifyWidget(options, id = this.guildID) {
        return await this.client.instance.patch(`/guilds/${id}/widget`, options);
    };

    /**
     * Returns the widget for the guild.
     * @param {string} [id=this.guildID] - Guild ID
     * @return {Promise<Widget>}
     */
    async getWidget(id = this.guildID) {
        return await this.client.instance.get(`/guilds/${id}/widget.json`);
    };

    /**
     * Returns a partial invite object for guilds with that feature enabled. Requires the MANAGE_GUILD permission. code will be null if a vanity url for the guild is not set.
     * @see https://discord.com/developers/docs/resources/guild#get-guild-widget
     * @param {string} [id=this.guildID]
     * @return {Promise<void>} 
     */
    async getVanityURL(id = this.guildID) {
        return await this.client.instance.get(`/guilds/${id}/vanity-url`);
    };

    /**
     * Returns a PNG image widget for the guild. Requires no permissions or authentication.
     * @see https://discord.com/developers/docs/resources/guild#get-guild-widget-image
     * @param {string} [id=this.guildID] - Guild ID
     * @param {?{params: ?{style: ?string}}} options - options
     * @return {Promise<Buffer>}
     */
    async getWidgetImage(options, id = this.guildID) {
        return await this.client.instance.get(`guilds/${id}/widget.png`, options);
    };
};

module.exports = GuildNode;