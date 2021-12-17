const { Command } = require('discord.js-commando');
const { MessageEmbed, MessageAttachment, Collection, Client, Util } = require("discord.js");
require('discord-reply'); // message.lineReply()
const COLOR = process.env.COLOR
const delay = require('delay');
const malScraper = require('mal-scraper')
const Kitsu = require('kitsu.js');
const kitsu = new Kitsu();

const { cerror } = require("../../config.json")
const SE = require("../../error/send.js"); // SE(text, channel)

module.exports = class S_animeCommand extends Command { //MeowCommand
	constructor(client) {
		super(client, {
			name: 'anime',
			aliases: [], 
			group: 'search',
			memberName: 'anime', 
			description: 'Search Anime Descriptions', 
      examples: [`${client.commandPrefix}anime <Query>`],
      guildOnly: true,
      // hidden: true, // false
      // ownerOnly: true,
      // clientPermissions: ['ADMINISTRATOR'],
      // userPermissions: ['MANAGE_MESSAGES'],
      throttling: 
        {
        usages: 1,
        duration: 2,
        },
      args: 
        [{
          key: 'Query', // Declaring the name of args for Run cmd
          prompt: 'What anime you want to search?',
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
   
    
    var search = Query

    kitsu.searchAnime(Query).then(async result => 
    {
      if(result.length === 0) return message.lineReply("This is not a valid anime movie")
      
      let anime = result[0]
      const embed = new MessageEmbed()
      .setColor(COLOR)
      .setAuthor(`${anime.titles.english ? anime.titles.english : search} | ${anime.showType}`, anime.posterImage.original)
      .setDescription(anime.synopsis.replace(/<[^>]*>/g, '').split('\n')[0])
      .addField('❯ Information', `•**Japanese Name:** ${anime.titles.romaji}\n•**Age Rating:** ${anime.ageRating}\n\•**Is it NSFW:** ${anime.nsfw ? 'Yes' : 'No'}`, true)
      .addField('❯ Stats', `•**Avg Rating:** ${anime.averageRating}\n\•**Rank by rating:** ${anime.ratingRank}\n\•**Rank by popularity:** ${anime.popularityRank}`, true)
      .addField('❯ Status', `•**Episode Count:** ${anime.episodeCount ? anime.episodeCount : 'N/A'}\n`, true)
      .setThumbnail(anime.posterImage.original, 100, 200);
      return message.lineReply(embed)
    })
    .catch(err => 
    {
      console.log(err)
      return message.lineReply(`Couldn't find result for ${search}`)
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
  message.lineReply("Error Detected, Please Don't use this Command for Now").then(X => X.delete({ timeout:4000 }))
})

*/







