const { MessageEmbed, MessageAttachment, Collection, Client, Util } = require("discord.js");
require('discord-reply'); // message.lineReply()
const { Command } = require("discord.js-commando");
const Jimp = require("jimp");
const delay = require('delay');
const fs = require('fs-extra');
// 
const { cerror } = require("../../config.json")
const SE = require("../../error/send"); // SE(text, channel)
    
module.exports = class AllyCommand extends Command { //MeowCommand
	constructor(client) {
		super(client, {
      name: "ally",
      aliases: [],
      group: "images",
      memberName: "ally",
      description: "Form an alliance with another user.",
	
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
   

    const RESP = [
    "They will turn the world red again.",
    "May God protect them from the capitalist and nationalist pigs.",
    "A new era shall begin.", "The ultimate alliance has been formed.",
    "True comrades.",
    "Aiming towards one mutual goal."
    ];

    let Mem = message.mentions.members.first()
    if(!Mem) return message.lineReply("mention Someone to be Allied")
    if(Mem.id == message.author.id) return message.lineReply("You can't make an ally with yourself")

    let URL = message.member.user.displayAvatarURL({format: 'png', size: 1024})
    let URL2 = Mem.user.displayAvatarURL({format: 'png', size: 1024})


    let M = await message.say("Generating Image...")
    message.channel.startTyping()
    
    Jimp.read('./cmds/assets/ally.jpg').then( async Ally => 
    {
      // console.log('adidas.png Presence')
      Jimp.read(URL).then( async Authorimage => 
      {
        // console.log('Author\'s PFP Presence')
        Jimp.read(URL2).then( async Userimage => 
        {
          // console.log('User\'s PFP Presence')

        Userimage.resize(90, 90);
        Authorimage.resize(80, 80);
        var XA = 80 
        var YA = 45
        var XU = 450
        var YU = 20

        var MI = Ally.composite(Authorimage, XA, YA );

        let FileN = 'ally'

        const File = MI.composite(Userimage, XU, YU).write('./temp/ally.jpg')
        
        let A = new MessageAttachment()
        .setFile("./temp/ally.jpg", "ally.jpg")
    
        message.channel.stopTyping()
        await M.delete()
        
        await message.say(`<@${message.author.id}> **has formed an alliance with** <@${Mem.id}>`, A)
        .then(() => message.say(RESP[Math.floor(Math.random() * (RESP.length))]))     
        .then(() => fs.unlink("./temp/ally.jpg"))//.then(() => console.log("Image has been sended and deleted from temp folder"))
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

