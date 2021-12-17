const { Command } = require('discord.js-commando');
const { MessageEmbed, MessageAttachment, Collection, Client, Util } = require("discord.js");
require('discord-reply'); // message.lineReply()
const Fetch = require('node-fetch')
const delay = require('delay');



const { cerror } = require("../../config.json")
const SE = require("../../error/send"); // SE(text, channel)
    

module.exports = class R_wholesomeCommand extends Command { //MeowCommand
	constructor(client) {
		super(client, {
			name: 'wholesome', 
			aliases: [], 
			group: 'reddit', 
			memberName: 'wholesome', 
			description: 'Gives a random Cursed Image from /r/wholesome.',
      guildOnly: true,
      throttling: 
        {
        usages: 1,
        duration: 5,
        },
		});
	}

//  async run
	run(message) {

    let ERCH = this.client.channels.cache.get(`${cerror}`)
    
		const CLOG = require('../functions/clog');		
		CLOG(message.author.tag, module)
   
    const RDM = Math.floor(Math.random() * 8)  

    let url = 'https://www.reddit.com/r/wholesome/random/.json?sort=top&t=day&limit=500'
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
            .setColor(this.client.color ? this.client.color : "RANDOM")

            return message.lineReplyNoMention(Emed)
            



          })
      })


//
	}
};