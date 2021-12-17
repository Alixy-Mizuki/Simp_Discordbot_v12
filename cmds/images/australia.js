const { MessageEmbed, MessageAttachment, Collection, Client, Util } = require("discord.js");
const { Command } = require("discord.js-commando");
require('discord-reply'); // message.lineReply()
const Jimp = require("jimp");
const delay = require('delay');
const fs = require('fs-extra');
// 
const { cerror } = require("../../config.json")
const SE = require("../../error/send"); // SE(text, channel)
    
module.exports = class AustraliaCommand extends Command { //MeowCommand
	constructor(client) {
		super(client, {
      name: "australia",
      aliases: [],
      group: "images",
      memberName: "australia",
      description: "For easy translation of images sent by - and being sent to - Upside Down people.",
	
      guildOnly: true,
      throttling: 
        {
        usages: 1,
        duration: 20,
        },
    })
  }

    async run(message, args)
    {
      let ERCH = this.client.channels.cache.get(`${cerror}`)
    
		const CLOG = require('../functions/clog');		
		CLOG(message.author.tag, module)
   
			let Lin = message.content.split(' ').slice(1)
			let Link = ''
			if( Lin[0] !== undefined && Lin[0].startsWith('http') && ( Lin[0].includes('.png') || Lin[0].includes('.jpg') ) )
			{
				Link += Lin[0]
			}

      let Mem = message.mentions.members.first() || message.member
      let URL = Link || Mem.user.displayAvatarURL({format: 'png', size: 1024})


      let M = await message.say("Generating Image...")
      message.channel.startTyping()
      
      Jimp.read('./cmds/assets/australia.png').then( async Australia => 
      {
        // console.log('adidas.png Presence')
        Jimp.read(URL).then( async Userimage => 
        {
          // console.log('User\'s PFP Presence')
          Australia.cover(Userimage.bitmap.width, Userimage.bitmap.height).opacity(0.25);
          Userimage.composite(Australia, 0, 0)

          Userimage.rotate(180)
          
          const File = Userimage.write('./temp/australia.jpg')
            
          let FN = 'australia.jpg'
          let A = new MessageAttachment()
          .setFile(`./temp/${FN}`, `${FN}`)
      
          message.channel.stopTyping()
          await M.delete()
          
          await message.lineReply("**Translated For The Emu War**", A).then(() => fs.unlink(`./temp/${FN}`))//.then(() => console.log("Image has been sended and deleted from temp folder"))
          //
        })
        .catch(e =>
        {
        SE(`\`\`\`fix\n${e.message}\n\`\`\`\n\n\`\`\`yaml\n${module.filename}\n\`\`\``, ERCH)
        message.channel.stopTyping()
        message.lineReply("Error Detected, Please Don't use the Command for Now").then(X => X.delete({ timeout:4000 }))
        })
      })
      .catch(e =>
      {
      SE(`\`\`\`fix\n${e.message}\n\`\`\`\n\n\`\`\`yaml\n${module.filename}\n\`\`\``, ERCH)
      message.channel.stopTyping()
      message.lineReply("Error Detected, Please Don't use the Command for Now").then(X => X.delete({ timeout:4000 }))
      })
//
    }
}

