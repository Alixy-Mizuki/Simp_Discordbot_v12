const { Command } = require('discord.js-commando');
const { MessageEmbed, MessageAttachment, Collection, Client, Util } = require("discord.js");
require('discord-reply'); // message.lineReply()
const delay = require('delay');
const AKN = require('akaneko');
const { stripIndents } = require('common-tags')

const { cerror } = require("../../config.json")
const SE = require("../../error/send.js"); // SE(text, channel)

module.exports = class NS_NEKOCommand extends Command { //MeowCommand
	constructor(client) {
		super(client, {
			name: 'neko',
			aliases: [], 
			group: 'nsfw',
			memberName: 'neko', 
			description: 'Nekos OwO', 
      examples: ['neko normal', 'neko lewd'],
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
          key: 'Option', // Declaring the name of args for Run cmd
          prompt: '`Normal | Lewd`',
          type: 'string', // string, integer, user, member
          default: 'normal'
        },
        {
          key: 'Amount',
          prompt: 'amount?',
          type: 'integer',//string',
          default: 1
        }],
//
		});
	}

	async run(message, { Option, Amount }) 
  {    
    let ERCH = this.client.channels.cache.get(`${cerror}`)
    
		const CLOG = require('../functions/clog');		
		CLOG(message.author.tag, module)
   
    
    let OPT = Option.toLowerCase()

    let EMB = new MessageEmbed()
    .setFooter("OvO")
    .setColor("RANDOM")

    let interval = 1000; //  = 3s
    let increment = 1;

    function loop(image) 
    {
      var run = setTimeout(function() 
      {

        message.channel.send(image)

        clearTimeout(run);
      }, interval * increment);

      increment++;
    }

    let SI = stripIndents;


  try
  {
    if(OPT === 'normal')
    {
      if(Amount > 20) 
      {
        return message.lineReply('Non-Premium Guild Only Can Request Up to 20', { code: 'yaml'})
      }
      else if(Amount == 1) 
      {
        return message.channel.send(await AKN.neko())
      }
      if(Amount > 1) 
      {
        let userMSG = message;
        await userMSG.react('844234303571099748')
        let Images = []
        
        for(let i = 0; i < Amount; i++)
        {
          let IMG = await AKN.neko()
          Images.push(IMG)
        }

        userMSG.reactions.cache.get('844234303571099748').remove()
        message.say(SI`\`\`\`yaml
        Query   : Normal
        Amount  : ${Amount}
        \`\`\``)
        Images.forEach(img => loop(img))
        return;
      }
    }
    else if(OPT === 'lewd')
    {
      if(Amount > 20) 
      {
        return message.lineReply('Non-Premium Guild Only Can Request Up to 20', { code: 'yaml'})
      }
      else if(Amount == 1) 
      {
        return message.channel.send(await AKN.lewdNeko())
      }
      if(Amount > 1) 
      {
        let userMSG = message;
        await userMSG.react('844234303571099748')
        let Images = []
        
        for(let i = 0; i < Amount; i++)
        {
          let IMG = await AKN.lewdNeko()
          Images.push(IMG)
        }

        userMSG.reactions.cache.get('844234303571099748').remove()
        message.say(SI`\`\`\`yaml
        Query   : Lewd Nekos
        Amount  : ${Amount}
        \`\`\``)
        Images.forEach(img => loop(img))
        return;
      }
    }
    else
    {
      message.lineReply(`${this.client.commandPrefix}neko \`[ normal | lewd ]\` \`[ amount ]\``)
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