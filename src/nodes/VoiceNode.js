'use strict';

/**
 * @typedef Voice
 * 
 * @property {?string} guild_id
 * @property {string} channel_id
 * @property {string} user_id
 * @property {?Member} member
 * @property {string} session_id
 * @property {boolean} deaf
 * @property {boolean} mute
 * @property {boolean} self_deaf
 * @property {boolean} self_mute
 * @property {?boolean} self_stream
 * @property {boolean} self_boolean
 * @property {boolean} suppress
 */

class VoiceNode {
    /**
     * VoiceNode constructor
     * @param {import('./../client/Client')} client - Client
     */
    constructor(client) {
        /**
         * @type {import('./../client/Client')}
         */
        this.client = client;
    };

    /**
     * Returns an array of voice region objects that can be used when creating servers.
     * @see https://discord.com/developers/docs/resources/voice#list-voice-regions
     * @return {Promise<VoiceRegion[]>}
     */
    async listRegions() {
        return await this.client.instance.get(`/voice/regions`);
    };
};

module.exports = VoiceNode;