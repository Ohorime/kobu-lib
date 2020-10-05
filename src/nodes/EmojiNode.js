'use strict';

class EmojiNode {
    constructor(client, guildID, emojiID) {
        this.client = client;
        this.guildID = guildID;
        this.emojiID = emojiID;
    };

    async listEmojis(guildID = this.guildID) {
        return await this.client.instance.get(`/guilds/${guildID}/emojis`);
    };

    async getEmoji(guildID = this.guildID, emojiID = this.emojiID) {
        return await this.client.instance.get(`/guilds/${guildID}/emojis/${emojiID}`);
    };

    async createEmoji(guildID = this.guildID, options) {
        return await this.client.instance.post(`/guilds/${guildID}/emojis`, {data: options});
    };

    async modifyEmoji(guildID = this.guildID, emojiID = this.emojiID, options) {
        return await this.client.instance.patch(`/guilds/${guildID}/emojis/${emojiID}`, {data: options});
    };

    async deleteEmoji(guildID = this.guildID, emojiID = this.emojiID) {
        return await this.client.instance.delete(`/guilds/${guildID}/emojis/${emojiID}`);
    };
};

module.exports = EmojiNode;