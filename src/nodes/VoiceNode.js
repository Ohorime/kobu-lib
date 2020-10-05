'use strict';

class VoiceNode {
    constructor(client) {
        this.client = client;
    };

    async listRegions() {
        return await this.client.instance.get(`/voice/regions`);
    };
};

module.exports = VoiceNode;