const { MessageEmbed, MessageAttachment, Collection, Client, Util } = require("discord.js");
const { Command } = require("discord.js-commando");
require('discord-reply'); // message.lineReply()
const Jimp = require("jimp");
const delay = require('delay');
const fs = require('fs-extra');
// 
// var CommandCounter = require("../../index.js")
module.exports = class AvatarCommand extends Command { //MeowCommand
	constructor(client) {
		super(client, {
      name: "avatar",
      aliases: [],
      group: "images",
      memberName: "avatar",
      description: "Gives the avatar of the tagged user or your avatar.",
      
	
      guildOnly: true,
      throttling: 
        {
        usages: 1,
        duration: 5,
        },
    })
  }

    async run(message, args)
    {
    
		const CLOG = require('../functions/clog');		
		CLOG(message.author.tag, module)
   
      let Mem = message.mentions.members.first() || message.member
      let URL = Mem.user.displayAvatarURL({ dynamic:true, size: 1024})


      let M = await message.say("Generating Image...")

      let A = new MessageAttachment()
      .setFile(URL)

      await delay(500)
      await M.delete().then(() => message.lineReply("Avatar of `" + Mem.user.username + "`", A))

//
    }
}

