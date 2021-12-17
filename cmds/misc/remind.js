const { Command } = require('discord.js-commando');
const { MessageEmbed, MessageAttachment, Collection, Client, Util } = require("discord.js");
require('discord-reply'); // message.lineReply()
const COLOR = process.env.COLOR
const ms = require('ms');

const { cerror } = require("../../config.json")
const SE = require("../../error/send.js"); // SE(text, channel)
const CLOG = require('../functions/clog');


module.exports = class Mi_remindCommand extends Command { //MeowCommand
	constructor(client) {
		super(client, {
			name: 'remind',
			aliases: [], 
			group: 'misc',
			memberName: 'remind', 
			description: 'Remind you about something you wanted to remind about', 
      examples: [`${client.commandPrefix}remind 15s Support Simp`],
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
      args: 
        [
					{
						key: 'time', 
						prompt: 'You didnt specify any time.',
						type: 'string', 

					},
					{
						key: 'reminder', 
						prompt: 'You didnt specify any reminder',
						type: 'string', 

					}					
				],
		});
	}

	async run(message, { time, reminder }) {
    //////
		let ERCH = this.client.channels.cache.get(`${cerror}`)
		CLOG(message.author.tag, module)
		let pr = this.client.commandPrefix
		//////
			


		message.channel.send(`You set a reminder. I'll remind you after ${time}`)

		setTimeout(function () {
			message.channel.send(`${message.author}, You wanted me to remind you after ${time} about:\n> ${reminder}`)
		}, ms(time))

//
	}
};



/*

.catch(e =>
  {
    console.log(e)
    SE(`\`\`\`fix\n${e.message}\n\`\`\`\n\n\`\`\`yaml\n${module.filename}\n\`\`\``, ERCH)
    message.channel.stopTyping()
    message.lineReply("Error Detected, Please Don't use this Command for Now").then(X => X.delete({   timeout:4000 }))
  })

*/