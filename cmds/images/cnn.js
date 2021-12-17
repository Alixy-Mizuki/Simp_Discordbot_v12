const { MessageEmbed, MessageAttachment, Collection, Client, Util } = require("discord.js");
require('discord-reply'); // message.lineReply()
const { Command } = require("discord.js-commando");
const Jimp = require("jimp");
const delay = require('delay');
const fs = require('fs-extra');
// 
const { cerror } = require("../../config.json")
const SE = require("../../error/send"); // SE(text, channel)
    
module.exports = class CNNCommand extends Command { //MeowCommand
	constructor(client) {
		super(client, {
      name: "cnn",
      aliases: [],
      group: "images",
      memberName: "cnn",
      description: "**Breaking News!** Merges the cnn breaking news template to the last image uploaded.",
      examples: [`${client.commandPrefix}cnn [mentions/link] text 1|text 2`],
      guildOnly: true,
      throttling: 
        {
        usages: 1,
        duration: 20,
        },
    })
  }


  async run(message)
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


    let Mem = await message.mentions.members.first()
    if(!Mem && !Link.length) return message.lineReply("mention a users or gives link")
    let URL = Link || Mem.user.displayAvatarURL({format: 'png', size: 1024})

    let MS = await message.content.split(" ").slice(2).join(' ')
    let MSG = MS.split('|')
    if(!MSG.length) return message.lineReply(`${this.client.commandPrefix}cnn <mentions> text 1|text 2`)
    if(!MSG[0].length) return message.lineReply(`${this.client.commandPrefix}cnn <mentions or link> text 1|text 2`)
    // if(!MSG[1].length) return message.lineReply("Text 2, Must not empty")

  if(URL && MSG[0] && MSG[1])
  {
    let M = await message.say("Generating Image...")
    message.channel.startTyping()    

    Jimp.read('./cmds/assets/cnn.png').then( async cnnImage => 
    {
      Jimp.read(URL).then( async userImage => 
      {
        Jimp.loadFont('./cmds/fonts/mentone_72.fnt').then( async headlineFont => 
        {
          Jimp.loadFont('./cmds/fonts/mentone_32_black.fnt').then( async tickerFont => 
          {    
            Jimp.loadFont('./cmds/fonts/mentone_32_white.fnt').then( async timeFont => 
            {

              cnnImage.print(headlineFont, 100, 525, MSG[0].toUpperCase());
              cnnImage.print(tickerFont, 200, 632, MSG[1].toUpperCase());

              var hours = Math.floor(Math.random() * 24);
              var mins = Math.floor(Math.random() * 60);

              if(hours < 10)
              {
                  hours = "0" + hours.toString();
              }

              if(mins < 10)
              {
                  mins = "0" + mins.toString();
              }

              cnnImage.print(timeFont, 90, 632, hours.toString() + ":" + mins.toString());

              userImage.cover(1280, 720);
                                  
              const File = userImage.composite(cnnImage, 0, 0 ).write('./temp/cnnImage.jpg')
              
              let A = new MessageAttachment()
              .setFile("./temp/cnnImage.jpg", "cnnImage.jpg")
          
              message.channel.stopTyping()
              await M.delete()
              
              await message.lineReply("**Breaking News**", A).then(() => fs.unlink("./temp/cnnImage.jpg"))//.then(() => console.log("Image has been sended and deleted from temp folder"))

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
  }
  else
  {
    return message.lineReply(`${this.client.commandPrefix}cnn <mentions> text 1|text 2`)
  }
//
  }
}

