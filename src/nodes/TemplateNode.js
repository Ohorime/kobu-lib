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
 * simple class
 */
class TemplateNode {
  /**
   * simple constructor
   * @param {Client} client
   * @param {string} code
   */
  constructor(client, code) {
    this.client = client;
    this.code = code;
  };

  /**
   * @param {string} [code=this.code]
   */
  async get(code = this.code) {
    return await this.client.instance.get(`/guilds/templates/${code}`);
  };

  /**
   * @param {string} [code=this.code]
   */
  async createGuild(code = this.code) {
    return await this.client.instance.post(`/guilds/templates/${code}`);
  };
};

module.exports = exports = TemplateNode;
