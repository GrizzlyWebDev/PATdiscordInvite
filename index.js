const express = require("express");
const app = express();
const { Client, Intents, MessageActionRow, MessageButton, MessageEmbed} = require('discord.js');
const { token } = require("./config.json");
const cors = require("cors");
let invite = "Server is closed";
let open = false;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const client = new Client({ intents: [Intents.FLAGS.GUILDS, 'GUILD_MEMBERS', 'GUILD_INVITES', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS'] });

client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(invite);
});

client.on("interactionCreate", async (msg) => {
  const { commandName } = msg;
  if (commandName === "open") {
    invite = await msg.channel.createInvite({
      maxUses: 1,
      temporary: true,
    });
	invite = "https://discord.gg/" + invite.code;
    open = true;
	msg.reply({content: "Server is open like your mum's legs." , ephemeral: true })
  }
});

client.on("interactionCreate", async (msg) => {
	const { commandName } = msg;
	if (commandName === "close") {
	  invite = "Server is closed";
	  open = false;
	  msg.reply ({ content: 'Server is closed like your fathers views on homosexuality.', ephemeral: true })
	}
  });

client.on("interactionCreate", async (msg) => {
	const { commandName } = msg;
	if (commandName === "clear") {
		await msg.channel.messages.fetch({limit: 100}).then(messages =>{
			msg.channel.bulkDelete(messages);
	   })
	   msg.reply ({ content: 'Deleted 100 messages like God deleted your ability to have meaningful relationships with anyone.', ephemeral: true })
	}
});

client.on("guildMemberAdd", async () => {
	
    const channel = client.channels.cache.find((c) => c.name === "general");
    invite = await channel.createInvite({
      maxUses: 1,
      temporary: true,
    });
	invite = "https://discord.gg/" + invite.code;
});

client.login(token);

app.get("/", async (req, res) => {
  if (invite.code === "undefined") {
    res.status(404).send("invite is not available");
  } else {
    res.send(invite);
  }
});
app.use(
  cors({
    origin: "https://pat-thenticator.netlify.app",
    methods: ["GET"],
  })
);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
