'use strict';

const User = require('./User');

/**
 * @typedef GuildOptions
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

class Guild {
    /**
     * @param {import('./../client/Client')} client - Client
     * @param {GuildOptions} data - Guild
     */
    constructor(client, data) {
        this.client = client;
        this.id = data.id;
        this.name = data.name;
        this.icon = data.icon;
        this.splash = data.splash;
        this.discovery_splash = data.discovery_splash;
        this.owner = new User(client, data.owner);
        this.owner_id = data.owner_id;
        this.permissions = data.permissions;
        this.permissions_new = data.permissions_new;
        this.region = data.region;
        this.afk_channel_id = data.afk_channel_id;
        this.afk_timeout = data.afk_timeout;
        this.embed_enabled = data.embed_enabled;
        this.embed_channel_id = data.embed_channel_id;
        this.verification_level = data.verification_level;
        this.default_message_notifications = data.default_message_notifications;
        this.explicit_content_filter = data.explicit_content_filter;
        /**
         * @type {Map<string, Role>}
         */
        this.roles = new Map();
        data.roles.forEach((role) => this.roles.set(role.id, new Role(this.client, role)));
        /**
         * @type {Map<string, Emoji>}
         */
        this.emojis = new Map();
        data.emojis.forEach((emoji) => this.emojis.set(emoji.id, new Emoji(this.client, emoji)));
        this.features = data.features;
        this.mfa_level = data.mfa_level;
        this.application_id = data.application_id;
        this.widget_enabled = data.widget_enabled;
        this.widget_channel_id = data.widget_channel_id;
        this.system_channel_id = data.system_channel_id;
        this.system_channel_flags = data.system_channel_flags;
        this.rules_channel_id = data.rules_channel_id;
        this.joined_at = data.joined_at;
        this.large = data.large;
        this.unavailable = data.unavailable;
        this.member_count = data.member_count;
        this.voice_states = data.voice_states;
        /**
         * @type {Map<string, Member>}
         */
        this.members = new Map();
        data.members.forEach((member) => this.members.set(member.id, new Member(client, member)));
        this.channels = new Map();
        /**
         * @type {Map<string, Channel>}
         */
        data.channels.forEach((channel) => this.channels.set(channel.id, new Channel(client, channel)));
        this.presences = data.presences;
        this.max_members = data.max_members;
        this.vanity_url_code = data.vanity_url_code;
        this.description = data.description;
        this.banner = data.banner;
        this.premium_tier = data.premium_tier;
        this.premium_subscription_count = data.premium_subscription_count;
        this.preferred_locale = data.preferred_locale;
        this.public_updates_channel_id = data.public_updates_channel_id;
        this.max_video_channel_users = data.max_video_channel_users;
        this.approximate_member_count = data.approximate_member_count;
        this.approximate_presence_count = data.approximate_presence_count;
    };
};

module.exports = Guild;