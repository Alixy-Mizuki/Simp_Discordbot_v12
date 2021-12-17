const { Command } = require('discord.js-commando');
const { MessageEmbed, MessageAttachment, Collection, Client, Util } = require("discord.js");
require('discord-reply'); // message.lineReply()
const COLOR = process.env.COLOR
const delay = require('delay');
const { getPokemon } = require(`../functions/pokemon.js`);

const { cerror } = require("../../config.json")
const SE = require("../../error/send.js"); // SE(text, channel)

module.exports = class S_pokemonCommand extends Command { //MeowCommand
	constructor(client) {
		super(client, {
			name: 'pokemon',
			aliases: [], 
			group: 'search',
			memberName: 'pokemon', 
			description: 'Search pokemon description', 
      examples: [`${client.commandPrefix}pokemon <Query>`],
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
          prompt: 'What pokemon do you want to search?',
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
   
    
    const pokemon = Query;
      try {
          const pokeData = await getPokemon(pokemon);
          //console.log(pokeData.stats)
          const { 
              sprites, 
              stats, 
              weight, 
              height,
              name, 
              id, 
              base_experience,
              abilities,
              types
          } = pokeData;
          const EMB = new MessageEmbed();
          EMB.setTitle(`${name} #${id}`)
          EMB.setThumbnail(`${sprites.front_default}`);
          types.forEach(type => EMB.addField('🗂️ Type', type.type.name, true), true);
          EMB.addField('⚖️ Weight', weight, true);
          EMB.addField('📐 Height', height, true);
          EMB.addField('📊 Base Experience', base_experience);
          EMB.addField('HP', stats[0].base_stat, true)
          EMB.addField('Attack', stats[1].base_stat, true)
          EMB.addField('Defense', stats[2].base_stat, true)
          EMB.addField('Special Attack', stats[3].base_stat, true)
          EMB.addField('Special Defense', stats[4].base_stat, true)
          EMB.addField('Speed', stats[5].base_stat, true)
          
          
          // stats.forEach(stat => EMB.addField(stat.stat.name, stat.base_stat, true));
          EMB.setColor(COLOR)
          message.lineReply(EMB);
      }
      catch(err) {
          console.log(err);
          message.lineReply(`Pokemon ${pokemon} does not exist.`);
      }

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