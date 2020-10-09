'use strict';

/**
 * @typedef Channel
 * 
 * @property {string} id
 * @property {number} type
 * @property {?string} guild_id
 * @property {?number} position
 * @property {?Overwrite[]} permission_overwrites
 * @property {?string} name
 * @property {?string} topic
 * @property {?boolean} nfsw
 * @property {?string} last_message_id
 * @property {?number} bitrate
 * @property {?number} user_limit
 * @property {?number} rate_limit_per_user
 * @property {?User[]} recipients
 * @property {?string} icon
 * @property {?string} owner_id
 * @property {?string} application_id
 * @property {?string} parent_id
 * @property {?number} last_pin_timestamp
 */

class ChannelNode {
    /**
     * 
     * @param {import('./../client/Client')} client 
     * @param {string} channelID 
     */
    constructor(client, channelID) {
        /**
         * @type {import('./../client/Client')}
         */
        this.client = client;
        /**
         * @type {string}
         */
        this.channelID = channelID;
    };

    /**
     * Get a channel by ID. Returns a channel object.
     * @see https://discord.com/developers/docs/resources/channel#get-channel
     * @param {string} [id=this.channelID] - Channel ID
     * @return {Promise<Channel>}
     */
    async get(id = this.channelID) {
        return await this.client.instance.get(`/channels/${id}`);
    };

    /**
     * Update a channel's settings. Requires the MANAGE_CHANNELS permission for the guild. Returns a channel on success, and a 400 BAD REQUEST on invalid parameters. Fires a Channel Update Gateway event. If modifying a category, individual Channel Update events will fire for each child channel that also changes. All JSON parameters are optional.
     * @see https://discord.com/developers/docs/resources/channel#modify-channel
     * @param {string} [id=this.channelID] - Channel ID
     * @param {{name: string, type: 'Text' | 'News', position: ?number, topic: ?string, nsfw: ?boolean, rate_limit_per_user: ?number, bitrate: ?number, user_limit: ?number, permission_overwrite: ?Overwrite[], parent_id: ?string}} options
     * @return {Promise<Channel>}
     */
    async modify(id = this.channelID, options) {
        return await this.client.instance.patch(`/channels/${id}`, options);
    };

    /**
     * Delete a channel, or close a private message. Requires the MANAGE_CHANNELS permission for the guild. Deleting a category does not delete its child channels; they will have their parent_id removed and a Channel Update Gateway event will fire for each of them. Returns a channel object on success. Fires a Channel Delete Gateway event.
     * @see https://discord.com/developers/docs/resources/channel#deleteclose-channel
     * @param {string} [id=this.channelID] - Channel ID
     * @return {Promise<void>}
     */
    async delete(id = this.channelID) {
        return await this.client.instance.delete(`/channels/${id}`);
    };

    /**
     * Returns the messages for a channel. If operating on a guild channel, this endpoint requires the VIEW_CHANNEL permission to be present on the current user. If the current user is missing the 'READ_MESSAGE_HISTORY' permission in the channel then this will return no messages (since they cannot read the message history). Returns an array of message objects on success.
     * @see https://discord.com/developers/docs/resources/channel#get-channel-messages
     * @param {string} [id=this.channelID] - Channel ID
     * @param {?{?data: {around: ?string, before: ?string, after: ?string, limit: ?string}}} options
     * @return {Promise<Channel[]>}
     */
    async getMessages(id = this.channelID, options) {
        return await this.client.instance.get(`/channels/${id}/messages`, options);
    };

    /**
     * Returns a specific message in the channel. If operating on a guild channel, this endpoint requires the 'READ_MESSAGE_HISTORY' permission to be present on the current user. Returns a message object on success.
     * @see https://discord.com/developers/docs/resources/channel#get-channel-message
     * @param {string} [channelID=this.channelID] - Channel ID
     * @param {string} messageID - Message ID
     * @return {Promise<Channel>}
     */
    async getMessage(channelID = this.channelID, messageID) {
        return await this.client.instance.get(`/channels/${channelID}/messages/${messageID}`);
    };

