'use strict';

const {Client, ChannelNode} = require('./../src');
const client = new Client({
  intents: 1 << 0 | 1 << 9 | 1 << 1,
});

client.on('ping', (ping) => console.log(`PING: ${ping}ms`));

client.on('raw', console.log);

client.on('READY', (ready) =>
  console.log(`${ready.user.username} is now Ready`));

client.on('MESSAGE_CREATE', async (message) => {
  if (message.author.bot) return;

  if (!message.content.startsWith('o!')) return;

  /**
     * @type {string[]}
     */
  const args = message.content.slice(2).trim().split(/ +/g);
  /**
     * @type {string}
     */
  const command = args.shift().toLowerCase();

  if (command === 'ping') {
    await new ChannelNode(client).createMessage(message.channel_id, {
      content:
        `<@${message.author.id}> 🏓 pong !, RAM: ${
          (process.memoryUsage()
              .heapUsed / 1024 / 1024).toFixed(2)} / ${
          (require('os').totalmem() / 1024 / 1024).toFixed(2)
        } MB, PING: ${client.ping}`,
      allowed_mentions: {
        users: [message.author.id],
      },
    }).then(console.log).catch((e) => console.log(e));
  };
});

client.connect(require('./config').token);
