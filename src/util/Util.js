'use strict';

/**
 * simple class
 */
class Util {
  /**
    * simple constructor
    */
  constructor() {
    throw Error('Do not make instace for this class');
  };

  /**
     * @param {object} def
     * @param  {...object} object
     * @return {object}
     */
  static concat(def, ...object) {
    const ret = def;
    for (const _object of object) {
      for (const [key, value] of Object.entries(_object)) {
        ret[key] = value;
      };
    };

    return ret;
  };
};

module.exports = Util;
