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

module.exports = class S_mangaCommand extends Command { //MeowCommand
	constructor(client) {
		super(client, {
			name: 'manga',
			aliases: [], 
			group: 'search',
			memberName: 'manga', 
			description: 'Search manga Descriptions', 
      examples: [`${client.commandPrefix}manga <Query>`],
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
          prompt: 'What manga you want to search?',
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

    kitsu.searchManga(Query).then(async result => 
    {
      if(result.length === 0) return message.lineReply("This is not a valid manga movie")
      
      let manga = result[0]
      //console.log(manga)
      const embed = new MessageEmbed()
      .setColor(COLOR)
      .setAuthor(`${manga.titles.english ? manga.titles.english : search}`, manga.posterImage.original)
      .setDescription(manga.synopsis.replace(/<[^>]*>/g, '').split('\n')[0])
      .addField('❯ Information', `•**Japanese Name:** ${manga.titles.romaji}\n•**Age Rating:** ${manga.ageRating ? manga.ageRating : 'N/A'}\n\•**Manga Type:** ${manga.mangaType ? manga.mangaType : 'N/A'}`, true)
      .addField('❯ Stats', `•**Avg Rating:** ${manga.averageRating}\n\•**Rank by rating:** ${manga.ratingRank}\n\•**Rank by popularity:** ${manga.popularityRank}`, true)
      .addField('❯ Status', `•**Chapter Count:** ${manga.chapterCount ? manga.chapterCount : 'N/A'}\n•**Volume Count:** ${manga.volumeCount ? manga.volumeCount : 'N/A'}\n`, true)
      .setThumbnail(manga.posterImage.original, 100, 200);
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