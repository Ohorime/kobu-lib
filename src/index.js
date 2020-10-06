'use strict';

module.exports = {
  // Client
  Client: require('./client/Client'),
  WebSocket: require('./client/Websocket'),

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
  ClientUser: require('./structures/ClientUser'),
  Guild: require('./structures/Guild'),
  User: require('./structures/User'),

  // Util
  Constants: require('./util/Constants'),
  Util: require('./util/Util'),
};
