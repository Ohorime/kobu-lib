'use strict';

/**
 * @typedef ApplicationCommandOptionChoice
 * 
 * @property {string} name
 * @property {string|number} value
 */

/**
 * @typedef ApplicationCommandOption
 * 
 * @property {number} type
 * @property {string} name
 * @property {string} description
 * @property {boolean} default
 * @property {boolean} required
 * @property {ApplicationCommandOptionChoice[]} choices
 * @property {ApplicationCommandOption[]} options
 */

/**
 * @typedef ApplicationCommand
 * 
 * @property {string} id
 * @property {string} application_id
 * @property {string} name
 * @property {string} description
 * @property {ApplicationCommandOption[]} options
 */

/**
 * @typedef {'roles' | 'users' | 'everyone'} ParseAllowedMentions
 */

/**
 * @typedef AllowedMentions
 * 
 * @property {?string[]} parse
 * @property {?string[]} roles
 * @property {?ParseAllowedMentions[]} users
 * @property {?boolean} replied_user
 */

/**
 * @typedef ApplicationCommandInteractionData
 * 
 * @property {string} id
 * @property {string} name
 * @property {ApplicationCommandInteractionDataOption[]} options
 */

/**
 * @typedef ApplicationCommandInteractionDataOption
 * 
 * @property {string} name
 * @property {OptionsType} value
 * @property {ApplicationCommandInteractionDataOption[]}
 */

/**
 * @typedef Interaction
 * 
 * @property {string} id
 * @property {InteractionType} type
 * @property {?ApplicationCommandInteractionData} data
 * @property {string} guild_id
 * @property {string} channel_id
 * @property {GuildMember} member
 * @property {string} token
 * @property {number} version
 */

/**
 * @typedef InteractionApplicationCommandCallbackData
 * 
 * @property {boolean} tts
 * @property {string} content
 * @property {Embed[]} embeds
 * @property {AllowedMentions} allowed_mentions
 */

/**
 * @typedef InteractionResponse
 * 
 * @property {number} type
 * @property {InteractionApplicationCommandCallbackData} data
 */

class SplashNode {
    client;
    applicationID;
    commandID;
    guildID;
    interaction;
    messageID;
    constructor(client, applicationID, commandID, guildID, {id, token} = interaction, messageID) {
        /**
         * @type {import('./../client/Client')}
         */
        this.client = client;
        /**
         * @type {?string}
         */
        this.applicationID = applicationID;
        /**
         * @type {?string}
         */
        this.applicationToken = applicationToken;
        /**
         * @type {?string}
         */
        this.commandID = commandID;
        /**
         * @type {?string}
         */
        this.guildID = guildID;
        /**
         * @type {?{id: ?string, token: ?string}}
         */
        this.interaction = {id, token};
        /**
         * @type {?string}
         */
        this.messageID = messageID;
    };

    /**
     * Fetch all of the global commands for your application.
     * @see https://discord.com/developers/docs/interactions/slash-commands#get-global-application-commands
     * @param {string} [applicationID=this.applicationID] - Application ID
     * @return {Promise<ApplicationCommand[]>}
     */
    async getGlobalApplicationCommands(applicationID = this.applicationID) {
        return await this.client.instance.get(`/applications/${applicationID}/commands`);
    };

    /**
     * Create a new global command
     * @see https://discord.com/developers/docs/interactions/slash-commands#create-global-application-command
     * @param {{data: {name: string, description: string, options: ApplicationCommandOption[]}}} options 
     * @param {string} [applicationID=this.applicationID] - Application ID
     * @return {Promise<ApplicationCommand>} 
     */
    async createGlobalApplicationCommand(options, applicationID = this.applicationID) {
        return await this.client.instance.post(`/applications/${applicationID}/commands`, options);
    };

    /**
     * Create a new global command
     * @see https://discord.com/developers/docs/interactions/slash-commands#create-global-application-command
     * @param {{data: {name: string, description: string, options: ApplicationCommandOption[]}}} options 
     * @param {string} [applicationID=this.applicationID] - Application ID
     * @return {Promise<ApplicationCommand>} 
     */
    async editGlobalApplicationCommand(options, applicationID = this.applicationID) {
        return await this.client.instance.patch(`/applications/${applicationID}/commands`, options);
    };

    /**
     * Deletes a global command
     * @see https://discord.com/developers/docs/interactions/slash-commands#delete-global-application-command
     * @param {string} [commandID=this.commandID] - Command ID
     * @param {string} [applicationID=this.applicationID] - Application ID
     * @return {Promise<void>}
     */
    async deleteGlobalApplicationCommand(commandID = this.commandID, applicationID = this.applicationID) {
        return await this.client.instance.delete(`/applications/${applicationID}/commands/${commandID}`);
    };

    /**
     * Fetch all of the guild commands for your application for a specific guild.
     * @param {string} [guildID=this.guildID] - Guild ID
     * @param {string} [applicationID=this.applicationID] - Application ID
     * @return {Promise<ApplicationCommand>}
     */
    async getGuildApplicationCommand(guildID = this.guildID, applicationID = this.applicationID) {
        return await this.client.instance.get(`/applications/${applicationID}/guilds/${guildID}/commands`);
    };