    /**
     * Post a message to a guild text or DM channel. If operating on a guild channel, this endpoint requires the SEND_MESSAGES permission to be present on the current user. If the tts field is set to true, the SEND_TTS_MESSAGES permission is required for the message to be spoken. Returns a message object. Fires a Message Create Gateway event. See message formatting for more information on how to properly format messages.
     * @see https://discord.com/developers/docs/resources/channel#create-message
     * @param {string} [id=this.channelID] - Channel ID
     * @param {?{?data:{content: string, nonce: number | string, tts: boolean, file: Buffer, embed: Embed, payload_json: string, allowed_mentions: {parse: ?[], roles: ?[], users: ?[]}}}} options
     * @return {Promise<Message>}
     */
    async createMessage(id = this.channelID, options) {
        return await this.client.instance.post(`/channels/${id}/messages`, options);
    };

    /**
     * Crosspost a message in a News Channel to following channels. This endpoint requires the 'SEND_MESSAGES' permission, if the current user sent the message, or additionally the 'MANAGE_MESSAGES' permission, for all other messages, to be present for the current user.
     * @see https://discord.com/developers/docs/resources/channel#crosspost-message
     * @param {string} [channelID = this.channelID] - Channel ID
     * @param {string} messageID - message ID
     * @return {Promise<Message>}
     */
    async crosspotMessage(channelID = this.channelID, messageID) {
        return await this.client.instance.post(`/channels/${channelID}/messages/${messageID}/crosspot`);
    };

    /**
     * Create a reaction for the message. This endpoint requires the 'READ_MESSAGE_HISTORY' permission to be present on the current user. Additionally, if nobody else has reacted to the message using this emoji, this endpoint requires the 'ADD_REACTIONS' permission to be present on the current user. Returns a 204 empty response on success. The emoji must be URL Encoded or the request will fail with 10014: Unknown Emoji.
     * @see https://discord.com/developers/docs/resources/channel#create-reaction
     * @param {string} [channelID=this.channelID] - Channel ID
     * @param {string} messageID - Message ID
     * @param {string} emoji - emoji parsed
     * @return {Promise<void>}
     */
    async createReaction(channelID = this.channelID, messageID, emoji) {
        return await this.client.instance.put(`/channels/${channelID}/messages/${messageID}/reactions/${emoji}/@me`);
    };

    /**
     * Delete a reaction the current user has made for the message. Returns a 204 empty response on success. The emoji must be URL Encoded or the request will fail with 10014: Unknown Emoji.
     * @see https://discord.com/developers/docs/resources/channel#delete-own-reaction
     * @param {string} [channelID=this.channelID] - Channel ID
     * @param {string} messageID - Message ID
     * @param {string} emoji - emoji
     * @return {Promise<void>}
     */
    async deleteOwnReaction(channelID = this.channelID, messageID, emoji) {
        return await this.client.instance.delete(`/channels/${channelID}/messages/${messageID}/reactions/${emoji}/@me`);
    };

    /**
     * Deletes another user's reaction. This endpoint requires the 'MANAGE_MESSAGES' permission to be present on the current user. Returns a 204 empty response on success. The emoji must be URL Encoded or the request will fail with 10014: Unknown Emoji.
     * @see https://discord.com/developers/docs/resources/channel#delete-user-reaction
     * @param {string} channelID - Channel ID
     * @param {string} messageID - Message ID
     * @param {string} emoji  - emoji parsed
     * @param {string} userID - User ID
     * @return {Promise<void>}
     */
    async deleteUserReaction(channelID = this.channelID, messageID, emoji, userID) {
        return await this.client.instance.delete(`/channels/${channelID}/messages/${messageID}/reactions/${emoji}/${userID}`);
    };
    
    /**
     * Get a list of users that reacted with this emoji. Returns an array of user objects on success. The emoji must be URL Encoded or the request will fail with 10014: Unknown Emoji.
     * @see https://discord.com/developers/docs/resources/channel#get-reactions
     * @param {string} channelID - Channel ID
     * @param {string} messageID - Message ID
     * @param {string} emoji - emoji parsed
     * @param {?{params: ?{before: ?string, after: ?string, limit: ?number}}} options - options
     * @param {Promise<User[]}
     */
    async getReactions(channelID = this.channelID, messageID, emoji, options) {
        return await this.client.instance.get(`/channels/${channelID}/messages/${messageID}/reactions/${emoji}`, options);
    };

    /**
     * Deletes all reactions on a message. This endpoint requires the 'MANAGE_MESSAGES' permission to be present on the current user. Fires a Message Reaction Remove All Gateway event.
     * @see https://discord.com/developers/docs/resources/channel#delete-all-reactions
     * @param {string} channelID - Channel ID
     * @param {string} messageID - Message ID
     * @return {Promise<void>}
     */
    async deleteAllReactions(channelID = this.channelID, messageID) {
        return await this.client.instance.get(`/channels/${channelID}/messages/${messageID}/reactions`);
    };

