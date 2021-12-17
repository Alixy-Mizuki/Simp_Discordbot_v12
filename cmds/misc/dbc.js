const { Command } = require('discord.js-commando');
const { MessageEmbed, MessageAttachment, Collection, Client, Util } = require("discord.js");
require('discord-reply'); // message.lineReply()
// const ms = require('parse-ms');
const delay = require('delay');
const { Database } = require("quick.replit");
const db = new Database(process.env.REPLIT_DB_URL);

const { cerror } = require("../../config.json")
const SE = require("../../error/send.js"); // SE(text, channel)

module.exports = class DBCCommand extends Command { //MeowCommand
	constructor(client) {
		super(client, {
			name: 'dbc',
			aliases: [], 
			group: 'misc',
			memberName: 'dbc', 
			description: 'database content', 
      guildOnly: true,
      hidden: true, // false
      ownerOnly: true,
      throttling: 
        {
        usages: 1,
        duration: 2,
        },
        args: 
        [{
          key: 'C', // Declaring the name of args for Run cmd
          prompt: 'What content you wanted to see?',
          type: 'string', // string, integer, user, member
//          default: 1
        }],
		});
	}

	async run(message, { C }) {
  let ERCH = this.client.channels.cache.get(`${cerror}`)
  try 
  {
    await db.get(C).then(X => 
    {
      message.lineReply(`content of ${C}:\n\`\`\`\n${X}\n\`\`\``)
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