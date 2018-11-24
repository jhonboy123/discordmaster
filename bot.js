var express = require('express');
var app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
const Discord = require("discord.js") 
const client = new Discord.Client();
const settings = require("./setari.json")
const bot = new Discord.Client()
var rainbowing = "false";
var rainbow1 = "false";
var rainbow2 = "false";
bot.on('ready', async => {
console.log("Ready!" + "\n" + "Numele si ID-ul Botului: " + bot.user.tag + "\n" + "Servere: "  + bot.guilds.size + "\n" + "Utilizatori: " + bot.users.size)
bot.user.setActivity('.:: !rhelp ::.')
bot.user.setActivity(".:: !rhelp ::.", {
  type: "STREAMING",
  url: "https://www.twitch.tv/tfue"
});
});
bot.on('message', message => {
    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);
	if(message.channel.name != undefined)
	{
    if(command === settings.prefix + settings.rainbowcommand) {
		message.react("✔");
		rainbowing = "true";
		rainbow1 = "true";
		rainbow2 = "false";
        const rolez = message.mentions.roles.first() || message.guild.roles.find(r=> r.name === args [0])
        if(!rolez) return message.channel.send(settings.messageresponse.rolenotfound).catch(err=> message.channel.send("No response"))
        if(!message.guild.member(bot.user.id).hasPermission("MANAGE_ROLES")) return message.channel.send(settings.messageresponse.missingperm).catch(err=> message.channel.send("no response"))
        var colors = settings.rainbowrole
		var i=0;
        var rolestart = setInterval(function() {
           // var colorsz = colors[Math.floor(Math.random() * colors.length)];
			if(rainbowing === "true" && rainbow1 === "true")
			{
            rolez.setColor(colors[i])
			i=i+1;
			if(i>6)
			{
				i=0;
			}
			}
        }, settings.rainbowdelay); 
            message.channel.send(settings.messageresponse.success).catch(err=> message.channel.send("No response"))
			
    }
	    if(command === settings.prefix + settings.rainbowcommandpro) {
		message.react("✔");
		rainbowing = "true";
		rainbow1 = "false";
		rainbow2 = "true";
        const rolez = message.mentions.roles.first() || message.guild.roles.find(r=> r.name === args [0])
        if(!rolez) return message.channel.send(settings.messageresponse.rolenotfound).catch(err=> message.channel.send("No response"))
        if(!message.guild.member(bot.user.id).hasPermission("MANAGE_ROLES")) return message.channel.send(settings.messageresponse.missingperm).catch(err=> message.channel.send("no response"))
        var colors = settings.rainbowrolepro
		var i=0;
        var rolestart = setInterval(function() {
           // var colorsz = colors[Math.floor(Math.random() * colors.length)];
			if(rainbowing === "true" && rainbow2 === "true")
			{
            rolez.setColor(colors[i])
			i=i+1;
			if(i>29)
			{
				i=0;
			}
			}
        }, 333); 
            message.channel.send(settings.messageresponse.success).catch(err=> message.channel.send("No response"))
			
    }
	if(command === settings.prefix + "rhelp" && message.member.permissions.has("ADMINISTRATOR")) {
		message.react("✔");
		const embed = new Discord.RichEmbed()
  .setTitle("__Basic Informations__")
  .setAuthor("Rainbow#1590", "https://i.gifer.com/5YVx.gif")
  /*
   * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
   */
  .setColor(0x00AE86)
  //.setImage("https://i.gifer.com/5YVx.gif")
  /*
   * Takes a Date object, defaults to current date.
   */
  .setTimestamp()
  .addField("Servers and Users",
    "The bot is currently on " + bot.guilds.size + " __servers__ with " + bot.users.size + " __users__")
  .addField("Commands and Help",
    "Write !rainbow @your_role.To make this work, create a role with Administrator access, put it above the role you want the rainbow effect and give it to me.")
 
  message.channel.send({embed});

	}
	if(command === settings.prefix + "rping" && message.member.permissions.has("ADMINISTRATOR")) {
		message.react("✔");
	
			message.channel.send("Pinging ...")
			.then((msg) => {
				msg.edit("Ping: " + (Date.now() - msg.createdTimestamp))
			});
	}
	if(command === settings.prefix + "rstop04" && message.member.permissions.has("ADMINISTRATOR")) {
		message.react("✔");
		rainbowing = "false";
	}
	if(command === settings.prefix + "rrestart04" && message.member.permissions.has("ADMINISTRATOR")) {
		message.react("✔");
		
	}
	if(command === settings.prefix + "pepetest" && message.member.permissions.has("ADMINISTRATOR")) {
		message.react("✔");
		message.author.send("Pana e noob");
		
	}
	if(command === settings.prefix + "rinvite" && message.member.permissions.has("ADMINISTRATOR")) {
		message.react("✔");
		message.author.send("Invite me to your server from the link below");
		message.author.send("https://discordapp.com/api/oauth2/authorize?client_id=456483243454234636&permissions=0&scope=bot");
		
	}
  if(command === settings.prefix + "restart04" && message.member.permissions.has("ADMINISTRATOR")) {
		process.exit()
	}
			
			
//client.on("guildMemberAdd", (member) => {
 // console.log(`New User "${member.user.username}" has joined "${member.guild.name}"` );
 // member.guild.channels.get("welcome").send(`"${member.user.username}" has joined this server`);
//}
  }});
bot.login(settings.token).catch(err=> console.log("Incorrect Token was provided"))