const { exec } = require('child_process');
const Discord = require('discord.js');
const client = new Discord.Client();

const pruneColorization = message => message.replace(/\\x.*m/, '');

client.on('message', message => {
  if (message.content === '!status') {
      exec(`/home/vhserver/vhserver dt | grep -A 8 'Valheim Server Details'`, (error, stdout, stderr) => {
        if (error) {
            message.channel.send(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            message.channel.send(`stderr: ${stderr}`);
            return;
        }
        message.channel.send(pruneColorization(stdout));
    });
  }
});

client.once('ready', () => {
  console.log('Ready!');
});

client.login('ODE0MjUxOTc1NjgzMjExMjY1.YDbJPw.T88DsNiPZJ-W9cIsLPQvEOHOG8Y')