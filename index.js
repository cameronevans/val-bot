const { exec } = require('child_process');
const { address } = require('ip');
const Discord = require('discord.js');
const client = new Discord.Client();
const gamedig = require('gamedig');

const VHSERVER = '/home/vhserver/vhserver';
const help = '!help';
const helpVerbose = '!help-verbose';
const helpAdmin = '!help-admin';
const status = '!status';
const usage = '!usage';
const start = '!start';
const stop = '!stop';
const restart = '!restart';
const netstat = '!netstat';
const validate = '!validate';
const backup = '!backup';
const listBackup = '!list-backup';
const checkUpdate = '!check-update';
const update = '!update';
const updateLGSM = '!update-lgsm';
const players = '!players';

const commands = [
  help,
  helpVerbose,
  helpAdmin,
  status,
  usage,
  start,
  stop,
  restart,
  players,
];
const adminCommands = [
  netstat,
  validate,
  backup,
  checkUpdate,
  update,
  updateLGSM,
];

const verbose = [
  [help, 'lists basic commands'],
  [helpAdmin, 'lists admin commands'],
  [status, 'displays server online status & details'],
  [usage, 'displays server current CPU/Memory/Storage usage'],
  [start, 'starts the valheim server'],
  [stop, 'stops the valheim server gracefully'],
  [restart, 'restarts the valheim server'],
  [players, 'display current player count'],
];
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
  /* eslint-disable-next-line no-useless-escape */
  `/home/vhserver/vhserver dt | grep -A ${lines} '${grep}'`;
const formatter = (message) => `\`\`\`\n${message}\n\`\`\``;
const getState = (cb) => {
  gamedig
    .query({
      type: 'valheim',
      host: address(),
    })
    .then((state) => {
      cb(null, state);
    })
    .catch((error) => {
      cb(`Cannot query server, error: ${JSON.stringify(error)}`);
    });
};

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
      case help:
        message.channel
          .send(`Hi! I can communicate with the Valheim server for you.\nCommands: \`${commands.join(
          '`, `'
        )}\`
        `);
        break;
      case helpVerbose:
        message.channel
          .send(`Hi! I can communicate with the Valheim server for you.\n${verbose
          .map(([command, description]) => `\`${command}\`: ${description}`)
          .join('\n')}
        `);
        break;
      case helpAdmin:
        message.channel.send(
          `Admin commands **(use at your own risk)**: \`${adminCommands.join(
            '`, `'
          )}\``
        );
        break;
      case status:
        confirmMessage();
        exec(grepDetails('Valheim Server Details'), cb);
        break;
      case usage:
        confirmMessage();
        exec(grepDetails('Game Server Resource Usage'), cb);
        break;
      case start:
        confirmMessage();
        exec(vhserverCommand('start'), cb);
        break;
      case stop:
        confirmMessage();
        exec(vhserverCommand('stop'), cb);
        break;
      case restart:
        confirmMessage();
        exec(vhserverCommand('restart'), cb);
        break;
      case netstat:
        confirmMessage();
        exec('netstat -atunp | grep valheim', cb);
        break;
      case validate:
        confirmMessage();
        exec(vhserverCommand('validate'), cb);
        break;
      case checkUpdate:
        confirmMessage();
        exec(vhserverCommand('check-update'), cb);
        break;
      case update:
        confirmMessage();
        exec(vhserverCommand('update'), cb);
        break;
      case listBackup:
        confirmMessage();
        exec(grepDetails('Backups'), 4, cb);
        break;
      case backup:
        confirmMessage();
        exec(vhserverCommand('backup'), cb);
        break;
      case players:
        confirmMessage();
        getState((error, { raw: { numplayers } = {} } = {}) => {
          if (error) {
            cb(error);
          } else if (numplayers === undefined) {
            cb('Sorry, `raw.playercount` not found');
          } else {
            cb(null, `Current player count: ${numplayers}`);
          }
        });
        break;
      default:
    }
  }
});

client.once('ready', () => {
  console.log('val-bot is online!');
});

client.login('ODE0MjUxOTc1NjgzMjExMjY1.YDbJPw.T88DsNiPZJ-W9cIsLPQvEOHOG8Y');