    /**
     * Deletes all the reactions for a given emoji on a message. This endpoint requires the MANAGE_MESSAGES permission to be present on the current user. Fires a Message Reaction Remove Emoji Gateway event. The emoji must be URL Encoded or the request will fail with 10014: Unknown Emoji.
     * @see https://discord.com/developers/docs/resources/channel#delete-all-reactions-for-emoji
     * @param {string} channelID - Channel ID
     * @param {string} messageID - Message ID
     * @param {string} emoji - emoji parsed
     * @return {Promise<void>}
     */
    async deleteAllReactionsForEmoji(channelID = this.channelID, messageID, emoji) {
        return await this.client.instance.get(`/channels/${channelID}/messages/${messageID}/reactions/${emoji}`);
    };

    /**
     * Edit a previously sent message. The fields content, embed, allowed_mentions and flags can be edited by the original message author. Other users can only edit flags and only if they have the MANAGE_MESSAGES permission in the corresponding channel. When specifying flags, ensure to include all previously set flags/bits in addition to ones that you are modifying. Only flags documented in the table below may be modified by users (unsupported flag changes are currently ignored without error).
     * @see https://discord.com/developers/docs/resources/channel#edit-message
     * @param {string} channelID - Channel ID
     * @param {string} messageID - Message ID
     * @param {?{data: ?{content: ?string, embed: ?Embed, flags: ?number}}} options - options
     * @return {Promise<Message>}
     */
    async editMessage(channelID = this.channelID, messageID, options) {
        return await this.client.instance.patch(`/channels/${channelID}/messages/${messageID}`, options);
    };

    /**
     * Delete a message. If operating on a guild channel and trying to delete a message that was not sent by the current user, this endpoint requires the MANAGE_MESSAGES permission. Returns a 204 empty response on success. Fires a Message Delete Gateway event.
     * @see https://discord.com/developers/docs/resources/channel#delete-message
     * @param {string} channelID - Channel ID
     * @param {string} messageID - Message ID
     * @return {Promise<void>}
     */
    async deleteMessage(channelID = this.channelID, messageID) {
        return await this.client.instance.delete(`/channels/${channelID}/messages/${messageID}`);
    };

    /**
     * Delete multiple messages in a single request. This endpoint can only be used on guild channels and requires the MANAGE_MESSAGES permission. Returns a 204 empty response on success. Fires a Message Delete Bulk Gateway event.
     * @see https://discord.com/developers/docs/resources/channel#bulk-delete-messages
     * @param {string} channelID - Channel ID
     * @param {{data: {message: string[]}}} options - options
     * @return {Promise<void>}
     */
    async bulkDeleteMessages(channelID = this.channelID, options) {
        return await this.client.instance.post(`/channels/${channelID}/messages/bulk-delete`, options);
    };

    /**
     * Edit the channel permission overwrites for a user or role in a channel. Only usable for guild channels. Requires the MANAGE_ROLES permission. Returns a 204 empty response on success. For more information about permissions, see permissions.
     * @see https://discord.com/developers/docs/resources/channel#edit-channel-permissions
     * @param {string} channelID - Channel ID
     * @param {string} overwriteID - Overwrite ID
     * @param {{data: {allow: string, deny: string, type: number}}} options - options
     * @return {Promise<void>}
     */
    async editPermissions(channelID = this.channelID, overwriteID, options) {
        return await this.client.instance.put(`/channels/${channelID}/permissions/${overwriteID}`, options);
    };

    /**
     * Returns a list of invite objects (with invite metadata) for the channel. Only usable for guild channels. Requires the MANAGE_CHANNELS permission.
     * @see https://discord.com/developers/docs/resources/channel#get-channel-invites
     * @param {string} id - Channel ID
     * @return {Promise<Invite[]>}
     */
    async getInvites(id = this.channelID) {
        return await this.client.instance.get(`/channels/${id}/invites`);
    };

