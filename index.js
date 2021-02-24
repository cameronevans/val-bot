const Discord = require('discord.js');
const client = new Discord.Client();

client.on('message', message => {
  if (message.content === '!hello') {
      message.channel.send('Hello Val!');
  }
});

client.once('ready', () => {
  console.log('Ready!');
}

client.login('f21ce7a09a7ed89851b79102c24d653209987dfa6aaf6e296e6eb68038652917')