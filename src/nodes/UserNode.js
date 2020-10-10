'use strict';

/**
 * @typedef User
 * 
 * @property {string} id
 * @property {string} username
 * @property {string} discriminator
 * @property {string} avatar
 * @property {?boolean} bot
 * @property {?boolean} system
 * @property {?boolean} mfa_enabled
 * @property {?string} locale
 * @property {?boolean} verified
 * @property {?string} email
 * @property {?number} flags
 * @property {?number} premium_type
 * @property {?number} public_flags
 */

class UserNode {
    /**
     * UserNode constructor
     * @param {import('./../client/Client')} client - Client
     * @param {string} userID - User ID
     */
    constructor(client, userID) {
        /**
         * @type {import('./../client/Client')}
         */
        this.client = client;
        /**
         * @type {string}
         */
        this.userID = userID;
    };

    /**
     * Returns the user object of the requester's account. For OAuth2, this requires the identify scope, which will return the object without an email, and optionally the email scope, which returns the object with an email.
     * @see https://discord.com/developers/docs/resources/user#get-current-user
     * @return {Promise<User>}
     */
    async getCurrent() {
        return await this.client.instance.get(`/users/@me`);
    };

    /**
     * Returns a user object for a given user ID.
     * @see https://discord.com/developers/docs/resources/user#get-user
     * @param {string} [id=this.userID] - User ID
     * @return {Promise<User>}
     */
    async getUser(id = this.userID) {
        return await this.client.instance.get(`/users/${id}`);
    };

    /**
     * Modify the requester's user account settings. Returns a user object on success.
     * @see https://discord.com/developers/docs/resources/user#modify-current-user
     * @param {?{data: ?{username: string, avatar: string}}}
     * @return {Promise<User>}
     */
    async modifyCurrent(options) {
        return await this.client.instance.patch(`/users/@me`, options);
    };

    /**
     * Returns a list of partial guild objects the current user is a member of. Requires the guilds OAuth2 scope.
     * @see https://discord.com/developers/docs/resources/user#get-current-user-guilds
     * @param {{data: {before: ?string, after: ?string, limit: ?string}}} options - options
     * @return {Promise<Guild>}
     */
    async getCurrentGuild(options) {
        return await this.client.instance.get(`/users/@me/guilds`, options);
    };

    /**
     * Leave a guild. Returns a 204 empty response on success.
     * @see https://discord.com/developers/docs/resources/user#leave-guild
     * @param {string} guildID - Guild ID
     * @return {Promise<void>}
     */
    async leaveGuild(guildID) {
        return await this.client.instance.delete(`/users/@me/guilds/${guildID}`);
    };

    /**
     * Returns a list of DM channel objects. For bots, this is no longer a supported method of getting recent DMs, and will return an empty array.
     * @see https://discord.com/developers/docs/resources/user#get-user-dms
     * @return {Promise<Channel>}
     */
    async getDMs() {
        return await this.client.instance.get(`/users/@me/channels`);
    };

    /**
     * Create a new DM channel with a user. Returns a DM channel object.
     * @see https://discord.com/developers/docs/resources/user#create-dm
     * @param {{data: {recipient_id: string}}} options - options
     * @return {Promise<Channel>}
     */
    async createDM(options) {
        return await this.client.instance.post(`/users/@me/channels`, options);
    };

    /**
     * Create a new group DM channel with multiple users. Returns a DM channel object. This endpoint was intended to be used with the now-deprecated GameBridge SDK. DMs created with this endpoint will not be shown in the Discord client
     * @see https://discord.com/developers/docs/resources/user#create-group-dm
     * @param {{data: {access_tokens: string[], nicks}}} options - options
     * @return {Promise<Channel>}
     */
    async createGroupDM(options) {
        return await this.client.instance.post(`/users/@me/channels`, options);
    };

    /**
     * Returns a list of connection objects. Requires the connections OAuth2 scope.
     * @see https://discord.com/developers/docs/resources/user#get-user-connections
     * @return {Promise<Connection[]>}
     */
    async getConnections() {
        return await this.client.instance.get(`/user/@me/connections`);
    };
};

module.exports = UserNode;