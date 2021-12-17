const { Command } = require('discord.js-commando');
const { MessageEmbed, MessageAttachment, Collection, Client, Util } = require("discord.js");
require('discord-reply'); // message.lineReply()
// const ms = require('parse-ms');
const delay = require('delay');
const CLOG = require('../functions/clog');

module.exports = class BugCommand extends Command { //MeowCommand
	constructor(client) {
		super(client, {
			name: 'bug', 
			aliases: [], 
			group: 'misc', 
			memberName: 'bug', 
			description: 'Send a bug report to support server. Detailed report really Appreciated', 
      guildOnly: true,
//      hidden: true, // false
//      ownerOnly: true,
//      clientPermissions: ['ADMINISTRATOR'],
//      userPermissions: ['MANAGE_MESSAGES'],
      throttling: 
        {
        usages: 1,
        duration: 2,
        },
      args: 
        [{
          key: 'content', // Declaring the name of args for Run cmd
          prompt: '```Pleae provide a valid report```',
          type: 'string', // string, integer, user, member
//          default: 1
        }],
		});
	}
	async run(message, { content }) {    //with args
		CLOG(message.author.tag, module)

    let sl = new MessageEmbed()
      .setDescription(`${message.author}, Thanks For Submitting the bug. We Appreciated That`)
      .setColor("RANDOM")
      .setTimestamp()


    let clog = new MessageEmbed()
    .setTitle(`**Bug Report**`)
    .setDescription(`\`Author  :\` **${message.author.username}#${message.author.discriminator}**\n\`ID      :\` **${message.author.id}**\n\`Guild   :\` **${message.guild}** \n\`Channel :\` **${message.channel} | ${message.channel.id}**\n\n\`Message :\` **${content}**`)
    .setColor("RANDOM")
    .setTimestamp()
    .setFooter(`Dev can Reply Using ( ${this.client.commandPrefix}sd <Channel_ID> <message> )`)

    message.channel.send(sl)
    // bugchl.send(clog)
    this.client.channels.cache.get('819949871149875230').send(clog);  // modlog
    // message.channel.send(clog) //test modlog
    message.delete()


	}
};