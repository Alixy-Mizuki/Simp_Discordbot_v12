const { Command } = require('discord.js-commando');
const { MessageEmbed, MessageAttachment, Collection, Client, Util } = require("discord.js");
require('discord-reply'); // message.lineReply()
const delay = require('delay');
const Fetch = require('node-fetch');
const QS = require('querystring')

const { cerror } = require("../../config.json")
const SE = require("../../error/send.js"); // SE(text, channel)

module.exports = class S_urbanCommand extends Command { //MeowCommand
	constructor(client) {
		super(client, {
			name: 'urban',
			aliases: [], 
			group: 'search',
			memberName: 'urban', 
			description: 'Search Definition of word on Urban Dictionary', 
      examples: [`${client.commandPrefix}urban <Query>`],
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
          prompt: 'What text would you like search definition of?',
          type: 'string', // string, integer, user, member
//          default: 1
        }],
		});
	}

    async run(message, { Query }) {   
    let ERCH = this.client.channels.cache.get(`${cerror}`)
    
		const CLOG = require('../functions/clog');		
		CLOG(message.author.tag, module)
   
    

    const SS = QS.stringify({ term: Query})
    //console.log(args)

    if(!Query.length) return message.lineReply(new MessageEmbed()
    .setDescription("Search a Word")
    .setColor("RED")
    )

    const AS = await Fetch(`https://api.urbandictionary.com/v0/define?${SS}`).then(response => response.json())
    // console.log(AS)
    // console.log(AS.list[0])
    // console.log(SS)
    try 
    {
      // const Trim = (string, max) => ((string.length > max) ? `${string.slice(0, max - 3)}...` : str )

      const EMB = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Definition of " + AS.list[0].word)
      .setURL(AS.list[0].permalink)
      .setDescription(AS.list[0].definition.slice(0, 2048 - 0) + '\n\n')
      .addField('Example' , AS.list[0].example)
      .addField(':thumbsup:', AS.list[0].thumbs_up, true)
      .addField('👎', AS.list[0].thumbs_down, true)
      .setFooter(`Sent By ${AS.list[0].author}`)
      message.lineReply(EMB)
    }
    catch (err)
    {
      console.log(err)
      // SE(`\`\`\`fix\n${err.message}\n\`\`\`\n\n\`\`\`yaml\n${module.filename}\n\`\`\``, ERCH)
      return message.lineReply(new MessageEmbed()
        .setDescription(`No Results were found for **${Query}**`)
        .setColor("RED")
    )
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