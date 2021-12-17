const { Command } = require('discord.js-commando');
const { MessageEmbed, MessageAttachment, Collection,Util } = require("discord.js");
require('dishub')
const { LOG, Edit, Delete } = require('dishub')
const Fetch = require('node-fetch')

module.exports = class R_blessedCommand extends Command { //MeowCommand
	constructor(client) 
  {
		super(client, 
    {
      name : 'blessed', // String
      aliases : [], // StringArray
      group : 'reddit', // String
      memberName : 'blessed', // String
      description : 'Gives a random Blessed Image from /r/blessedimages.', // String
      // details : '', // String
      examples : [], // StringArray // `${clent.commandPrefix}`
      guildOnly : true, // Boolean
      ownerOnly : false, // Boolean
      nsfw : false, // Boolean
      clientPermissions : [], // StringArray
      userPermissions : [], // StringArray
      throttling: 
        {
        usages: 1,
        duration: 5, // Seconds
        },

		});
	}

	async run(message) {
//	async run(message, { text }) {
		let url = 'https://www.reddit.com/r/blessedimages/random/.json?sort=top&t=day&limit=500'
    Fetch(url)
      .then(res => 
      {
        res.json()
          .then(response => 
          {
            let { children } = response[0].data
            if(children === undefined) return this.run(message)

            let { data } = children[0]
            // LOG(data)
            
            let Title = data.title
            let Reddit = data.subreddit_name_prefixed
            let Url = data.url || data.url_overridden_by_dest
            let PermaLink = data.permalink
            let Likes = data.ups
            let Comments = data.num_comments


            let Emed = new MessageEmbed()
            .setTitle(Title)
            .setDescription(`👍 ${Likes} | 💬 ${Comments}`)
            .setURL("https://www.reddit.com"+PermaLink)
            .setImage(Url)
            .setColor("RANDOM")

            message.lineReplyNoMention(Emed)
            



          })
      })



//
	}
};
