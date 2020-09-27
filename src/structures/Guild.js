'use strict';

const User = require('./User');
const Role = require('./Role');
const Emoji = require('./Emoji');
const Member = require('./Member');
const Channel = require('./Channel');
const TextChannel = require('./TextChannel');
const DmChannel = require('./DmChannel');
const GuildVoiceChannel = require('./GuildVoiceChannel');
const GroupDmChannel = require('./GroupDmChannel');
const GuildCategoryChannel = require('./GuildCategoryChannel');
const GuildNewsChannel = require('./GuildNewsChannel');
const GuildStoreChannel = require('./GuildStore');

class Guild {
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
        this.roles = new Map();
        data.roles.forEach((role) => this.roles.set(role.id, new Role(this.client, role)));
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
        this.members = new Map();
        data.members.forEach((member) => this.members.set(member.id, new Member(client, member)));
        this.channels = new Map();
        data.channels.forEach((channel) => {
            switch (channel.type) {
                case 0:
                    this.channels.set(channel.id, new TextChannel(client, channel));
                    break;
                case 1:
                    this.channel.set(channel.id, new DmChannel(client, channel));
                    break;
                case 2:
                    this.channels.set(channel.id, new GuildVoiceChannel(client, channel));
                    break;
                case 3:
                    this.channel.set(channel.id, new GroupDmChannel(client, channel));
                    break;
                case 4:
                    this.channels.set(channel.id, new GuildCategoryChannel(client, channel));
                    break;
                case 5:
                    this.channels.set(channel.id, new GuildNewsChannel(client, channel));
                    break;
                case 6:
                    this.channels.set(channel.id, new GuildStoreChannel(client, channel));
                    break;
                default:
                    this.channels.set(channel.id, new Channel(client, channel));
                    break;
            };
        });
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