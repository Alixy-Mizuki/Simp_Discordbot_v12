const { Command } = require('discord.js-commando');
const { MessageEmbed, MessageAttachment, Collection, Client, Util } = require("discord.js");
require('discord-reply'); // message.lineReply()
const COLOR = process.env.COLOR
const delay = require('delay');

const { cerror } = require("../../config.json")
const SE = require("../../error/send.js"); // SE(text, channel)

module.exports = class T_chooseCommand extends Command { //MeowCommand
	constructor(client) {
		super(client, {
			name: 'choose',
			aliases: [], 
			group: 'texts',
			memberName: 'choose', 
			description: 'Give the bot options to choose something', 
      examples: [`${client.commandPrefix}choose <option 1>/<option 2>/<option 3>`],
      guildOnly: true,
      // hidden: true, // false
      // ownerOnly: true,
      // clientPermissions: ['ADMINISTRATOR'],
      // userPermissions: ['MANAGE_MESSAGES'],
      throttling: 
        {
        usages: 1,
        duration: 5,
        },

		});
	}

	async run(message) {
//	async run(message, { text }) {
    let ERCH = this.client.channels.cache.get(`${cerror}`)
    
		const CLOG = require('../functions/clog');		
		CLOG(message.author.tag, module)
   
    
  let M = message.content.split(" ").slice(1).join(" ")
  let MSG = M.split('/')
  if(!M.length) return message.reply(`I guess i'll just choose \`Air\` then ¯\\_(ツ)_/¯\n\n\`${this.client.commandPrefix}choose <option 1>/<option 2>/<option 3>\``)
  let AR = []
  MSG.forEach(X => {
    AR.push(X)
  })
  let RDM = AR[Math.floor(Math.random() * AR.length)]

  let EMB = new MessageEmbed()
  .setTitle(`${this.client.user.username}'s Chooser Machine`)
  .setDescription(`I choose \`${RDM}\``)
  .setColor(COLOR)
  
  message.lineReply(EMB).catch(e =>
  {
    console.log(e)
    SE(`\`\`\`fix\n${e.message}\n\`\`\`\n\n\`\`\`yaml\n${module.filename}\n\`\`\``, ERCH)
    message.channel.stopTyping()
    message.lineReply("Error Detected, Please Don't use this Command for Now").then(X => X.delete({ timeout:4000 }))
  })

//
	}
};



/*


*/