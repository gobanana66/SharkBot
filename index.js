const keepAlive = require("./server")
const knope = require('knope')

// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const token = process.env['token'];
const prefix = process.env['prefix'];

// Create a new client instance
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
});

keepAlive()

// When the client is ready, run this code (only once)
client.once('ready', () => {
  console.log('Ready!');
});

const shark = 'Shark! ';

client.on('message', message => {
  if (message.author.bot) return; //returns doesn't respond to bot or webhook messages.
  const times = Math.floor(Math.random() * 9 + 1);
  if (message.content.toLowerCase().includes('shark')) {
    message.react('🦈');
    message.channel.send(shark.repeat(times)); // do anything here
  }
  if (message.content.toLowerCase().includes('queen')) {
    message.react('👑');
  }
  if (message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();
    if (command === 'hype') {
      var compliment = knope.getCompliment(args, times);
      message.channel.send(`${compliment}`);
    }
  }

});

// Login to Discord with your client's token
client.login(token).catch(console.error)