const { Command } = require('discord.js-commando');
const { MessageEmbed, MessageAttachment, Collection, Client, Util } = require("discord.js");
require('discord-reply'); // message.lineReply()
// const ms = require('parse-ms');
const delay = require('delay');
const { Database } = require("quick.replit");
const db = new Database(process.env.REPLIT_DB_URL);

const { cerror } = require("../../config.json")
const SE = require("../../error/send.js"); // SE(text, channel)
const CLOG = require('../functions/clog');		

module.exports = class BCLCommand extends Command { //MeowCommand
	constructor(client) {
		super(client, {
			name: 'changelog',
			aliases: [], 
			group: 'misc',
			memberName: 'changelog', 
			description: 'Bot Changelogs', 
      guildOnly: true,
      ownerOnly: true,
      throttling: 
        {
        usages: 1,
        duration: 20,
        },

		});
	}

	async run(message) {
	CLOG(message.author.tag, module)

  let ERCH = this.client.channels.cache.get(`${cerror}`)
  try 
  {
    await db.get('changelogs').then(X => 
    {
      let EM = new MessageEmbed()
      .setTitle("Change - logs")
      .setDescription('Bot Commands Update')
      .addField("New Commands", "```yaml\n"+X+"\n```")
      .setColor("GREEN")
      
      message.lineReply(EM)
    })
    .catch(e =>
    {
      console.log(e)
      SE(`\`\`\`fix\n${e.message}\n\`\`\`\n\`\`\`yaml\n${module.filename}\n\`\`\``, ERCH)
      message.lineReply("Error Detected, Please Don't use the Command for Now").then(X => X.delete({ timeout:4000 }))
    })
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
