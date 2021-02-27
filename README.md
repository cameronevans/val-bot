# val-bot
![Screenshot 2021-02-27 170759](https://user-images.githubusercontent.com/6485269/109400375-cf5eac00-791e-11eb-8c1e-ce6f49330bea.jpg)




discord bot to run lgsm server commands for valheim. uses node, pm2 and gamedig

- install node & npm on your server
- log into your server as `vhserver`
- clone this repo
- `cd ./val-bot`
- `npm i`
- create a discord bot, add to your server & copy the token to paste into the next command
- `TOKEN=PutYourDiscordBotTokenHere npm run start`
- message `!help` for list of commands

### commands

- `npm run start`: run val-bot
- `npm run stop`: stop val-bot
- `npm run reload`: stop & start val-bot
- `npm run status`: check recent pm2 logs
- `npm run list`: list current pm2 processes
