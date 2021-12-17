const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const { Collection, Client } = require("discord.js");
const delay = require('delay');

const CLOG = require('../functions/clog')
// CLOG(author, module)

module.exports = class MIS_PingCommand extends Command { //MeowCommand
	constructor(client) {
		super(client, {
			name: 'ping', // meow
			aliases: [], // kitty-cat
			group: 'misc', // fun
			memberName: 'ping', // filename (meow)
			description: 'Bot Ping', // desc /Replies with a meow, kitty cat.
//      hidden: true, // false
//      ownerOnly: true,
//      clientPermissions: ['ADMINISTRATOR'],
//      userPermissions: ['MANAGE_MESSAGES'],
      throttling: 
        {
        usages: 1,
        duration: 2,
        },

		});
	}

//  async run
	run(message) {
   const ping = new MessageEmbed()
      //.setDescription(`🏓**${Date.now() - message.createdTimestamp}ms**`);
      .setAuthor(this.client.user.username+ "'s Latency", this.client.user.avatarURL())
      .setTitle('🏓')
      .addField(`Ping Latency is:`, `\`\`\`yaml\n${Date.now() - message.createdTimestamp} ms \`\`\``)
      .addField(`API Latency is:`, `\`\`\`yaml\n${this.client.ws.ping} ms\`\`\``)
      .setColor('BLUE')
    message.channel.send(ping)
  
		CLOG(message.author.tag, module)
  }
};
