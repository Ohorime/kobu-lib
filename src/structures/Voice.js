'use strict';

class Voice {
    constructor(client, data) {
        this.client = client;
        this.guild_id = data.guild_id;
        this.channel_id = data.channel_id;
        this.user_id = data.user_id;
        this.member = data.member;
        this.session_id = data.session_id;
        this.deaf = data.deaf;
        this.mute = data.mute;
        this.self_deaf = data.self_deaf;
        this.self_mute = data.self_mute;
        this.self_stream = data.self_stream;
        this.self_video = data.self_stream;
        this.suppress = data.suppress;
    };
};

module.exports = Voice;