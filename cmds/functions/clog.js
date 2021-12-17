const { MessageEmbed } = require("discord.js")
const Chalk = require('chalk')


module.exports = async (author, module) => 
{
	const p = module.path;
	const i = module.id;

	let o = i.replace(p)
	let FR = o.slice(10).replace(/.js/gi, '')
	console.log(Chalk.red.bold(author) + " executed " +Chalk.blue.bold(FR))
}

