const { Command } = require('discord.js-commando');
const { MessageEmbed, MessageAttachment, Collection, Client, Util } = require("discord.js");
require('discord-reply'); // message.lineReply()
// const ms = require('parse-ms');
const delay = require('delay');
const Jimp = require("jimp");
const fs = require('fs-extra');

const CLOG = require('../functions/clog');
// message.lineReply()

module.exports = class InfoCommand extends Command { //MeowCommand
	constructor(client) {
		super(client, {
			name: 'info',
			aliases: [], 
			group: 'halp',
			memberName: 'info', 
			description: 'INFORMATION RELATED TO THE BOT / SUPPORT SERVER / ETC', 
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

		});
	}

//  async run
	run(message) {
//	run(message, { text }) {    //with args
		CLOG(message.author.tag, module)

    let INFO = new MessageEmbed()
    .setTitle("INFORMATION")
    .setDescription(`**My Prefix is** \`${this.client.commandPrefix}\` \n**To Get Started Type** \`${this.client.commandPrefix}help\`
    I'm Still **WIP** Bot, So if you found any bugs or errors, You can do \`${this.client.commandPrefix}bug\` to make a bug report. I'll send it to my Support Server. Thank you.
    This bot Made by \`${this.client.owners[0].tag}\`\n
    Links
    **[Support Server](https://discord.gg/NsHp9egH8C)**
    **[Youtube Link](https://www.youtube.com/channel/UCoMlAgkd_L7g3a2rHV-KO8Q)**
    **[Twitch Link](https://www.twitch.tv/alixy_tr)**
    `)
    .setThumbnail(this.client.user.displayAvatarURL())
    .setColor("GREEN")
    .setTimestamp()


    message.lineReply(INFO)

	}
};
