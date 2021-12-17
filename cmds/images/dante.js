const { MessageEmbed, MessageAttachment, Collection, Client, Util } = require("discord.js");
const { Command } = require("discord.js-commando");
require('discord-reply'); // message.lineReply()
const Jimp = require("jimp");
const delay = require('delay');
const fs = require('fs-extra');
// 
const { cerror } = require("../../config.json")
const SE = require("../../error/send"); // SE(text, channel)
    
module.exports = class DanteCommand extends Command { //MeowCommand
	constructor(client) {
		super(client, {
      name: "dante",
      aliases: [],
      group: "images",
      memberName: "dante",
      description: "**Featuring Dante from the Devil May Cry™ Series.** This command takes the last image uploaded.",
      examples: [
        `${client.commandPrefix}dante <mentions/link default: author> [position: 1,2,3,4] `,
      ],
      
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

      Jimp.read('./cmds/assets/dante.png').then( async danteImage => 
      {
        // console.log('adidas.png Presence')
        Jimp.read(URL).then( async Userimage => 
        {
          let B = message.content.split(' ').slice(1).join(' ')
          let MESTYPE = B.startsWith('<@') || B.startsWith('https:')

          let pos = MESTYPE ? message.content.split(' ').slice(2) : message.content.split(' ').slice(1)
          // console.log(pos)


          if(Userimage.bitmap.height > Userimage.bitmap.width) {
            danteImage.resize(Jimp.AUTO, Userimage.bitmap.height * 0.5);
          }
          else {
            danteImage.resize(Userimage.bitmap.height * 0.5, Jimp.AUTO);
          }

          let position = parseInt(pos)
          var x = 0;
          var y = 0;
          
          if(position == 1)
          {
              x = 0;
              y = 0;
          }
          else if(position == 2)
          {
              x = Userimage.bitmap.width - danteImage.bitmap.width;
              y = 0;
          }
          else if(position == 3)
          {
              x = 0;
              y = Userimage.bitmap.height - danteImage.bitmap.height;
          }
          else if(position == 4)
          {
              x = Userimage.bitmap.width - danteImage.bitmap.width;
              y = Userimage.bitmap.height - danteImage.bitmap.height;
          }

          const File = Userimage.composite(danteImage, x, y ).write('./temp/dante.jpg')
          
          let FN = 'dante'
          let A = new MessageAttachment()
          .setFile(`./temp/${FN}.jpg`, `${FN}.jpg`)
      
          message.channel.stopTyping()
          await M.delete()
          
          await message.lineReply("**Featuring Dante from the Devil May Cry™ Series**", A).then(() => fs.unlink("./temp/dante.jpg"))//.then(() => console.log("Image has been sended and deleted from temp folder"))

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

