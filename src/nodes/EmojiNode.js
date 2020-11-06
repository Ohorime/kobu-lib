'use strict';

/**
 * @typedef Emoji
 * 
 * @property {string} id
 * @property {string} name
 * @property {?Role[]} roles
 * @property {?User[]} users
 * @property {?boolean} require_colons
 * @property {?boolean} managed
 * @property {?boolean} animated
 * @property {?boolean} available
 */

class EmojiNode {
    /**
     * Constructor of EmojiNode
     * @param {import('./../client/Client')} client - Client
     * @param {?string} guildID - Guild ID
     * @param {?string} emojiID - Emoji ID
     */
    constructor(client, guildID, emojiID) {
        /**
         * @type {import('./../client/Client')}
         */
        this.client = client;
        /**
         * @type {?string}
         */
        this.guildID = guildID;
        /**
         * @type {?string}
         */
        this.emojiID = emojiID;
    };

    /**
     * Returns a list of emoji objects for the given guild.
     * @see https://discord.com/developers/docs/resources/emoji#list-guild-emojis
     * @param {string} [guildID=this.guildID] - Guild ID
     * @return {Promise<Emoji[]>}
     */
    async listEmojis(guildID = this.guildID) {
        return await this.client.instance.get(`/guilds/${guildID}/emojis`);
    };

    /**
     * Returns an emoji object for the given guild and emoji IDs.
     * @see https://discord.com/developers/docs/resources/emoji#get-guild-emoji
     * @param {string} [guildID=this.guildID] - Guild ID
     * @param {string} emojiID - Emoji ID
     * @return {Promise<Emoji>}
     */
    async getEmoji(emojiID = this.emojiID, guildID = this.guildID) {
        return await this.client.instance.get(`/guilds/${guildID}/emojis/${emojiID}`);
    };

    /**
     * Create a new emoji for the guild. Requires the MANAGE_EMOJIS permission. Returns the new emoji object on success. Fires a Guild Emojis Update Gateway event.
     * @see https://discord.com/developers/docs/resources/emoji#create-guild-emoji
     * @param {string} [guildID=this.guildID] - Guild ID
     * @param {{data: {name: string, image: string, roles: string[]}}} options - options
     * @return {Promise<Emoji>}
     */
    async createEmoji(options, guildID = this.guildID) {
        return await this.client.instance.post(`/guilds/${guildID}/emojis`, options);
    };

    /**
     * Modify the given emoji. Requires the MANAGE_EMOJIS permission. Returns the updated emoji object on success. Fires a Guild Emojis Update Gateway event.
     * @see https://discord.com/developers/docs/resources/emoji#modify-guild-emoji
     * @param {string} [guildID=this.guildID] - Guild ID
     * @param {string} [emojiID=this.guildID] - Emoji ID
     * @param {?{data: ?{name: ?string, roles: ?string[]}}} options - options
     * @return {Promise<Emoji>}
     */
    async modifyEmoji(options, emojiID = this.emojiID, guildID = this.guildID) {
        return await this.client.instance.patch(`/guilds/${guildID}/emojis/${emojiID}`, options);
    };

    /**
     * Delete the given emoji. Requires the MANAGE_EMOJIS permission. Returns 204 No Content on success. Fires a Guild Emojis Update Gateway event.
     * @see https://discord.com/developers/docs/resources/emoji#delete-guild-emoji
     * @param {string} [guildID=this.guildID] - Guild ID
     * @param {string} [emojiID=this.emojiID] - Emoji ID
     * @return {Promise<void>}
     */
    async deleteEmoji(guildID = this.guildID, emojiID = this.emojiID) {
        return await this.client.instance.delete(`/guilds/${guildID}/emojis/${emojiID}`);
    };
};

module.exports = EmojiNode;