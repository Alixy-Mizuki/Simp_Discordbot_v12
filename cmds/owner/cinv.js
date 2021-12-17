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


module.exports = class OWN_cinvCommand extends Command { //MeowCommand
	constructor(client) {
		super(client, {
			name: 'cinv',
			aliases: [], 
			group: 'owner',
			memberName: 'cinv', 
			description: 'cinv', 
      // examples: [`${client.commandPrefix}`],
      guildOnly: true,
      hidden: true, // false
      ownerOnly: true,
      // clientPermissions: ['ADMINISTRATOR'],
      // userPermissions: ['MANAGE_MESSAGES'],
      throttling: 
        {
        usages: 1,
        duration: 5,
        },
      args: 
        [{
          key: 'text', // Declaring the name of args for Run cmd
          prompt: 'Guild ID?',
          type: 'string', // string, integer, user, member
//          default: 1
        }],
		});
	}

	// async run(message) {
	async run(message, { text }) {
    //////
		let ERCH = this.client.channels.cache.get(`${cerror}`)
		CLOG(message.author.tag, module)
		let pr = this.client.commandPrefix
		//////
		
		let guild = this.client.guilds.cache.get(text)
		var FFF = []
		let a = guild.channels.cache.filter(x => x.permissionsFor(guild.me).has('CREATE_INSTANT_INVITE') && x.type === 'text')
		a.forEach(x => FFF.push(x))

		// console.log(FFF[0])
		FFF[0].createInvite({ maxAge:0 , unique: true, reason: "Auto-Generated By Me"})
			.then(invite => message.say(`discord.gg/${invite.code}`))


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
