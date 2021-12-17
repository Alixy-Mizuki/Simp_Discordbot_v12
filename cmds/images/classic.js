const { MessageEmbed, MessageAttachment, Collection, Client, Util } = require("discord.js");
require('discord-reply'); // message.lineReply()
const { Command } = require("discord.js-commando");
const Jimp = require("jimp");
const delay = require('delay');
const fs = require('fs-extra');
// 
const { cerror } = require("../../config.json")
const SE = require("../../error/send"); // SE(text, channel)

module.exports = class ClassicCommand extends Command { //MeowCommand
	constructor(client) {
		super(client, {
      name: "classic",
      aliases: [],
      group: "images",
      memberName: "classic",
      description: "**Classic weeb shit.*** This command only has a text parameter.",
	
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
   

    let MS = message.content.split(" ").slice(1).join(' ')
    if(!MS.length) return message.lineReply("Uhhh Add Text please to be write on the picture")

    let M = await message.say("Generating Image...")
    message.channel.startTyping()
    
      Jimp.read('./cmds/assets/classic.jpg').then( async CSS => 
      {
        // console.log('Author\'s PFP Presence')
        Jimp.loadFont(Jimp.FONT_SANS_64_BLACK).then( async Font => 
        {
          // console.log('User\'s PFP Presence')

        var textWidth = 480;
        var textHeight = 425;
        var textRot = 2.5;
        var textX = 305;
        var textY = 625;

        var textImage = new Jimp(textWidth, textHeight);
        textImage.print(Font, 0, 0, MS.toString(), textWidth);
        textImage.rotate(textRot);

        const File = CSS.composite(textImage, textX, textY).write('./temp/classic.jpg')
      
        let FN = 'classic'
        let A = new MessageAttachment()
        .setFile(`./temp/${FN}.jpg`, `${FN}.jpg`)
    
        message.channel.stopTyping()
        await M.delete()
        
        await message.lineReply("**Classic**", A).then(() => fs.unlink(`./temp/${FN}.jpg`))//.then(() => console.log("Image has been sended and deleted from temp folder"))
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
