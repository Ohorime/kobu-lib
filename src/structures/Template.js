'use strict';

/**
 * @typedef Template
 *
 * @property {string} code
 * @property {string} name
 * @property {?strig} description
 * @property {number} usage_count
 * @property {string} creator_id
 * @property {User} creator
 * @property {number} created_at
 * @property {number} updated_at
 * @property {string} source_guild_id
 * @property {Guild} serialized_source_guild
 * @property {?boolean} is_dirty
 */

/**
 * Simple class
 */
class Template {
  /**
   * Simple constructor
   * @param {Client} client
   * @param {Template} data
   */
  constructor(client, data) {
    this.client = client;

    this.code = data.code;
    this.name = data.name;
    this.description = data.description;
    this.usage_count = data.usage_count;
    this.creator_id = data.creator_id;
    this.creator = data.creator;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
    this.source_guild_id = data.source_guild_id;
    this.serialized_source_guild = data.serialized_source_guild;
    this.is_dirty = data.is_dirty;
  };
};

module.exports = exports = Template;