    /**
     * Create a new guild command
     * @see https://discord.com/developers/docs/interactions/slash-commands#create-guild-application-command
     * @param {{data: {name: string, description: string, options: ApplicationCommandOption[]}}} options 
     * @param {string} [guildID=this.guildID] - Guild ID
     * @param {string} [applicationID=this.applicationID] - Application ID
     * @return {Promise<ApplicationCommand>} 
     */
    async createGuildApplicationCommand(options, guildID = this.guildID, applicationID = this.applicationID) {
        return await this.client.instance.post(`/applications/${applicationID}/guilds/${guildID}/commands`, options);
    };

    /**
     * Edit a guild command.
     * @param {{data: {name: string, description: string, options: ApplicationCommandOption[]}}} options
     * @param {string} [commandID=this.commandID]
     * @param {string} [guildID=this.guildID]
     * @param {string} [applicationID=this.applicationID]
     * @return {Promise<ApplicationCommand>}
     */
    async editGuildApplicationCommand(options, commandID = this.applicationID, guildID = this.guildID, applicationID = this.applicationID) {
        return await this.client.instance.patch(`/application/${applicationID}/guilds/${guildID}/commands/${commandID}`, options);
    };

    /**
     * Delete a guild command.
     * @param {string} [commandID=this.commandID]
     * @param {string} [guildID=this.guildID]
     * @param {string} [applicationID=this.applicationID]
     * @return {Promise<void>}
     */
    async deleteGuildApplicationCommand(commandID = this.commandID, guildID = this.guildID, applicationID = this.applicationID) {
        return await this.client.instance.delete(`/application/${applicationID}/guilds/${guildID}/commands/${commandID}`);
    };

    /**
     * Create a response to an Interaction from the gateway.
     * @see https://discord.com/developers/docs/interactions/slash-commands#create-interaction-response
     * @param {string} [interactionID=this.interactionID] - Interaction ID
     * @param {string} [interactionToken=this.interaction.token] - Interaction Token
     * @return {Promise<void>}
     */
    async createInteractionResponse(interactionToken = this.interaction.token, interactionID = this.interaction.id) {
        return await this.client.instance.post(`/interactions/${interactionID}/${interactionToken}/callback`);
    };

    /**
     * Edits the initial Interaction response.
     * @see https://discord.com/developers/docs/interactions/slash-commands#edit-original-interaction-response
     * @param {{data: {content: ?string, embeds: ?Embed[], allowed_mentions: AllowedMentions}}} options
     * @param {string} [applicationID=this.applicationID] - Application ID
     * @param {string} [interactionToken=this.interaction.token] - InteractionToken
     * @return {Promise<void>}
     */
    async editOriginalInteractionResponse(options, interactionToken = this.interaction.token, applicationID = this.applicationID) {
        return await this.client.instance.patch(`/webhooks/${applicationID}/${interactionToken}/messages/@original`, options);
    };

    /**
     * Deletes the initial Interaction response.
     * @see https://discord.com/developers/docs/interactions/slash-commands#delete-original-interaction-response
     * @param {string} [applicationID=this.applicationID] - Application ID
     * @param {string} [interactionToken=this.interaction.token] - Interaction Token
     * @return {Promise<void>}
     */
    async deleteOriginalInteractionResponse(interactionToken = this.interaction.token, applicationID = this.applicationID) {
        return await this.client.instance.delete(`/webhooks/${applicationID}/${interactionToken}/messages/@original`);
    };

    /**
     * Create a followup message for an Interaction.
     * @see https://discord.com/developers/docs/interactions/slash-commands#create-followup-message
     * @param {{data: {content: string, username: ?string, avatar_url: ?string, tts: ?boolean, file: ?Buffer, embeds: ?Embed[10], payload_json: ?string, allowed_mentions: ?AllowedMentions}, params: {wait: ?boolean}}} options 
     * @param {string} [applicationID=this.applicationID] - Application ID
     * @param {string} [interactionToken=this.interaction.token] - Interaction Token
     * @return {Promise<>}
     */
    async createFollowupMessage(options, interactionToken = this.interaction.token, applicationID = this.applicationID) {
        return await this.client.instance.post(`/webhooks/${applicationID}/${interactionToken}`, options)
    };

    /**
     * Edits a followup message for an Interaction.
     * @param {{data: {content: ?string, embeds: ?Embed[], allowed_mentions: AllowedMentions}}} options
     * @param {string} [messageID=this.messageID] - Message ID
     * @param {string} [interactionToken=this.interaction.token] - Interaction ID
     * @param {string} [applicationID=this.applicationID] - Application ID
     * @returns {Promise<void>}
     */
    async editFollowupMessage(options, messageID = this.messageID, interactionToken = this.interaction.token, applicationID = this.applicationID) {
        return await this.client.instance.patch(`/webhooks/${applicationID}/${interactionToken}/messages/${messageID}`, options);
    };

    /**
     * Deletes a followup message for an Interaction.
     * @see https://discord.com/developers/docs/interactions/slash-commands#delete-followup-message
     * @param {string} [messageID=this.messageID] - Message ID
     * @param {string} [interactionToken=this.interactionToken] - Interaction Token
     * @param {string} [applicationID=this.applicationID] - Application ID
     */
    async deleteFollowupMessage(messageID = this.messageID, interactionToken = this.interaction.token, applicationID = this.applicationID) {
        return await this.client.instance.delete(`/webhooks/${applicationID}/${interactionToken}/messages/${messageID}`);
    };
};

module.exports = SplashNode;