const { exec } = require('child_process');
const Discord = require('discord.js');
const client = new Discord.Client();

const VHSERVER = '/home/vhserver/vhserver';
const helpCommand = '!help';
const helpAdminCommand = '!help-admin';
const statusCommand = '!status';
const usageCommand = '!usage';
const startCommand = '!start';
const stopCommand = '!stop';
const restartCommand = '!restart';
const netstatCommand = '!netstat';
const validateCommand = '!validate';
const backupCommand = '!backup';
const listBackupCommand = '!list-backup';
const updateCommand = '!update';
const updateLGSMCommand = '!update-lgsm';

const commands = [
  helpCommand,
  helpVerbose,
  helpAdminCommand,
  statusCommand,
  usageCommand,
  startCommand,
  stopCommand,
  restartCommand,
];
const adminCommands = [
  netstatCommand,
  validateCommand,
  backupCommand,
  updateCommand,
  updateLGSMCommand,
];

const verbose = {
  [helpCommand]: 'lists basic commands',
  [helpAdminCommand]: 'lists admin commands',
  [statusCommand]: 'displays server online status & details',
  [usageCommand]: 'displays server current CPU/Memory/Storage usage',
  [startCommand]: 'starts the valheim server',
  [stopCommand]: 'stops the valheim server gracefully',
  [restartCommand]: 'restarts the valheim server',
};
const confirmationMessages = [
  'One moment please...',
  'You got it...',
  'Just one sec...',
  'Sure thing bud...',
  '*beeps affirmatively*...',
  "Where's server higgins...",
  'Hoy...',
  '*beeping intensifies*...',
  'Coming right up...',
  'Roger Roger...',
  `Yes m'lord...`,
  `Aye-aye...`,
  'Wololo...',
  'Affirmative...',
];
const vhserverCommand = (command) => `${VHSERVER} ${command}`;
const grepDetails = (grep, lines = 8) =>
  `/home/vhserver/vhserver dt | grep -A ${lines} '${grep}' | sed "s,\x1B\[[0-9;]*[a-zA-Z],,g"`;
const formatter = (message) => `\`\`\`\n${message}\n\`\`\``;

client.on('message', (message) => {
  const confirmMessage = () =>
    message.channel.send(
      confirmationMessages[
        Math.floor(Math.random() * confirmationMessages.length)
      ]
    );
  const cb = (error, stdout, stderr) => {
    if (error) {
      message.channel.send(formatter(`error: ${error.message}`));
      return;
    }
    if (stderr) {
      message.channel.send(formatter(`stderr: ${stderr}`));
      return;
    }
    message.channel.send(formatter(stdout));
  };

  if ([...commands, ...adminCommands].includes(message.content)) {
    switch (message.content) {
      case '!help':
        message.channel
          .send(`Hi! I can communicate with the Valheim server for you.\nCommands: \`${commands.join(
          '`, `'
        )}\`
        `);
        break;
      case '!help-verbose':
        message.channel
          .send(`Hi! I can communicate with the Valheim server for you.\nCommands: \`${verbose.map(
          (command, description) => `\`${command}\`: ${description}\n`
        )}\`
        `);
        break;
      case '!help-admin':
        message.channel.send(
          `Admin commands **use at your own risk**: ${adminCommands.join(
            '`, `'
          )}\``
        );
        break;
      case '!status':
        confirmMessage();
        exec(grepDetails('Valheim Server Details'), cb);
        break;
      case '!usage':
        confirmMessage();
        exec(grepDetails('Game Server Resource Usage'), cb);
        break;
      case '!start':
        confirmMessage();
        exec(vhserverCommand('start'), cb);
        break;
      case '!stop':
        confirmMessage();
        exec(vhserverCommand('stop'), cb);
        break;
      case '!restart':
        confirmMessage();
        exec(vhserverCommand('restart'), cb);
        break;
      case '!netstat':
        confirmMessage();
        exec('netstat -atunp | grep valheim', cb);
        break;
      case '!validate':
        confirmMessage();
        exec(vhserverCommand('validate'), cb);
        break;
      case '!check-update':
        confirmMessage();
        exec(vhserverCommand('check-update'), cb);
        break;
      case '!update':
        confirmMessage();
        exec(vhserverCommand('update'), cb);
        break;
      case '!list-backup':
        confirmMessage();
        exec(grepDetails('Backups'), 4, cb);
        break;
      case '!backup':
        confirmMessage();
        exec(vhserverCommand('backup'), cb);
        break;

      default:
    }
  }
});

client.once('ready', () => {
  console.log('val-bot is online!');
});

client.login('ODE0MjUxOTc1NjgzMjExMjY1.YDbJPw.T88DsNiPZJ-W9cIsLPQvEOHOG8Y');
