const { MessageEmbed, MessageAttachment, Collection, Client, Util } = require("discord.js");
const { Command } = require("discord.js-commando");
require('discord-reply'); // message.lineReply()
const Jimp = require("jimp");
const delay = require('delay');
const fs = require('fs-extra');
// 
const { cerror } = require("../../config.json")
const SE = require("../../error/send"); // SE(text, channel)
    
module.exports = class BatmanCommand extends Command { //MeowCommand
	constructor(client) {
		super(client, {
      name: "batman",
      aliases: [],
      group: "images",
      memberName: "batman",
      description: "Have Batman hold an image. This command takes your avatar or the avatar of the user you have mentioned after the command.",
	
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

      Jimp.read('./cmds/assets/bateman.png').then( async Batman => 
      {
        // console.log('adidas.png Presence')
        Jimp.read(URL).then( async Userimage => 
        {
          Jimp.read("./cmds/assets/batemanhand.png").then(async BATHAND =>
          {

          // console.log('User\'s PFP Presence')
          Userimage.rotate(90)

          var x = 505
          var y = 250

          Userimage.resize(Jimp.AUTO, 300) 
          Userimage.rotate(20);
          
          let BAT = Batman.composite(Userimage, x, y )

          const File = BAT.composite(BATHAND, 0, 0).write('./temp/bateman.jpg')
          
          let FN = 'bateman'
          let A = new MessageAttachment()
          .setFile(`./temp/${FN}.jpg`, `${FN}.jpg`)
      
          message.channel.stopTyping()
          await M.delete()
          
          await message.lineReply("**Impressive, very nice**", A).then(() => fs.unlink(`./temp/${FN}.jpg`))//.then(() => console.log("Image has been sended and deleted from temp folder"))
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

