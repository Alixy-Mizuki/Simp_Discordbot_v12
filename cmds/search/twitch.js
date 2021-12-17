const { Command } = require('discord.js-commando');
const { MessageEmbed, MessageAttachment, Collection, Client, Util } = require("discord.js");
require('discord-reply'); // message.lineReply()
const COLOR = process.env.COLOR
const delay = require('delay');
const request = require('node-superfetch');
const GAPIT = process.env.GAPIT
const TCSX = process.env.TCSX

const { cerror } = require("../../config.json")
const SE = require("../../error/send.js"); // SE(text, channel)

module.exports = class S_twitchCommand extends Command { //MeowCommand
	constructor(client) {
		super(client, {
			name: 'twitch',
			aliases: [], 
			group: 'search',
			memberName: 'twitch', 
			description: 'Search twitch Streamer by using Query', 
      // examples: [`${client.commandPrefix}`],
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
        [{
          key: 'Query', // Declaring the name of args for Run cmd
          prompt: 'Please provide a channel name',
          type: 'string', // string, integer, user, member
//          default: 1
        }],
		});
	}

  async run(message, { Query }) 
  {
    let ERCH = this.client.channels.cache.get(`${cerror}`)
    
		const CLOG = require('../functions/clog');		
		CLOG(message.author.tag, module)
   
    

    let key = GAPIT;
    let csx = TCSX;
    let query = Query;

    // const channel = message.channel.nsfw
    // if (!channel)
    // return message.lineReply(`please no NSFW`)

    if (!query)
    return message.lineReply(`please provide a channel`);

    async function search(query) {
        const { body } = await request.get("https://www.googleapis.com/customsearch/v1").query({
            key: key, cx: csx, safe: "off", q: query
        });

        if(!body.items) return null;
        return body.items[0];

    }

    let href = await search(query);
    if (!href)
    return message.lineReply(`couldn't find **${query}**`)

    const embed = new MessageEmbed()
    .setTitle(href.title)
    .setDescription(href.snippet)
    .setImage(href.pagemap ? href.pagemap.cse_thumbnail[0].src: null)
    .setURL(href.link)
    .setColor(COLOR)
    .setFooter(`Requested by ${message.author.username}`,  message.author.displayAvatarURL({ dynamic: true }))
    .setTimestamp()

    return message.lineReply(embed)

	}
};



/*
.catch(e =>
{
  console.log(e)
  SE(`\`\`\`fix\n${e.message}\n\`\`\`\n\n\`\`\`yaml\n${module.filename}\n\`\`\``, ERCH)
  message.channel.stopTyping()
  message.lineReply("Error Detected, Please Don't use this Command for Now").then(X => X.delete({ timeout:4000 }))
})

*/
