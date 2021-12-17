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


module.exports = class M_prefixCommand extends Command { //MeowCommand
	constructor(client) {
		super(client, {
			name: 'prefix',
			aliases: [], 
			group: 'misc',
			memberName: 'prefix', 
			description: 'Show current Prefix', 
      // examples: [`${client.commandPrefix}`],
      guildOnly: true,
      hidden: true, // false
      // ownerOnly: true,
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
		
		let EM = new MessageEmbed()
		.setDescription(`My Prefix is \`${pr}\`\nGetting Started with \`${pr}help\` for Documentations\n\`${pr}commands\` to shows all commands`)
		.setColor('RANDOM')
		message.say(EM)

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