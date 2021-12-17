const { Command } = require('discord.js-commando');
const { stripIndents, oneLine } = require('common-tags');
const { MessageEmbed, Collection, Client, Util } = require("discord.js");
require('discord-reply'); // message.lineReply()
const delay = require('delay');
const { Database } = require("quick.replit");
const db = new Database(process.env.REPLIT_DB_URL);
const CLOG = require('../functions/clog');	
// message.lineReply()

module.exports = class H_commandsCommand extends Command { //MeowCommand
	constructor(client) {
		super(client, {
			name: 'commands', // meow
			aliases: ["cmd", 'cmds', 'c'], // kitty-cat
			group: 'halp', // fun
			memberName: 'commands', // filename (meow)
			description: 'Help Embed', // desc /Replies with a meow, kitty cat.
      // guildOnly: true,
      hidden: true, // false
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
	async run(msg, args) { // eslint-disable-line complexity

	CLOG(msg.author.tag, module)

		const groups = this.client.registry.groups;
		const commands = this.client.registry.findCommands(args.command, false, msg);
		const showAll = args.command && args.command.toLowerCase() === 'all';

  	if(args.command && !showAll) 
    {
      return 
		} 
    else
    {      
      await db.get('changelogs').then(X => 
      {
      const CMDC = this.client.registry.commands.size
      const Embed = new MessageEmbed()
      .setColor("GREEN")
      .addField("Changelogs", `\`\`\`yaml\n${X}\n\`\`\``)
      .setFooter(`To see more info about a specific command, please type ( ${this.client.commandPrefix}help <command> ) without the ( <> ) | Created by ${this.client.owners[0].tag} | Support ${this.client.user.username}! https://paypal.me/NB365`, this.client.owners[0].avatarURL())
			const messages = [];



				Embed.setDescription(stripIndents`
					${showAll ? 'All commands' : `__**Available commands in ${msg.guild || 'this DM'}`}**__
          \n**Commands Count:**
          \`\`\`yaml\n${CMDC}\n\`\`\`
        ${groups.filter(grp => grp.commands.some(cmd => !cmd.hidden && (showAll || cmd.isUsable(msg))))
						.map(grp => stripIndents`
							**${grp.name} [ ${grp.commands.filter(cmd => !cmd.hidden && (showAll || cmd.isUsable(msg))).size} ]**:\n${grp.commands.filter(cmd => !cmd.hidden && (showAll || cmd.isUsable(msg)))
								.map(cmd => `\`${cmd.name}${cmd.nsfw ? ' (NSFW)' : ''}\``).join(', ')}`).join('\n')}`, { split: true })
        


        msg.say(Embed)
      })
      .catch(e =>
      {
        console.log(e)
        SE(`\`\`\`fix\n${e.message}\n\`\`\`\n\`\`\`yaml\n${module.filename}\n\`\`\``, ERCH)
        msg.lineReply("Error Detected, Please Don't use the Command for Now").then(X => X.delete({ timeout:4000 }))
      })

		}
    //
	}
};


