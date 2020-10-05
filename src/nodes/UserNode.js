'use strict';

class UserNode {
    constructor(client, userID) {
        this.client = client;
        this.userID = userID;
    };

    async getCurrent() {
        return await this.client.instance.get(`/users/@me`);
    };

    async getUser(id = this.userID) {
        return await this.client.instance.get(`/users/${id}`);
    };

    async modifyCurrent(options) {
        return await this.client.instance.patch(`/users/@me`, {data: options});
    };

    async getCurrentGuild(options) {
        return await this.client.instance.get(`/users/@me/guilds`, {params: options});
    };

    async leaveGuild(guildID) {
        return await this.client.instance.delete(`/users/@me/guilds/${guildID}`);
    };

    async getDMs() {
        return await this.client.instance.get(`/users/@me/channels`);
    };

    async createDM(options) {
        return await this.client.instance.post(`/users/@me/channels`, {data: options});
    };

    async createGroupDM(options) {
        return await this.client.instance.post(`/users/@me/channels`, {data: options});
    };

    async getConnections() {
        return await this.client.instance.get(`/user/@me/connections`);
    };
};

module.exports = UserNode;