    /**
     * Create a new invite object for the channel. Only usable for guild channels. Requires the CREATE_INSTANT_INVITE permission. All JSON parameters for this route are optional, however the request body is not. If you are not sending any fields, you still have to send an empty JSON object ({}). Returns an invite object. Fires an Invite Create Gateway event.
     * @see https://discord.com/developers/docs/resources/channel#create-channel-invite
     * @param {string} id - Channel ID
     * @param {?{data: {max_age: 86400, max_uses: 0, temporary: false, unique: false, target_user: ?string, target_user_type: number }}} options - options
     * @return {Promise<Invite>}
     */
    async createInvite(id = this.channelID, options) {
        return await this.client.instance.post(`/channels/${id}/invites`, options);
    };

    /**
     * Delete a channel permission overwrite for a user or role in a channel. Only usable for guild channels. Requires the MANAGE_ROLES permission. Returns a 204 empty response on success. For more information about permissions, see permissions
     * @see https://discord.com/developers/docs/resources/channel#delete-channel-permission
     * @param {string} channelID - Channel ID
     * @param {string} overwriteID - Overwrite ID
     * @return {Promise<void>}
     */
    async deletePermission(channelID = this.channelID, overwriteID) {
        return await this.client.instance.delete(`/channels/${channelID}/permissions/${overwriteID}`);
    };

    /**
     * Follow a News Channel to send messages to a target channel. Requires the MANAGE_WEBHOOKS permission in the target channel. Returns a followed channel object.
     * @see https://discord.com/developers/docs/resources/channel#follow-news-channel
     * @param {string} id - Channel ID
     * @param {{data: {webhook_channel_id: string}}} options - options
     * @return {Promise<Channel>}
     */
    async followNews(id = this.channelID, options) {
        return await this.client.instance.post(`/channels/${id}/followers`, options);
    };

    /**
     * Post a typing indicator for the specified channel. Generally bots should not implement this route. However, if a bot is responding to a command and expects the computation to take a few seconds, this endpoint may be called to let the user know that the bot is processing their message. Returns a 204 empty response on success. Fires a Typing Start Gateway event.
     * @see https://discord.com/developers/docs/resources/channel#trigger-typing-indicator
     * @param {string} id - Channel ID
     * @return {Promise<void>}
     */
    async TriggerTypingIndicator(id = this.channelID) {
        return await this.client.instance.post(`/channels/${id}/typing`);
    };

    /**
     * Returns all pinned messages in the channel as an array of message objects.
     * @see https://discord.com/developers/docs/resources/channel#get-pinned-messages
     * @param {string} id - Channel ID
     * @return {Promise<Message[]>}
     */
    async getPinnedMessages(id = this.channelID) {
        return await this.client.instance.get(`/channels/${id}/pins`);
    };

    /**
     * Pin a message in a channel. Requires the MANAGE_MESSAGES permission. Returns a 204 empty response on success.
     * @see https://discord.com/developers/docs/resources/channel#add-pinned-channel-message
     * @param {string} channelID - Channel ID
     * @param {string} messageID - Message ID
     * @return {Promise<void>}
     */
    async addPinnedMessage(channelID = this.channelID, messageID) {
        return await this.client.instance.put(`/channels/${channelID}/pins/${messageID}`);
    };

    /**
     * Delete a pinned message in a channel. Requires the MANAGE_MESSAGES permission. Returns a 204 empty response on success.
     * @see https://discord.com/developers/docs/resources/channel#delete-pinned-channel-message
     * @param {string} channelID - Channel ID
     * @param {string} messageID - Message ID
     * @return {Promise<void>}
     */
    async deletePinnedMessage(channelID = this.channelID, messageID) {
        return await this.client.instance.delete(`/channels/${channelID}/pins/${messageID}`);
    };

    /**
     * Adds a recipient to a Group DM using their access token
     * @see https://discord.com/developers/docs/resources/channel#group-dm-add-recipient
     * @param {string} channelID - Channel ID
     * @param {string} userID - User ID
     * @param {{data: {access_token: string, nick: string}}} options - options
     * @return {Promise<void>}
     */
    async groupDMAddRecipient(channelID = this.channelID, userID, options) {
        return await this.client.instance.put(`/channels/${channelID}/recipients/${userID}`, options);
    };

    /**
     * Removes a recipient from a Group DM
     * @see https://discord.com/developers/docs/resources/channel#group-dm-remove-recipient
     * @param {string} channelID - Channel ID
     * @param {string} userID - User ID
     * @return {Promise<void>}
     */
    async groupDMRemoveRecipient(channelID = this.channelID, userID) {
        return await this.client.instance.delete(`/channels/${channelID}/recipients/${userID}`);
    };
 };

module.exports = ChannelNode;