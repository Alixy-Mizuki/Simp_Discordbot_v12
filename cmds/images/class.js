const { Command } = require('discord.js-commando');
const { MessageEmbed, MessageAttachment, Collection, Client, Util } = require("discord.js");
require('discord-reply'); // message.lineReply()
// const ms = require('parse-ms');
const delay = require('delay');
const Jimp = require("jimp");
const fs = require('fs-extra');

const { cerror } = require("../../config.json")
const SE = require("../../error/send.js"); // SE(text, channel)


module.exports = class ClassyCommand extends Command { //MeowCommand
	constructor(client) {
		super(client, {
			name: 'class',
			aliases: [], 
			group: 'images',
			memberName: 'class', 
			description: '**Choose your class.** Takes random users and puts their profile pictures in the image. (up to 6 images only).', 
      guildOnly: true,
//      hidden: true, // false
//      ownerOnly: true,
//      clientPermissions: ['ADMINISTRATOR'],
//      userPermissions: ['MANAGE_MESSAGES'],
      throttling: 
        {
        usages: 1,
        duration: 20,
        },
		});
	}

//  async run
	async run(message) {
//	run(message, { text }) {    //with args
    let ERCH = this.client.channels.cache.get(`${cerror}`)
    
		const CLOG = require('../functions/clog');		
		CLOG(message.author.tag, module)
   
    let Mem = message.mentions.members.first()
    if(!Mem) return message.lineReply("mention people ( MAX 6 )")
    
    let USERS = []

      let ARG = message.content.split(' ').slice(1)

      // console.log(ARG)

      if(ARG.length == 6)
      {
        USERS.push(ARG[0])
        USERS.push(ARG[1])
        USERS.push(ARG[2])
        USERS.push(ARG[3])
        USERS.push(ARG[4])
        USERS.push(ARG[5])
      }
      if(ARG.length == 5)
      {
        USERS.push(ARG[0])
        USERS.push(ARG[1])
        USERS.push(ARG[2])
        USERS.push(ARG[3])
        USERS.push(ARG[4])
        USERS.push("blank")
      }
      if(ARG.length == 4)
      {
        USERS.push(ARG[0])
        USERS.push(ARG[1])
        USERS.push(ARG[2])
        USERS.push(ARG[3])
        USERS.push("blank")
        USERS.push("blank")
      }
      if(ARG.length == 3)
      {
        USERS.push(ARG[0])
        USERS.push(ARG[1])
        USERS.push(ARG[2])
        USERS.push("blank")
        USERS.push("blank")
        USERS.push("blank")
      }
      if(ARG.length == 2)
      {
        USERS.push(ARG[0])
        USERS.push(ARG[1])
        USERS.push("blank")
        USERS.push("blank")
        USERS.push("blank")
        USERS.push("blank")
      }
      if(ARG.length == 1)
      {
        USERS.push(ARG[0])
        USERS.push("blank")
        USERS.push("blank")
        USERS.push("blank")
        USERS.push("blank")
        USERS.push("blank")
      }
      if(ARG.length > 6) return message.lineReply("MAX 6 Users")

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

    Jimp.read('./cmds/assets/class.png').then( async CLASS => 
    {
      // console.log('class.png Presence')
      var BG = new Jimp(CLASS.bitmap.width, CLASS.bitmap.height)
      Jimp.read(URLS[0]).then( async USER1 => 
      {
        USER1.cover(196, 196)
        BG.composite(USER1, 19, 89)
        Jimp.read(URLS[1]).then( async USER2 => 
        {
          USER2.cover(201, 201)
          BG.composite(USER2, 249, 86)
          Jimp.read(URLS[2]).then( async USER3 => 
          {   
            USER3.cover(197, 197)
            BG.composite(USER3, 471, 87)
            Jimp.read(URLS[3]).then( async USER4 => 
            {
              USER4.cover(199, 199)
              BG.composite(USER4, 15, 301)
              Jimp.read(URLS[4]).then( async USER5 => 
              {
                USER5.cover(204, 204)
                BG.composite(USER5, 241, 299)
                Jimp.read(URLS[5]).then( async USER6 => 
                {
                  USER6.cover(200, 200)
                  BG.composite(USER6, 467, 301)
                  // console.log('USER4\'s PFP Presence')
                  
                  const File = BG.composite(CLASS, 0, 0).write('./temp/class.jpg')
                  
                  let A = new MessageAttachment()
                  .setFile("./temp/class.jpg", "class.jpg")
              
                  message.channel.stopTyping()
                  await M.delete()
                  
                  await message.lineReply("**Choose your class:**", A).then(() => fs.unlink("./temp/class.jpg"))//.then(() => console.log("Image has been sended and deleted from temp folder"))
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
};



/*
.catch(e =>
{
  console.log(e)
  SE(`\`\`\`fix\n${e.message}\n\`\`\`\n\n\`\`\`yaml\n${module.filename}\n\`\`\``, ERCH)
  message.channel.stopTyping()
  message.lineReply("Error Detected, Please Don't use the Command for Now").then(X => X.delete({ timeout:4000 }))
})

*/