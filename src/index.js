'use strict';

module.exports = {
  // Client
  Client: require('./client/Client'),
  WebSocket: require('./client/Websocket'),

  // version
  version: require('./../package.json').version,

  // Nodes
  AuditLogNode: require('./nodes/AuditLogNode'),
  ChannelNode: require('./nodes/ChannelNode'),
  EmojiNode: require('./nodes/EmojiNode'),
  GuildNode: require('./nodes/GuildNode'),
  InviteNode: require('./nodes/InviteNode'),
  UserNode: require('./nodes/UserNode'),
  VoiceNode: require('./nodes/VoiceNode'),
  WebhookNode: require('./nodes/WebhookNode'),

  // Structures
  AuditLog: require('./structures/AuditLog'),
  Channel: require('./structures/Channel'),
  ClientUser: require('./structures/ClientUser'),
  Emoji: require('./structures/Emoji'),
  Guild: require('./structures/Guild'),
  Invite: require('./structures/Invite'),
  User: require('./structures/User'),
  Voice: require('./structures/Voice'),
  Webhook: require('./structures/Webhook'),

  // Util
  Constants: require('./util/Constants'),
  Util: require('./util/Util'),
};
