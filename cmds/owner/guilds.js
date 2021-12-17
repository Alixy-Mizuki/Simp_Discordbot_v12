const { Command } = require('discord.js-commando');
const { MessageEmbed, MessageAttachment, Collection, Client, Util } = require("discord.js");
require('discord-reply'); // message.lineReply()
const COLOR = process.env.COLOR
const delay = require('delay');
// const ms = require('parse-ms');
const Jimp = require("jimp");
const fs = require('fs-extra');

const { cerror } = require("../../config.json")
const SE = require("../../error/send.js"); // SE(text, channel)
const CLOG = require('../functions/clog');


module.exports = class O_guildCommand extends Command { //MeowCommand
	constructor(client) {
		super(client, {
			name: 'guilds',
			aliases: [], 
			group: 'owner',
			memberName: 'guilds', 
			description: 'Guilds', 
      // examples: [`${client.commandPrefix}`],
      guildOnly: true,
      // hidden: true, // false
      ownerOnly: true,
      // clientPermissions: ['ADMINISTRATOR'],
      // userPermissions: ['MANAGE_MESSAGES'],
      throttling: 
        {
        usages: 1,
        duration: 5,
        },
		});
	}

	async run(message) {
//	async run(message, { text }) {
    //////
		let ERCH = this.client.channels.cache.get(`${cerror}`)
		CLOG(message.author.tag, module)
		let pr = this.client.commandPrefix
		//////
		

      const guilds = this.client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount).first(50);

      const description = guilds.map((guild, index) => {
        return `${index + 1}) ${guild.name} \`${guild.id}\` -> ${guild.memberCount} members`
      }).join('\n')

      let GG = new MessageEmbed()
        .setTitle('Top Guilds')
        .setDescription(description)
        .setColor("RANDOM")


      message.channel.send(GG)


//
	}
};



/*

.catch(e =>
  {
    console.log(e)
    SE(`\`\`\`fix\n${e.message}\n\`\`\`\n\n\`\`\`yaml\n${module.filename}\n\`\`\``, ERCH)
    message.channel.stopTyping()
    message.lineReply("Error Detected, Please Don't use this Command for Now").then(X => X.delete({   timeout:4000 }))
  })

*/
