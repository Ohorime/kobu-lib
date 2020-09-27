'use strict';

const Client = require('./client/Client');
const client = new Client();

client.on('raw', console.log);

client.connect(require('./../config').token);