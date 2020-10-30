'use strict';

const {Cluster} = require('./../src');

const cluster = new Cluster('/test/simple.test', require('./config').token);

cluster.spawn();
