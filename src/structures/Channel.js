'use strict';

class Channel {
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