const { Command } = require('discord.js-commando');
const { MessageEmbed, MessageAttachment, Collection, Client, Util } = require("discord.js");
require('discord-reply'); // message.lineReply()
const COLOR = process.env.COLOR
const delay = require('delay');

const { cerror } = require("../../config.json")
const SE = require("../../error/send.js"); // SE(text, channel)
const CLOG = require('../functions/clog');


module.exports = class O_setCommand extends Command { //MeowCommand
	constructor(client) {
		super(client, {
			name: 'set',
			aliases: [], 
			group: 'owner',
			memberName: 'set', 
			description: 'Set Bot Status', 
      // examples: [`${client.commandPrefix}`],
      // guildOnly: true,
      // hidden: true, // false
      ownerOnly: true,
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
    //////
		let ERCH = this.client.channels.cache.get(`${cerror}`)
		CLOG(message.author.tag, module)
		let pr = this.client.commandPrefix		
		//////
		let Raw = message.content.split(' ').slice(1).join(' ')

		let M = Raw.split('//')
		if(!Raw.length) return message.lineReply(`${pr}set < status | activity | all | reset >`)	


		try
		{
			// if Arg 1 = status
			if(M[0] !== undefined && M[0].toLowerCase() === 'status')
			{
        let status;
				if(M[1] !== undefined) {
          status = M[1].toLowerCase()
        }
        if(M[1] === undefined) return message.lineReply(`\`${pr}set status//<type [online, idle, dnd, invisible]>\``)
        
				// if arg 2 = true
				if(status.length > 1  && (status.toLowerCase() === 'online' || status.toLowerCase() === 'invisible' || status.toLowerCase() === 'idle' || status.toLowerCase() === 'dnd'))
				{
					this.client.user.setStatus(status.toLowerCase())
					.catch(e => {
						console.log(e)
						SE(`\`\`\`fix\n${e.message}\n\`\`\`\n\n\`\`\`yaml\n${module.filename}\n\`\`\``, ERCH)
					})
					await message.lineReply("```yaml\nStatus Set```")
				}
				
				// if arg 2 = true b false
				else if(status.length > 1 && (status.toLowerCase() !== 'online' || status.toLowerCase() !== 'invisible' || status.toLowerCase() !== 'idle' || status.toLowerCase() !== 'dnd' ))
				{
					message.lineReply(`\`${pr}set status//<type [online, idle, dnd, invisible]>\``)
				}
				
				// if arg 2 = false
				else if(status === undefined)
				{
					message.lineReply(`\`${pr}set status//<type [online, idle, dnd, invisible]>\``)
				}
			}


			// if Arg 1 = activity
			else if(M[0] !== undefined && M[0].toLowerCase() === 'activity')
			{
				let name = M[1]
				let type = M[2]

				// if arg 2 = true & arg 3 = true
				if(name !== undefined && (type !== undefined && (type.toUpperCase() === 'PLAYING' || type.toUpperCase() === 'WATCHING' || type.toUpperCase() === 'LISTENING')))
				{
					this.client.user.setActivity(name, { type: type.toUpperCase() })
					.catch(e => {
					console.log(e)
					SE(`\`\`\`fix\n${e.message}\n\`\`\`\n\n\`\`\`yaml\n${module.filename}\n\`\`\``, ERCH)
					})
					await message.lineReply("```yaml\nPresence Name and Type Set```")
				}


				// if arg 2 = true & arg 3 = true but false
				else if(name !== undefined && (type !== undefined && ( type.toUpperCase() !== 'PLAYING'  || type.toUpperCase() !== 'WATCHING' || type.toUpperCase() !== 'LISTENING')) )
				{
					this.client.user.setActivity(name).catch(e => {
					console.log(e)
					SE(`\`\`\`fix\n${e.message}\n\`\`\`\n\n\`\`\`yaml\n${module.filename}\n\`\`\``, ERCH)
					})
					await message.lineReply("```yaml\nPresence Name Set```")
				}

				// if arg 2 = true & arg 3 = false
				else if(name !== undefined && type === undefined )
				{
					this.client.user.setActivity(name).catch(e => {
					console.log(e)
					SE(`\`\`\`fix\n${e.message}\n\`\`\`\n\n\`\`\`yaml\n${module.filename}\n\`\`\``, ERCH)
					})
					await message.lineReply("```yaml\nPresence Name Set```")
				}

				// if arg 2 & 3 = false
				else if(name === undefined && type === undefined)
				{
					message.lineReply(`\`${pr}set activity//<name>//<type [PLAYING, WATCHING, LISTENING]>\``)
				}
			}

			// if arg = all
			else if(M[0] !== undefined && M[0].toLowerCase() === 'all')
			{
				let name = M[1]
				let type = M[2]
				let status = M[3]
				
				// if arg 2 & 3 & 4 = true
				if(name !== undefined && (type !== undefined && (type.toUpperCase() === 'PLAYING'  || type.toUpperCase() === 'WATCHING' || type.toUpperCase() === 'LISTENING')) && (status !== undefined && (status.toLowerCase() === 'online' || status.toLowerCase() === 'invisible' || status.toLowerCase() === 'idle' || status.toLowerCase() === 'dnd' )) )
				{
					this.client.user.setPresence({ activity: { name: name, type: type.toUpperCase() }, status: status.toLowerCase() }).catch(e => {
					console.log(e)
					SE(`\`\`\`fix\n${e.message}\n\`\`\`\n\n\`\`\`yaml\n${module.filename}\n\`\`\``, ERCH)
					})
					await message.lineReply("```yaml\nPresence Name, Type and Status Set```")
				}


				// if arg 2 & 3 = true & arg 4 = true but false
				else if(name !== undefined && (type !== undefined && ( type.toUpperCase() === 'PLAYING'  || type.toUpperCase() === 'WATCHING' || type.toUpperCase() === 'LISTENING')) && (status !== undefined && ( status.toLowerCase() !== 'online' || status.toLowerCase() !== 'invisible' || status.toLowerCase() !== 'idle' || status.toLowerCase() !== 'dnd' )) )
				{
					this.client.user.setActivity(name, { type: type.toUpperCase() })
					.catch(e => {
					console.log(e)
					SE(`\`\`\`fix\n${e.message}\n\`\`\`\n\n\`\`\`yaml\n${module.filename}\n\`\`\``, ERCH)
					})
					await message.lineReply("```yaml\nPresence Name and Type Set```")
				}

				// if arg 2 but, arg 3 & 4 = true [false]
				else if(name !== undefined && (type !== undefined && (type.toUpperCase() !== 'PLAYING'  || type.toUpperCase() !== 'WATCHING' || type.toUpperCase() !== 'LISTENING')) && (status !== undefined && ( status.toLowerCase() !== 'online' || status.toLowerCase() !== 'invisible' || status.toLowerCase() !== 'idle' || status.toLowerCase() !== 'dnd' )) || name !== undefined && (type !== undefined && (type.toUpperCase() !== 'PLAYING'  || type.toUpperCase() !== 'WATCHING' || type.toUpperCase() !== 'LISTENING')) && status === undefined )
				{
					this.client.user.setActivity(name)
					.catch(e => {
					console.log(e)
					SE(`\`\`\`fix\n${e.message}\n\`\`\`\n\n\`\`\`yaml\n${module.filename}\n\`\`\``, ERCH)
					})
					await message.lineReply("```yaml\nPresence Name Set```")
				}

				// if arg 2 = true, but arg 3 = true[false] & arg 4 = false
				// else if()
				// {
				// 	this.client.user.setPresence(name)
				// 	.catch(e => {
				// 	console.log(e)
				// 	SE(`\`\`\`fix\n${e.message}\n\`\`\`\n\n\`\`\`yaml\n${module.filename}\n\`\`\``, ERCH)
				// 	})
				// 	await message.lineReply("```yaml\nPresence Name and Type Set```")
				// }

				// if arg 2  true | 3 & 4 = false
				else if(name !== undefined && type === undefined && status === undefined )
				{
					this.client.user.setActivity(name).catch(e => {
					console.log(e)
					SE(`\`\`\`fix\n${e.message}\n\`\`\`\n\n\`\`\`yaml\n${module.filename}\n\`\`\``, ERCH)
					})
					await message.lineReply("```yaml\nPresence Name Set```")
				}


				// if args 2 & 3 & 4 = undefined
				else if(name === undefined && type === undefined && status === undefined)
				{
					message.lineReply(`\`${pr}set all//<name>//<type [PLAYING, WATCHING, LISTENING]>//<status [online, idle, dnd, invisible]>\``)
				}
			}

			else if(M[0] !== undefined && M[0].toLowerCase() === 'reset')
			{
				this.client.user.setPresence({ activity: { name: `Trying to Count | ${pr}help`, type: 'PLAYING' }, status: "dnd"}).catch(e => {
				console.log(e)
				SE(`\`\`\`fix\n${e.message}\n\`\`\`\n\n\`\`\`yaml\n${module.filename}\n\`\`\``, ERCH)
				})
				await message.lineReply("```yaml\nPresence Resetted to Default```")
			}

			
			else if(M[0] === undefined || (M[0] !== undefined && M[0].toLowerCase() !== 'status' && M[0].toLowerCase() !== 'activity' && M[0].toLowerCase() !== 'all' && M[0].toLowerCase() !== 'reset' ))
			{
				message.lineReply(`${pr}set < status | activity | all | reset >`)	
			}





		}
		catch(e)
		{
			console.log(e)
			SE(`\`\`\`fix\n${e.message}\n\`\`\`\n\n\`\`\`yaml\n${module.filename}\n\`\`\``, ERCH)
			message.lineReply("Error Detected, Please Don't use this Command for Now").then(X => X.delete({   timeout:4000 }))
		}


//
	}
};



/*



*/