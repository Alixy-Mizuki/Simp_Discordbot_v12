const { stripIndents, oneLine } = require('common-tags');
const { Command , disambiguation } = require('discord.js-commando');
const { MessageEmbed, Collection, Client } = require("discord.js");
require('discord-reply'); // message.lineReply()
const CLOG = require('../functions/clog');		

module.exports = class HelpCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'help',
			group: 'halp',
			memberName: 'help',
			aliases: [],
			description: 'Displays detailed information for a specified command.',
			args: [
				{
					key: 'command',
					prompt: 'Which command would you like to view the help for?',
					type: 'string',
					default: ''
				}
			]
		});
	}

	async run(msg, args) { // eslint-disable-line complexity
		CLOG(msg.author.tag, module)

		const groups = this.client.registry.groups;
		const commands = this.client.registry.findCommands(args.command, false, msg);
		const showAll = args.command && args.command.toLowerCase() === 'all';

  		if(args.command && !showAll) {
			if(commands.length === 1) {

        let EMB = new MessageEmbed()
        .setColor('RANDOM')
				.setFooter(`Support ${this.client.user.username}! https://paypal.me/NB365 | Created by ${this.client.owners[0].tag}`, this.client.owners[0].avatarURL())


        let help = stripIndents`
						**Command Name:** ${commands[0].name}\n\n**Command Description:** ${commands[0].description} ${commands[0].guildOnly ? ' (Usable only in servers)' : ''} ${commands[0].nsfw ? ' (NSFW)' : ''}\n\n**Format:** ${msg.anyUsage(`${commands[0].name}${commands[0].format ? ` ${commands[0].format}` : ''}`)}`;

				if(commands[0].aliases.length > 0) help += `\n\n**Aliases:** ${commands[0].aliases.join(', ')}`;

				help += `\n\n**Group:** ${commands[0].group.name}(\`${commands[0].groupID}:${commands[0].memberName}\`)`;

				if(commands[0].details) help += `\n\n**Details:** ${commands[0].details}`;

				if(commands[0].examples) help += `\n\n**Examples:** \`${commands[0].examples.join(', ')}\``;

        EMB.setDescription(help)





				
msg.lineReply(EMB)
				// const messages = [];
				// try {
          
				// 	// messages.push(await msg.direct(help));
				// 	// if(msg.channel.type !== 'dm') messages.push(await msg.reply('Sent you a DM with information.'));
				// } catch(err) {
				// 	messages.push(await msg.reply('Unable to send you the help DM. You probably have DMs disabled.'));
				// }
				// return messages;
			} else if(commands.length > 15) {
				return msg.reply('Multiple commands found. Please be more specific.');
			} else if(commands.length > 1) {
				return msg.reply(disambiguation(commands, 'commands'));
			} else {
				return msg.reply(
					`Unable to identify command. Use ${msg.usage(
						null, msg.channel.type === 'dm' ? null : undefined, msg.channel.type === 'dm' ? null : undefined
					)} to view the list of all commands.`
				);
			}
		} 
    else
    {
      var PermissionsR = 238419265; //Smilef Recommended Perms
      var PermissionsA = 8;

      let L_YT = '[YouTube](https://www.youtube.com/channel/UCoMlAgkd_L7g3a2rHV-KO8Q)';
      let L_TW = '[Twitch](https://www.twitch.tv/alixy_tr)';
      let L_SS = '[Support Server](https://discord.gg/NsHp9egH8C)';
      let L_SM = `[Support ${this.client.user.username}!](https://paypal.me/NB365)`;
      let L_IN_A = `[Bot Invite Link (ADMIN)](https://discord.com/oauth2/authorize?client_id=${this.client.user.id}&permissions=${PermissionsA}&scope=bot)`;
      let L_IN_R = `[Bot Invite Link (Recommended)](https://discord.com/oauth2/authorize?client_id=${this.client.user.id}&permissions=${PermissionsR}&scope=bot)`;
      // let  = 

      const Emb = new MessageEmbed()
        .setColor("AQUA")
        .setTitle(`${this.client.user.username}'s Documentation`)
        .setThumbnail(this.client.user.avatarURL())
        .setDescription(`For a full list of commands, please type \`${this.client.commandPrefix}commands\` \n\nTo see more info about a specific command, please type \`${this.client.commandPrefix}help <command>\` without the \`<>\``)
        .addField('About', `This bot focused on Image manipulation, sometimes the bot can crash without any reason. We tried to make the bot as optimized as possible. Some images takes awhile to be generated before the bot reply with the result. Handler Used in this bot is Discord.js-Commando.\n**If you encounter any bugs or errors, You can do \`${this.client.commandPrefix}bug\` to make a bug report.**\n\`Thank You For Using Our Bot.\``)
        .addField('Links', `\n**${L_YT} | ${L_TW}**\n**${L_SS} | ${L_SM}**\n**${L_IN_A} | ${L_IN_R}**`)        
        .setFooter(`Created by ${this.client.owners[0].tag}`, this.client.owners[0].avatarURL());
    
        msg.say(Emb);
    }
//--
  }
}