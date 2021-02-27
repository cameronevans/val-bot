# val-bot

discord bot to run lgsm server commands for valheim. uses node, pm2 and gamedig

- install node & npm on your server
- log into your server as `vhserver`
- clone this repo
- `cd ./vh-bot`
- `npm i`
- `TOKEN=PutYourDiscordBotTokenHere npm run start`
- add bot to your server, message `!help` for list of commands

### commands

- `npm run start`: run val-bot
- `npm run stop`: stop val-bot
- `npm run reload`: stop & start val-bot
- `npm run status`: check recent pm2 logs
- `npm run list`: list current pm2 processes
