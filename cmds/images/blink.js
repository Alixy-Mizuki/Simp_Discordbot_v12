const { MessageEmbed, MessageAttachment, Collection, Client, Util } = require("discord.js");
const { Command } = require("discord.js-commando");
require('discord-reply'); // message.lineReply()
const Jimp = require("jimp");
const delay = require('delay');
const fs = require('fs-extra');
// 
const { cerror } = require("../../config.json")
const SE = require("../../error/send"); // SE(text, channel)
    
module.exports = class BlinkCommand extends Command { //MeowCommand
	constructor(client) {
		super(client, {
      name: "blink",
      aliases: [],
      group: "images",
      memberName: "blink",
      description: "This command uses your avatar or the avatar of the user you mentioned after the command.",
	
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

      Jimp.read('./cmds/assets/blink.jpg').then( async Blink => 
      {
        // console.log('adidas.png Presence')
        Jimp.read(URL).then( async Userimage => 
        {
          // console.log('User\'s PFP Presence')
          var BIP = Userimage.cover(250, 150)

          Blink.composite(BIP, 230, 1174)
          Blink.composite(BIP.blur(10), 230, 1012)
          
          

          const File = Blink.composite(BIP.blur(10).brightness(-0.5), 230, 858).write('./temp/blink.jpg')
          
          let FN = 'blink'
          let A = new MessageAttachment()
          .setFile(`./temp/${FN}.jpg`, `${FN}.jpg`)
      
          message.channel.stopTyping()
          await M.delete()
          
          await message.lineReply("**Blink**", A).then(() => fs.unlink(`./temp/${FN}.jpg`))//.then(() => console.log("Image has been sended and deleted from temp folder"))

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

