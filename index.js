
const express = require('express');
const app = express();
const { Client, Intents} = require('discord.js');
const { token } = require('./config.json');
let invite;
const client = new Client({ intents: [Intents.FLAGS.GUILDS, 'GUILD_MEMBERS', 'GUILD_INVITES', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS'] });
client.on('ready', async () => {
		const guild = client.guilds.cache.find(g => g.name === "Test");
		if(!guild || !guild.available) return message.channel.send("Can't find guild");
		const channel = guild.channels.cache.find(c => c.name === "general");
		invite = await channel.createInvite({
			maxUses: 1,
			temporary: true,
		})
	})
	
	client.login(token);

app.get('/', async (req, res) => {
	
	
	 if (invite.code === "undefined") {
	 	res.status(404).send('invite is not available')
	 } else {
		res.send('https://discord.gg/' + invite.code);
	 }
	 setTimeout(function () {
        // When NodeJS exits
        process.on("exit", function () {

            require("child_process").spawn(process.argv.shift(), process.argv, {
                cwd: process.cwd(),
                detached : true,
                stdio: "inherit"
            });
        });
        process.exit(1);
    }, 1000);
});

const port = process.env.PORT || 4000; 
app.listen(port, () => console.log(`Listening on port ${port}...`));