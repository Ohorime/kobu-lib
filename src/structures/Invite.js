'use strict';

class Invite {
    constructor(client, data) {
        this.client = client;
        this.code = data.code;
        this.guild = data.guild;
        this.channel = data.channel;
        this.inviter = data.inviter;
        this.target_user = data.target_user;
        this.target_user_type = data.target_user_type;
        this.approximate_presence_count = data.approximate_presence_count;
        this.approximate_member_count = data.approximate_member_count;
    };
};

module.exports = Invite;