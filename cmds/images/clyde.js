const { Command } = require('discord.js-commando');
const { MessageEmbed, MessageAttachment, Collection, Client } = require("discord.js");
require('discord-reply'); // message.lineReply()
const delay = require('delay');
const canvacord = require("canvacord")

// message.lineReply()

module.exports = class IMG_clydeCommand extends Command { //MeowCommand
	constructor(client) {
		super(client, {
			name: 'clyde', // meow
			aliases: [], // kitty-cat
			group: 'images', // fun
			memberName: 'clyde', // filename (meow)
			description: 'Clyde Image', // desc /Replies with a meow, kitty cat.
      guildOnly: true,
//      hidden: true, // false
//      ownerOnly: true,
//      clientPermissions: ['ADMINISTRATOR'],
//      userPermissions: ['MANAGE_MESSAGES'],
      throttling: 
        {
        usages: 1,
        duration: 2,
        },
      args: 
        [{
          key: 'Text', // Declaring the name of args for Run cmd
          prompt: 'Please provide the text for the image!',
          type: 'string', // string, integer, user, member
//          default: 1          
        }],
		});
	}

//  async run
	async run(message, { Text }) {
//	run(message, { text }) {    //with args
    
		const CLOG = require('../functions/clog');		
		CLOG(message.author.tag, module)
   

    const M = await message.channel.send("Generating Image...")

    let IMG = await canvacord.Canvas.clyde(Text)

    let ATTCH = new MessageAttachment()
    .setFile(IMG, `clyde.png`)

    await delay(600)
    await M.delete()
    await message.lineReply("**Image Generated**", ATTCH)

	}
};