const { Command } = require('discord.js-commando');
const { MessageEmbed, MessageAttachment, Collection, Client, Util } = require("discord.js");
require('discord-reply'); // message.lineReply()
const delay = require('delay');
const search = require('youtube-search');
const opts = {
    maxResults: 1,
    key: process.env.YTAPI,
    type: 'video'
};

const { cerror } = require("../../config.json")
const SE = require("../../error/send.js"); // SE(text, channel)

module.exports = class S_ytbCommand extends Command { //MeowCommand
	constructor(client) {
		super(client, {
			name: 'ytb',
			aliases: ['yts','youtube'], 
			group: 'search',
			memberName: 'ytb', 
			description: 'Search Youtube Video', 
      examples: [`${client.commandPrefix}ytb <query>`],
      guildOnly: true,
      // hidden: true, // false
      // ownerOnly: true,
      // clientPermissions: ['ADMINISTRATOR'],
      // userPermissions: ['MANAGE_MESSAGES'],
      throttling: 
        {
        usages: 1,
        duration: 2,
        },
      args: 
        [{
          key: 'Query', // Declaring the name of args for Run cmd
          prompt: 'What video do you want to search?',
          type: 'string', // string, integer, user, member
//          default: 1
        }],
		});
	}

//  async run
	async run(message, { Query }) {   

    let ERCH = this.client.channels.cache.get(`${cerror}`)
    
		const CLOG = require('../functions/clog');		
		CLOG(message.author.tag, module)
   
    
    
    let results = await search(Query, opts).catch(e =>
    {
      console.log(e)
      SE(`\`\`\`fix\n${e.message}\n\`\`\`\n\n\`\`\`yaml\n${module.filename}\n\`\`\``, ERCH)
      message.lineReply("Error Detected, Please Don't use this Command for Now").then(X => X.delete({ timeout:4000 }))
    })
    if(results) 
    {
        let YTRES = results.results;
        // console.log(YTRES)
        message.lineReply(YTRES[0].link)
    }

	}
};



/*
.catch(e =>
{
  console.log(e)
  SE(`\`\`\`fix\n${e.message}\n\`\`\`\n\n\`\`\`yaml\n${module.filename}\n\`\`\``, ERCH)
  message.channel.stopTyping()
  message.lineReply("Error Detected, Please Don't use this Command for Now").then(X => X.delete({ timeout:4000 }))
})

*/