const { MessageEmbed, MessageAttachment, Collection, Client, Util } = require("discord.js");
require('discord-reply'); // message.lineReply()
const { Command } = require("discord.js-commando");
const Jimp = require("jimp");
const delay = require('delay');
const fs = require('fs-extra');
// 
const { cerror } = require("../../config.json")
const SE = require("../../error/send"); // SE(text, channel)

module.exports = class CaptionCommand extends Command { //MeowCommand
	constructor(client) {
		super(client, {
      name: "caption",
      aliases: [],
      group: "images",
      memberName: "caption",
      description: "Caption an image. This command requires the text parameter to be filled.",
	
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


    let Mem = message.mentions.members.first()
    if(!Mem && !Link.length) return message.lineReply("mention Someone to be Caption or gives link")
    let URL2 = Link || Mem.user.displayAvatarURL({format: 'png', size: 1024})
    let MS = message.content.split(" ").slice(2).join(' ')
    if(!MS.length) return message.lineReply("Uhhh Add Text please to be write on the picture")

    let M = await message.say("Generating Image...")
    message.channel.startTyping()
    
    Jimp.read(URL2).then( async User => 
    {
      // console.log('adidas.png Presence')
      Jimp.read('./cmds/assets/blank.png').then( async Blank => 
      {
        // console.log('Author\'s PFP Presence')
        Jimp.loadFont(Jimp.FONT_SANS_64_BLACK).then( async Font => 
        {
          // console.log('User\'s PFP Presence')
        var Height = (Math.floor(args.length/40)+1)*75

  
        var TI = Blank.resize(1500, Height)
        TI.print(Font, 25, 0, MS.toString(), 1500);
        
        TI.resize(User.bitmap.width, Jimp.AUTO)
        var FI = new Jimp(User.bitmap.width, User.bitmap.height + TI.bitmap.height)
        .composite(TI, 0, 0).composite(User, 0, TI.bitmap.height)

        const File = FI.composite(User, 0, TI.bitmap.height).write('./temp/caption.jpg')
      
        let FN = 'caption'
        let A = new MessageAttachment()
        .setFile(`./temp/${FN}.jpg`, `${FN}.jpg`)
    
        message.channel.stopTyping()
        await M.delete()
        
        await message.lineReply("**Captioned**", A).then(() => fs.unlink(`./temp/${FN}.jpg`))//.then(() => console.log("Image has been sended and deleted from temp folder"))
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

