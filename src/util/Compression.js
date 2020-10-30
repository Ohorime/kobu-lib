'use strict';

const {unzip} = require('zlib');

module.exports.compress = exports.compress = function() {};

module.exports.decompress = exports.decompress = function(buff) {
  return new Promise((resolve, reject) => {
    unzip(buff, (err, buffer) => {
      if (err) return reject(err);
      else return resolve(buffer);
    });
  });
};
