const { Command } = require('discord.js-commando');
const { MessageEmbed, MessageAttachment, Collection, Client, Util } = require("discord.js");
require('discord-reply'); // message.lineReply()
const delay = require('delay');
const AKN = require('akaneko');
const { stripIndents } = require('common-tags')
let interval = 1000; //  = 3s
let increment = 1;

const { cerror } = require("../../config.json")
const SE = require("../../error/send.js"); // SE(text, channel)

module.exports = class NS_CumCommand extends Command { //MeowCommand
	constructor(client) {
		super(client, {
			name: 'cum',
			aliases: [], 
			group: 'nsfw',
			memberName: 'cum', 
			description: 'Basically sticky white stuff that is usually milked from sharpies.', 
      examples: ['cum <count | default: 1>'],
      guildOnly: true,
      hidden: true,
      nsfw: true,
      throttling: 
        {
        usages: 1,
        duration: 5,
        },
        args: 
        [{
          key: 'Count', // Declaring the name of args for Run cmd
          prompt: 'MAX 10',
          type: 'integer', // string, integer, user, member
          default: 1
        }],
//
		});
	}

	async run(message, { Count }) 
  {    
    let ERCH = this.client.channels.cache.get(`${cerror}`)
    
		const CLOG = require('../functions/clog');		
		CLOG(message.author.tag, module)
   
    
    function loop(image) 
    {
      var run = setTimeout(function() 
      {

        message.channel.send(image).catch(e => message.say(e.message))

        clearTimeout(run);
      }, interval * increment);

      increment++;
    }

  try
  {
    if(Count > 20) 
    {
      return message.lineReply('Non-Premium Guild Only Can Request Up to 20', { code: 'yaml'})
    }
    else if(Count == 1) 
    {
      return message.channel.send(new MessageAttachment(await AKN.nsfw.cum(), "cum.jpg"))
    }
    if(Count > 1) 
    {
      let userMSG = message;
      await userMSG.react('844234303571099748')
      let Images = []
      
      for(let i = 0; i < Count; i++)
      {
        let IMG = new MessageAttachment()
        .setFile(await AKN.nsfw.cum(), `cum-${i}.jpg`)
        Images.push(IMG)
      }

      userMSG.reactions.cache.get('844234303571099748').remove()
      message.say(stripIndents`\`\`\`yaml
      Query   : Nsfw Cum
      Amount  : ${Count}
      \`\`\``)
      Images.forEach(img => loop(img))
      return;
    }
  }
  catch(e)
  {
    console.log(e)
    SE(`\`\`\`fix\n${e.message}\n\`\`\`\n\n\`\`\`yaml\n${module.filename}\n\`\`\``, ERCH)
    message.channel.stopTyping()
    message.lineReply("Error Detected, Please Don't use the Command for Now").then(X => X.delete({ timeout:4000 }))
  }





	}
};



/*
.catch(e =>
{
  console.log(e)
  SE(`\`\`\`fix\n${e.message}\n\`\`\`\n\n\`\`\`yaml\n${module.filename}\n\`\`\``, ERCH)
  message.channel.stopTyping()
  message.lineReply("Error Detected, Please Don't use the Command for Now").then(X => X.delete({ timeout:4000 }))
})

*/