const { MessageEmbed, MessageAttachment, Collection, Client, Util } = require("discord.js");
require('discord-reply'); // message.lineReply()
const { Command } = require("discord.js-commando");
const Jimp = require("jimp");
const delay = require('delay');
const fs = require('fs-extra');
// 
const { cerror } = require("../../config.json")
const SE = require("../../error/send"); // SE(text, channel)
    
module.exports = class ApocalypseCommand extends Command { //MeowCommand
	constructor(client) {
		super(client, {
      name: "apocalypse",
      aliases: [],
      group: "images",
      memberName: "apocalypse",
      description: "***The 4 Horsemen of the Apocalypse.*** Takes random users and puts their profile pictures in the image. Alternatively, you can use the image parameter to use the last uploaded images (up to 4 images only).",
	
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
   

    let Mem = message.mentions.members.first()
    if(!Mem) return message.lineReply("mention people ( MAX 4 )")
    
    let USERS = []

      let ARG = message.content.split(' ').slice(1)

      // console.log(ARG)

      if(ARG.length == 4)
      {
        USERS.push(ARG[0])
        USERS.push(ARG[1])
        USERS.push(ARG[2])
        USERS.push(ARG[3])
      }
      if(ARG.length == 3)
      {
        USERS.push(ARG[0])
        USERS.push(ARG[1])
        USERS.push(ARG[2])
        USERS.push("blank")
      }
      if(ARG.length == 2)
      {
        USERS.push(ARG[0])
        USERS.push(ARG[1])
        USERS.push("blank")
        USERS.push("blank")
      }
      if(ARG.length == 1)
      {
        USERS.push(ARG[0])
        USERS.push("blank")
        USERS.push("blank")
        USERS.push("blank")
      }
      if(ARG.length > 4) return message.lineReply("I'm Only Limited to 4 Mentions")

    let US = []
    USERS.forEach(X => 
    {
      let U = X.replace(/</gi, '').replace(/@/gi,'').replace(/>/gi,'').replace(/!/gi,'')
      US.push(U)
    })

    let URLS = []

    let AV = US.filter(X => X != "blank")
      
    AV.forEach(X => {
      let ME = message.guild.members.cache.get(X)

      let IMG = ME.user.displayAvatarURL({format: 'png', size: 1024})
      
      URLS.push(IMG)
    })
    let NOAV = US.filter(X => X == "blank")
    NOAV.forEach(X => {
      URLS.push("./cmds/assets/blank.png")
    })


    // console.log(USERS)
    // console.log(US)
    // console.log(URLS)

//    /*

    let M = await message.say("Generating Image...")
    message.channel.startTyping()    

    Jimp.read('./cmds/assets/apocalypse.jpg').then( async APOC => 
    {
      // console.log('apocalypse.jpg Presence')
      Jimp.read(URLS[0]).then( async USER1 => 
      {
        USER1.resize(450, 450)
        APOC.composite(USER1, 30, 250)
        // console.log('USER1\'s PFP Presence')
        Jimp.read(URLS[1]).then( async USER2 => 
        {
          USER2.resize(450, 450)
          APOC.composite(USER2, 600, 250)
          // console.log('USER2\'s PFP Presence')
          Jimp.read(URLS[2]).then( async USER3 => 
          {   
            USER3.resize(450, 450)   
            APOC.composite(USER3, 30, 950)  
            // console.log('USER3\'s PFP Presence')
            Jimp.read(URLS[3]).then( async USER4 => 
            {
              USER4.resize(450, 450)
              // console.log('USER4\'s PFP Presence')
                    
              const File = APOC.composite(USER4, 600, 950).write('./temp/apocalypse.jpg')
              
              let A = new MessageAttachment()
              .setFile("./temp/apocalypse.jpg", "apocalypse.jpg")
          
              message.channel.stopTyping()
              await M.delete()
              
              await message.lineReply("**The 4 Horsemen of the Apocalypse**", A).then(() => fs.unlink("./temp/apocalypse.jpg"))//.then(() => console.log("Image has been sended and deleted from temp folder"))

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
    // */
//
  }
}

