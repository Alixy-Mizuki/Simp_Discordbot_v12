const { Command } = require('discord.js-commando');
const { MessageEmbed, MessageAttachment, Collection, Client, Util } = require("discord.js");
require('discord-reply'); // message.lineReply()
const COLOR = process.env.COLOR
const delay = require('delay');
const Fetch = require('node-fetch')

const { cerror } = require("../../config.json")
const SE = require("../../error/send.js"); // SE(text, channel)

module.exports = class R_copypastaCommand extends Command { //MeowCommand
	constructor(client) {
		super(client, {
			name: 'copypasta',
			aliases: [], 
			group: 'reddit',
			memberName: 'copypasta', 
			description: 'Gives a random copypasta from /r/copypasta.', 
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

		});
	}

	async run(message) {
//	async run(message, { text }) {
    let ERCH = this.client.channels.cache.get(`${cerror}`)
    
		const CLOG = require('../functions/clog');		
		CLOG(message.author.tag, module)


    let url = 'https://www.reddit.com/r/copypasta/random/.json?sort=top&t=day&limit=500'
    Fetch(url)
      .then(res => 
      {
        res.json()
          .then(response => 
          {
            let { children } = response[0].data
            if(children === undefined) return this.run(message)

            let { data } = children[0]

            if(data.over_18 === true) return this.run(message)
            else if(data.selftext === undefined || data.selftext === null || data.selftext === '' || !data.selftext.length) return this.run(message)
            // LOG(data)
            
            let Title = '**'+data.title+'**'
            let Selftext = this.client.fnc.escapeHTML(data.selftext)

            let OTV = Title + '\n' + Selftext

            message.lineReplyNoMention(OTV, { split: true} )
            



          })
      })




//
	}
};



/*

*/
