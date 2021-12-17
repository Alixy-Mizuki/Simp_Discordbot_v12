const { Command } = require('discord.js-commando');
const { MessageEmbed, MessageAttachment, Collection, Client } = require("discord.js");
require('discord-reply'); // message.lineReply()
const delay = require('delay');
const Fetch = require("node-fetch");
// message.lineReply()
const CLOG = require('../functions/clog');

module.exports = class MIS_ScreenshotCommand extends Command { //MeowCommand
	constructor(client) {
		super(client, {
			name: 'screenshot', // meow
			aliases: ['ss'], // kitty-cat
			group: 'misc', // fun
			memberName: 'screenshot', // filename (meow)
			description: 'Screenshot a website', // desc /Replies with a meow, kitty cat.
      guildOnly: true,
      nsfw: true,
//      hidden: true, // false
//      ownerOnly: true,
//      clientPermissions: ['ADMINISTRATOR'],
//      userPermissions: ['MANAGE_MESSAGES'],
      throttling: 
        {
        usages: 1,
        duration: 8,
        },
//       args: 
//         [{
//           key: 'URL', // Declaring the name of args for Run cmd
//           prompt: 'Provide link for bot to screenshot',
//           type: 'string', // string, integer, user, member
// //          default: 1          
//         }],
		});
	}

//  async run
	//async run(message, { URL }) {
  async run(message, args) {    
//	run(message, { text }) {    //with args

		CLOG(message.author.tag, module)


    const user = message.author.tag
    const URLS = args;
    if (!URLS)   
    {
      const URLNOI = await message.lineReply("`Provide link for bot to screenshot`")
      await delay(5000)
      await URLNOI.delete()
    }    
    //console.log(args)
        
    else if (URLS.length < 8) 
    {
      const URLL5 = await message.lineReply("`Link Too Short, must More than 8 letter`")
      await delay(5000)
      await URLL5.delete()
    }
    
    else if (URLS)   
    {
      const SITE = /^(https?:\/\/)/i.test(URLS) ? URLS : `http://${URLS}`;
      try 
      {
        const { body } = await Fetch(`https://image.thum.io/get/width/1920/crop/720/noanimate/${SITE}`);
        //1920×1080 FHD

        const MSGE = await message.lineReply('Retrieving Image . . .')
        await delay(1500)
        await MSGE.delete()
        await message.lineReply(`Here is a screenshot from **${URLS}**`,
          {
            files: [{ attachment: body, name: "1.png" }]
          }
        );
      } catch (err) 
        {
        if (err.status === 404)
          return message.lineReply("Could not find any results. Invalid URL?").then(async msg => {
          await delay(1500)
          await msg.delete()
          .catch(e => {})
          });

        return message.lineReply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`)
          
        }
    }
//    
	}
};
