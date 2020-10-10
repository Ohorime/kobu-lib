'use strict';

/**
 * @typedef Invite
 * 
 * @property {string} code
 * @property {Guild} guild
 * @property {Channel} channel
 * @property {?User} inviter
 * @property {?User} target_user
 * @property {?number} approximate_presence_count
 * @property {?number} approximate_member_count
 */

class InviteNode {
    /**
     * InviteNode constructor
     * @param {import('./../client/Client')} client - Client
     * @param {?string} inviteCode - Invite code
     */
    constructor(client, inviteCode) {
        /**
         * @type {import('./../client/Client')}
         */
        this.client = client;
        /**
         * @type {?string}
         */
        this.inviteCode = inviteCode;
    };

    /**
     * Returns an invite object for the given code.
     * @see https://discord.com/developers/docs/resources/invite#get-invite
     * @param {string} [inviteCode=this.inviteCode] - Invite code
     * @param {?boolean} [with_counts=false] - With Count
     * @return {Promise<Invite>}
     */
    async get(inviteCode = this.inviteCode, with_counts = false) {
        return await this.client.instance.get(`/invites/${inviteCode}`, {params: {with_counts}});
    };

    /**
     * Delete an invite. Requires the MANAGE_CHANNELS permission on the channel this invite belongs to, or MANAGE_GUILD to remove any invite across the guild. Returns an invite object on success. Fires a Invite Delete Gateway event.
     * @see https://discord.com/developers/docs/resources/invite#delete-invite
     * @param {string} [inviteCode=this.inviteCode]
     * @return {Promise<void>} 
     */
    async delete(inviteCode = this.inviteCode) {
        return await this.client.instance.delete(`/invites/${inviteCode}`);
    };
};

module.exports = InviteNode;