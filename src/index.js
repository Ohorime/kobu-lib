'use strict';

const Client = require('./client/Client');
const client = new Client();
const { readdirSync } = require('fs');

client.on('raw', console.log);

for (const file of readdirSync('./src/events', {encoding: 'utf8'})) {
    const Event = require('./events/' + file);
    const event = new Event(client);

    client.on(event.name, (...args) => event.handle(...args));
};

client.connect(require('./../config').token);