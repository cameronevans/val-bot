const { exec } = require("child_process");
const Discord = require("discord.js");
const client = new Discord.Client();

const commands = ["!help", "!status", "!usage", "!start", "!stop", "!restart"];
const confirmationMessages = [
  "One moment please..",
  "You got it...",
  "Just one sec...",
  "Sure thing bud...",
  "*beeps affirmatively*...",
  "Where's server higgins...",
];
const grepDetails = (grep) =>
  `/home/vhserver/vhserver dt | ${grep} | sed "s,\x1B\[[0-9;]*[a-zA-Z],,g"`;
const formatter = (message) => `\`\`\`\n${message}\n\`\`\``;

client.on("message", (message) => {
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

  switch (message.content) {
    case "!help":
      message.channel
        .send(`Hi! I can communicate to the Valheim server for you.\n Commands: \`${commands.join(
        "`, `"
      )}\`
      `);
      break;
    case "!status":
      exec(grepDetails(`grep -A 8 'Valheim Server Details'`), cb);
      break;
    case "!usage":
      exec(grepDetails(`grep -A 8 'Game Server Resource Usage'`), cb);
      break;
    case "!start":
      confirmMessage();
      exec("/home/vhserver/vhserver start", cb);
      break;
    case "!stop":
      confirmMessage();
      exec("/home/vhserver/vhserver stop", cb);
      break;
    case "!restart":
      confirmMessage();
      exec("/home/vhserver/vhserver restart", cb);
      break;
    default:
  }
});

client.once("ready", () => {
  console.log("Ready!");
});

client.login("ODE0MjUxOTc1NjgzMjExMjY1.YDbJPw.T88DsNiPZJ-W9cIsLPQvEOHOG8Y");
