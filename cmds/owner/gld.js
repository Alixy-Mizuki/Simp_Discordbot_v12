const { Command } = require('discord.js-commando');
const { MessageEmbed, Collection, Client } = require('discord.js');
module.exports = class GuildleaveCommand extends Command { //MeowCommand
	constructor(client) {
		super(client, {
			name: 'gld', // meow
			aliases: [], // kitty-cat
			group: 'owner', // fun
			memberName: 'gld', // filename (meow)
			description: 'guild leave commands', // desc /Replies with a meow, kitty cat.
      hidden: true, // false 
      ownerOnly: true,     
      args: 
        [{
          key: 'GID', // Declaring the name of args for Run cmd
          prompt: `I need a guild id so i can leave that specific guild`,
          type: 'string', // string, integer, user, member
        }],
		});
	}

//  async run
	run(message, { GID }) {
const BO = ['692632336961110087' , "791682875224490014"]
const bot = this.client.user

      if(!BO.includes(message.author.id)) return message.reply(`\`\`\`yaml\nMissing Permission To access Devs Commands\n\`\`\``)

  let Guilds = GID.split(' ')

  for(let index of Guilds)
  {
    let G = this.client.guilds.cache.get(index)

    G.leave()
    message.channel.send(`Succesfully Leaving ${G}`)
  }
  
     
      
  }
};