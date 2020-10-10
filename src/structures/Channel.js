'use strict';

/**
 * @typedef ChannelObject
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

class Channel {
    /**
     * @param {import('./../client/Client')} client - Client
     * @param {ChannelObject} data - Channel
     */
    constructor(client, data) {
        this.client = client;
        this.id = data.id;
        this.type = data.type;
        this.guild_id = data.guild_id;
        this.position = data.position;
        this.permission_overwrites = data.permission_overwrites;
        this.name = data.name;
        this.topic = data.topic;
        this.nsfw = data.nsfw;
        this.last_message_id = data.last_message_id;
        this.bitrate = data.bitrate;
        this.user_limit = data.user_limit;
        this.rate_limit_per_user = data.rate_limit_per_user;
        this.recipients = data.recipients;
        this.icon = data.icon;
        this.owner_id = data.owner_id;
        this.application_id = data.application_id;
        this.parent_id = data.parent_id;
        this.last_pin_timestamp = data.last_message_id;
    };
};

module.exports = Channel;