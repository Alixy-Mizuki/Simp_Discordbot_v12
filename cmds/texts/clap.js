const { Command } = require('discord.js-commando');
const { MessageEmbed, MessageAttachment, Collection, Client, Util } = require("discord.js");
require('discord-reply'); // message.lineReply()
const COLOR = process.env.COLOR
const delay = require('delay');

const { cerror } = require("../../config.json")
const SE = require("../../error/send.js"); // SE(text, channel)

module.exports = class T_clapCommand extends Command { //MeowCommand
	constructor(client) {
		super(client, {
			name: 'clap',
			aliases: [], 
			group: 'texts',
			memberName: 'clap', 
			description: 'Replaces spaces with clap emojis.', 
      // examples: [`${client.commandPrefix}`],
      guildOnly: true,
      // hidden: true, // false
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
    let ERCH = this.client.channels.cache.get(`${cerror}`)
    
		const CLOG = require('../functions/clog');		
		CLOG(message.author.tag, module)
   
    
  let M = message.content.split(" ").slice(1).join(" ")
	if(!M.length) return message.lineReply('Give me some word to work with...')

  var stringToSend = M.toString().replace(/ /g, "👏")

  message.lineReply(stringToSend).catch(e =>
  {
    console.log(e)
    SE(`\`\`\`fix\n${e.message}\n\`\`\`\n\n\`\`\`yaml\n${module.filename}\n\`\`\``, ERCH)
    message.channel.stopTyping()
    message.lineReply("Error Detected, Please Don't use this Command for Now").then(X => X.delete({ timeout:4000 }))
  })

//
	}
};



/*


*/