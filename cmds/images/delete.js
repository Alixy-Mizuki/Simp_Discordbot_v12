const { Command } = require('discord.js-commando');
const { MessageEmbed, MessageAttachment, Collection, Client } = require("discord.js");
require('discord-reply'); // message.lineReply()
const delay = require('delay');
const canvacord = require("canvacord")

// message.lineReply()

module.exports = class IMG_deleteCommand extends Command { //MeowCommand
	constructor(client) {
		super(client, {
			name: 'delete', // meow
			aliases: [], // kitty-cat
			group: 'images', // fun
			memberName: 'delete', // filename (meow)
			description: 'Delete Image Manipulation', // desc /Replies with a meow, kitty cat.
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

		});
	}

//  async run
	async run(message, { Text }) {
//	run(message, { text }) {    //with args
    
		const CLOG = require('../functions/clog');		
		CLOG(message.author.tag, module)
   

    let V = message.mentions.users.first() || message.author
    let AV = V.displayAvatarURL({dynamic: false, format: "png"})

    let IMG = await canvacord.Canvas.delete(AV, true)
    let ATTCH = new MessageAttachment(IMG, `delete.png`)
    const AW = await message.channel.send("Generating Image...")
    await delay(600)
    await AW.edit("Image Generated")
    await message.channel.send(ATTCH)

	}
};