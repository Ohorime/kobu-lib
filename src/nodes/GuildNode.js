'use strict';

const Guild = require('./../structures/Guild');
const Role = require('./../structures/Roles');;
const Channel = require('./../structures/Channel')

class GuildNode {
    constructor(client) {
        this.client = client;
    };

    /**
     * Create a new guild
     * @param {string} name 
     * @param {{}} options 
     */

    async create(name, options) {
        if (typeof name !== 'string') throw Error('Name is not a string');
        if (options && (typeof options !== 'object' || Array.isArray(options))) throw Error('Options is not an object');
        if (!Object.isExtensible(options)) {
            let rem = {};
            for (const [key, value] of Object.entries(options)) rem[key] = value;
            options = rem;
        };
        if (Array.isArray(options.roles)) {
            options.roles = options.roles.map((role) => role instanceof Role ? role.toJSON() : role);
        };
        if (Array.isArray(options.channels)) {
            options.channels = options.channels.map((channel) => channel instanceof Channel ? channel.toJSON() : channel);
        };
        options.name = name;
        let req = await this.client.instance.post('/guilds', {data: options})
            .then((response) => response).catch((e) => e.response);

        if (req.status < 200 || req.status >= 400) throw Error(req.data);
    
        return req.data;
    };

    async get(id, with_counts) {
        if (!id || typeof id !== 'string' || typeof id !== 'number') throw Error('Invalid ID');

        const req = await this.client.instance.get(`/guilds/${id}`, {
            params: {with_counts},
        }).then((response) => response).catch((e) => e.response);

        if (req.status < 200 || req.status >= 400) throw Error(req.data);

        return req.data;
    };

    async getPreview(id) {
        if (!id || typeof id !== 'string' || typeof id !== 'number') throw Error('Invalid ID');

        const req = await this.client.instance.get(`/guilds/${id}/preview`)
            .then((response) => response).catch((e) => e.response);
 
        if (req.status < 200 || req.status >= 400) throw Error(req.data);

        return req.data;
    };

    async modify(id, options) {
        if (!id || typeof id !== 'string' || typeof id !== 'number') throw Error('Invalid ID');
        if (options && (typeof options !== 'object' || Array.isArray(options))) throw Error('Options is not an object');

        const req = await this.client.instance.patch(`/guilds/${id}`, {data: options})
            .then((response) => response).catch((e) => e.response);;

        if (req.status < 200 || req.status >= 400) throw Error(req.data);

        return req.data;
    };

    async delete(id) {
        if (!id || typeof id !== 'string' || typeof id !== 'number') throw Error('Invalid ID');

        const req = await this.client.instance.delete(`/guilds/${id}`)
            .then((response) => response).catch((e) => e.response);

        if (req.status != 204) {
            return false;
        } else {            
            return true;
        };
    };

    async channels(id) {
        if (!id || typeof id !== 'string' || typeof id !== 'number') throw Error('Invalid ID');

        const req = await this.client.instance.get(`/guilds/${id}/channels`, {data: options})
            .then((response) => response).catch((e) => e.response);;

        if (req.status < 200 || req.status >= 400) throw Error(req.data);

        return req.data;
    };

    async createChannel(id, name, options) {
        if (!id || typeof id !== 'string' || typeof id !== 'number') throw Error('Invalid ID');
        if (!name || typeof name !== 'string' || typeof name !== 'number') throw Error('Invalid ID');
        if (options && (typeof options !== 'object' || Array.isArray(options))) options = {};

        options.name = name;

        const req = await this.client.instance.post(`/guilds/${id}/channels`, {data: options})
            .then((response) => response).catch((e) => e.response);

        if (req.status < 200 || req.status >= 400) throw Error(req.data);

        return req.data;
    };

    async modifyChannelPosition(id, options) {
        if (!id || typeof id !== 'string' || typeof id !== 'number') throw Error('Invalid ID');
        if (options && (typeof options !== 'object' || Array.isArray(options))) options = {};

        const req = await this.client.instance.patch(`/guilds/${id}/channels`, {data: options})
            .then((response) => response).catch((e) => e.response);

        if (req.status != 204) return false;
        else return true;
    };

    async getMember(guildID, userID) {
        if (!guildID || typeof guildID !== 'string' || typeof guildID !== 'number') throw Error('Invalid ID');
        if (!userID || typeof userID !== 'string' || typeof userID !== 'number') throw Error('Invalid ID');
        if (options && (typeof options !== 'object' || Array.isArray(options))) options = {};

        const req = await this.client.instance.get(`/guilds/${guildID}/members/${userID}`)
            .then((response) => response).catch((e) => e.response);

        if (req.status < 200 || req.status >= 400) throw Error(req.data);

        return req.data;
    };

    async getMembers(id, options) {
        if (!id || typeof id !== 'string' || typeof id !== 'number') throw Error('Invalid ID');
        if (options && (typeof options !== 'object' || Array.isArray(options))) options = {};

        const req = await this.client.instance.get(`/guilds/${id}/members`, {params: options})
            .then((response) => response).catch((e) => e.response);
        
        if (req.status < 200 || req.status >= 400) throw Error(req.data);

        return req.data;
    };

    async addMember(guildID, userID, access_token, options) {
        if (!guildID || typeof guildID !== 'string' || typeof guildID !== 'number') throw Error('Invalid ID');
        if (!userID || typeof userID !== 'string' || typeof userID !== 'number') throw Error('Invalid ID');
        if (!access_token || typeof access_token !== 'string' || typeof access_token !== 'number') throw Error('Invalid ID');
        if (options && (typeof options !== 'object' || Array.isArray(options))) options = {access_token};

        const req = await this.client.instance.put(`/guilds/${guildID}/members/${userID}`, {data: options})
            .then((response) => response).catch((e) => e.response);
        
        if (req.status < 200 || req.status >= 400) throw Error(req.data);

        return req.data;
    };

    async modifyMember(guildID, userID, options) {
        if (!guildID || typeof guildID !== 'string' || typeof guildID !== 'number') throw Error('Invalid ID');
        if (!userID || typeof userID !== 'string' || typeof userID !== 'number') throw Error('Invalid ID');
        if (options && (typeof options !== 'object' || Array.isArray(options))) options = {};

        const req = await this.client.instance.patch(`/guilds/${guildID}/members/${userID}`, {data: options})
            .then((response) => response).catch((e) => e.response);
        
        if (req.status != 204) return false;
        else true;
    };

    async modifyCurrentUserNick(id, options) {
        if (!id || typeof id !== 'string' || typeof id !== 'number') throw Error('Invalid ID');
        if (options && (typeof options !== 'object' || Array.isArray(options))) options = {};

        const req = await this.client.instance.patch(`/guilds/${id}/members/@me/nick`, {params: options})
            .then((response) => response).catch((e) => e.response);

        if (req.status < 200 || req.status >= 400) throw Error(req.data);

        return req.data;
    };

    async addMemberRole(guildID, userID, roleID) {
        if (!guildID || typeof guildID !== 'string' || typeof guildID !== 'number') throw Error('Invalid ID');
        if (!userID || typeof userID !== 'string' || typeof userID !== 'number') throw Error('Invalid ID');
        if (!roleID || typeof roleID !== 'string' || typeof roleID !== 'number') throw Error('Invalid ID');

        const req = await this.client.instance.put(`/guilds/${guildID}/members/${userID}/roles/${roleID}`)

    };
};

module.exports = GuildNode;