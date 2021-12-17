const { Command } = require('discord.js-commando');
const { stripIndents, oneLine } = require('common-tags');
const { MessageEmbed, MessageAttachment, Collection, Client, Util } = require("discord.js");
require('discord-reply'); // message.lineReply()
// const ms = require('parse-ms');
const delay = require('delay');
const Jimp = require("jimp");
const fs = require('fs-extra');

const { cerror } = require("../../config.json")
const SE = require("../../error/send.js"); // SE(text, channel)

module.exports = class NS_Command extends Command { //MeowCommand
	constructor(client) {
		super(client, {
			name: 'nsfw',
			aliases: [], 
			group: 'nsfw',
			memberName: 'nsfw', 
			description: 'nsfw', 
      guildOnly: true,
      nsfw: true,
      // hidden: true, // false
      // ownerOnly: true,
      // clientPermissions: ['ADMINISTRATOR'],
      // userPermissions: ['MANAGE_MESSAGES'],
      throttling: 
        {
        usages: 1,
        duration: 20,
        },
		});
	}

//  async run
	run(message) {

    let ERCH = this.client.channels.cache.get(`${cerror}`)
    
		const CLOG = require('../functions/clog');		
		CLOG(message.author.tag, module)
   
    

    const groups = this.client.registry.groups;
    // const commands = this.client.registry.findCommands(args.command, false, message);

    let EMB = new MessageEmbed()
    .setColor("GREEN")
    .addField("CHANGELOGS", `\`${this.client.commandPrefix}changelog\``)
    .setFooter(`To see more info about a specific command, please type ( ${this.client.commandPrefix}help <command> ) without the ( <> ) | Created by ${this.client.owners[0].tag}`, this.client.owners[0].avatarURL())

    .setDescription(stripIndents`${`**NSFW COMMANDS**\n\n${groups.filter(grp => grp.commands.some(cmd => cmd.hidden && cmd.nsfw && (cmd.isUsable(message)))).map(grp => stripIndents`**${grp.name} [ ${grp.commands.filter(cmd => cmd.hidden && cmd.nsfw && (cmd.isUsable(message))).size} ]**:\n${grp.commands.filter(cmd => cmd.hidden && cmd.nsfw && (cmd.isUsable(message)))
    .map(cmd => `\`${cmd.name}\``)
    .join(', ')}`)
    .join('\n')}`}`, { split: true })


    message.lineReply(EMB)
	}
};

