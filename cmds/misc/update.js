const { Command } = require('discord.js-commando');
const { MessageEmbed, MessageAttachment, Collection, Client, Util } = require("discord.js");
require('discord-reply'); // message.lineReply()
// const ms = require('parse-ms');
const delay = require('delay');
const { Database } = require("quick.replit");
const db = new Database(process.env.REPLIT_DB_URL);

const { cerror } = require("../../config.json")
const SE = require("../../error/send.js"); // SE(text, channel)

module.exports = class UpdateCommand extends Command { //MeowCommand
	constructor(client) {
		super(client, {
			name: 'update',
			aliases: [], 
			group: 'misc',
			memberName: 'update', 
			description: 'Update log', 
      guildOnly: true,
      hidden: true, // false
      examples: [`${client.commandPrefix}update text 1///text 2///...`],
      ownerOnly: true,
      throttling: 
        {
        usages: 1,
        duration: 2,
        },
		});
	}

	async run(message) {
  let ERCH = this.client.channels.cache.get(`${cerror}`)
  let MS = message.content.split(' ').slice(1).join(' ')
  if(!MS.length) return message.lineReply(`${this.client.commandPrefix}update text 1///text 2///...`)
  let MSG = MS.split('///')
  try 
  {
    await db.set(`changelogs`, MSG.join('\n'))
    message.lineReply(`Changelog set\nMessage: \`${MSG.join('\n')}\``)
  }
  catch(e)
  {
    console.log(e)
    SE(`\`\`\`fix\n${e.message}\n\`\`\`\n\`\`\`yaml\n${module.filename}\n\`\`\``, ERCH)
    message.lineReply("Error Detected, Please Don't use the Command for Now").then(X => X.delete({ timeout:4000 }))
  }



//
	}
};



/*


*/