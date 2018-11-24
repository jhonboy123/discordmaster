const Discord = require("discord.js") 
const client = new Discord.Client();
const settings = require("./setari.json")
const bot = new Discord.Client()
bot.on('ready', async => {
console.log("Ready!" + "\n" + "Numele si ID-ul Botului: " + bot.user.tag + "\n" + "Servere: "  + bot.guilds.size + "\n" + "Utilizatori: " + bot.users.size)
bot.user.setActivity('.:: !rhelp ::.')
});
bot.on('message', message => {
    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);
	if(message.channel.name == undefined)
	{
		console.log("Someone sent a DM" + message)
	}
    if(command === settings.prefix + settings.rainbowcommand) {
		message.react("✔");
        const rolez = message.mentions.roles.first() || message.guild.roles.find(r=> r.name === args [0])
        if(!rolez) return message.channel.send(settings.messageresponse.rolenotfound).catch(err=> message.channel.send("No response"))
        if(!message.guild.member(bot.user.id).hasPermission("MANAGE_ROLES")) return message.channel.send(settings.messageresponse.missingperm).catch(err=> message.channel.send("no response"))
        var colors = settings.rainbowrole
        var rolestart = setInterval(function() {
            var colorsz = colors[Math.floor(Math.random() * colors.length)];
            rolez.setColor(colorsz)
        }, settings.rainbowdelay); 
            message.channel.send(settings.messageresponse.success).catch(err=> message.channel.send("No response"))

    }
    if(command === settings.prefix + settings.rainbowhelp && message.member.permissions.has("ADMINISTRATOR")) {
		message.react("✔");
		message.channel.send(settings.messageresponse.rainbowhelp).catch(err=> message.channel.send("No response"))
		message.channel.send(settings.messageresponse.rainbowhelp2).catch(err=> message.channel.send("No response"))
    }
	if(command === settings.prefix + "rinfo" && message.member.permissions.has("ADMINISTRATOR")) {
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
 
  message.channel.send({embed});

	}
	if(command === settings.prefix + "rping" && message.member.permissions.has("ADMINISTRATOR")) {
		message.react("✔");
	
			message.channel.send("Pinging ...")
			.then((msg) => {
				msg.edit("Ping: " + (Date.now() - msg.createdTimestamp))
			});
	}
			
			
//client.on("guildMemberAdd", (member) => {
 // console.log(`New User "${member.user.username}" has joined "${member.guild.name}"` );
 // member.guild.channels.get("welcome").send(`"${member.user.username}" has joined this server`);
//}
});
bot.login(process.env.BOT_TOKEN).catch(err=> console.log("Incorrect Token was provided"))
