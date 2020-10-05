'use strict';

class ChannelNode {
    constructor(client, channelID) {
        this.client = client;
        this.channelID = channelID;
    };

    async get(id = this.channelID) {
        return await this.client.instance.get(`/channels/${id}`);
    };

    async modify(id = this.channelID, options) {
        return await this.client.instance.patch(`/channels/${id}`, {data: options});
    };

    async delete(id = this.channelID) {
        return await this.client.instance.delete(`/channels/${id}`);
    };

    async getMessages(id = this.channelID, options) {
        return await this.client.instance.get(`/channels/${id}/messages`, {params: options});
    };

    async getMessage(channelID = this.channelID, messageID) {
        return await this.client.instance.get(`/channels/${channelID}/messages/${messageID}`);
    };

    async createMessage(id = this.channelID, options, content_type = 'application/json') {
        return await this.client.instance.post(`/channels/${id}/messages`, {data: options, headers: {'Content-type': content_type}});
    };

    async crosspotMessage(channelID = this.channelID, messageID) {
        return await this.client.instance.post(`/channels/${channelID}/messages/${messageID}/crosspot`);
    };

    async createReaction(channelID = this.channelID, messageID, emoji) {
        return await this.client.instance.put(`/channels/${channelID}/messages/${messageID}/reactions/${emoji}/@me`);
    };

    async deleteOwnReaction(channelID = this.channelID, messageID, emoji) {
        return await this.client.instance.delete(`/channels/${channelID}/messages/${messageID}/reactions/${emoji}/@me`);
    };

    async deleteUserReaction(channelID = this.channelID, messageID, emoji, userID) {
        return await this.client.instance.delete(`/channels/${channelID}/messages/${messageID}/reactions/${emoji}/${userID}`);
    };
    
    async getReactions(channelID = this.channelID, messageID, emoji, options) {
        return await this.client.instance.get(`/channels/${channelID}/messages/${messageID}/reactions/${emoji}`, {params: options});
    };

    async deleteAllReactions(channelID = this.channelID, messageID) {
        return await this.client.instance.get(`/channels/${channelID}/messages/${messageID}/reactions`);
    };

    async deleteAllReactionsForEmoji(channelID = this.channelID, messageID, emoji) {
        return await this.client.instance.get(`/channels/${channelID}/messages/${messageID}/reactions/${emoji}`);
    };

    async editMessage(channelID = this.channelID, messageID, options) {
        return await this.client.instance.patch(`/channels/${channelID}/messages/${messageID}`, {data: options});
    };

    async deleteMessage(channelID = this.channelID, messageID) {
        return await this.client.instance.delete(`/channels/${channelID}/messages/${messageID}`);
    };

    async bulkDeleteMessages(channelID = this.channelID, options) {
        return await this.client.instance.post(`/channels/${channelID}/messages/bulk-delete`, {data: options});
    };

    async editPermissions(channelID = this.channelID, overwriteID, options) {
        return await this.client.instance.put(`/channels/${channelID}/permissions/${overwriteID}`, {data: options});
    };

    async getInvites(id = this.channelID) {
        return await this.client.instance.get(`/channels/${id}/invites`);
    };

    async createInvite(id = this.channelID, options) {
        return await this.client.instance.post(`/channels/${id}/invites`, {data: options});
    };

    async deletePermission(channelID = this.channelID, overwriteID) {
        return await this.client.instance.delete(`/channels/${channelID}/permissions/${overwriteID}`);
    };

    async followNews(id = this.channelID, options) {
        return await this.client.instance.post(`/channels/${id}/followers`, {data: options});
    };

    async TriggerTypingIndicator(id = this.channelID) {
        return await this.client.instance.post(`/channels/${id}/typing`);
    };

    async getPinnedMessages(id = this.channelID) {
        return await this.client.instance.get(`/channels/${id}/pins`);
    };

    async addPinnedMessage(channelID = this.channelID, messageID) {
        return await this.client.instance.put(`/channels/${channelID}/pins/${messageID}`);
    };

    async deletePinnedMessage(channelID = this.channelID, messageID) {
        return await this.client.instance.delete(`/channels/${channelID}/pins/${messageID}`);
    };

    async groupDMAddRecipient(channelID = this.channelID, userID, options) {
        return await this.client.instance.put(`/channels/${channelID}/recipients/${userID}`, {data: options});
    };

    async groupDMRemoveRecipient(channelID = this.channelID, userID) {
        return await this.client.instance.delete(`/channels/${channelID}/recipients/${userID}`);
    };
 };

module.exports = ChannelNode;