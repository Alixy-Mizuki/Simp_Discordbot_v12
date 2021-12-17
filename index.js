const { CommandoClient } = require('discord.js-commando');
const { MessageEmbed , Structures } = require('discord.js');
const path = require('path');
const { readdirSync } = require('fs');
const express = require("express")
const app = express()


//Define Client
const client = new CommandoClient({
	commandPrefix: 's?',
  owner: '692632336961110087'
});

app.get("/", (req, res) => {
 res.send('BOT IS ONLINE!')
})

app.listen(3000)



client.registry
	.registerDefaultTypes()
	.registerGroups([  
    ['cmds', 'cmds'],
		['halp', 'Help'],
		['fun', 'Fun'],
    ['search', 'Search'],
    ['reddit', 'Reddit'],
    ['images', 'Images'],
    ['texts', 'Texts'],
    ['nsfw', 'NSFW'],
    ['misc', 'Miscellaneous'],
    ['owner', 'Owner-Only']
//    ['second', 'Your Second Command Group'],
	])
    
	.registerDefaultGroups()
  .registerDefaultCommands({
    unknownCommand: false,
  	help: false,
    ping: false,
    prefix: false,
    commandState: true,
    eval: false,
  })
	.registerCommandsIn(path.join(__dirname, 'cmds'));


//error
client.on('error', () => console.error )

var Err = function Bug(x) 
{
  return client.channels.cache.get('857093213410951200').send(x)
}


//disconnect
client.on("disconnect", () => {
    console.log("Disconnected")
    client.login(process.env.TOKEN).then(function(){
        console.log("Reconnected")
    });  
})

//Login
client.login(process.env.TOKEN)

// Statuses
client.on('ready', () => 
{
  // setInterval(() => 
  client.user.setPresence({ activity: { name: `${client.commandPrefix}help while i'm trying to count from 1 to 10`, type: 'LISTENING' }, status: "idle"})

  // , 12000)
  // console.clear()
	// console.clear()
	console.log("FIRED UP AND RUNNING")
  console.log(`Logged in as ${client.user.tag}! \n( ${client.user.id} )\n`);
});

const prefix = client.commandPrefix
client.on('guildCreate', guild => {


  
// /*   
    const channel = guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(guild.me).has('SEND_MESSAGES'))
    let INVITES = new MessageEmbed()
    .setTitle("Thanks For Inviting Me")
    .setDescription(`**My Prefix is** \`${prefix}\` \n**To Get Started Type** \`${prefix}help\`
    I'm Still **WIP** Bot, So if you found any bugs or errors, You can do \`${prefix}bug\` to make a bug report. I'll send it to my Support Server. Thank you.
    This bot Made by \`${client.owners[0].tag}\`\n
    Links
    **[Support Server](https://discord.gg/NsHp9egH8C)**
    **[Youtube Link](https://www.youtube.com/channel/UCoMlAgkd_L7g3a2rHV-KO8Q)**
    **[Twitch Link](https://www.twitch.tv/alixy_tr)**
    `)
    .setColor("GREEN")
    .setTimestamp()
// */
//
    let EM = new MessageEmbed()
    .setTitle(`Server Number ${client.guilds.cache.size}`)
    .addFields(
      {
        name: "Guild Name",
        value: guild.name,
        inline: false
      },
      {
        name: "Guild ID",
        value: guild.id,
        inline: false
      },
      {
        name: "Owner",
        value: guild.owner,
        inline: false
      },
      {
        name: "Owner ID",
        value: guild.owner.id,
        inline: false
      }
      // {
      //   name: ,
      //   value: ,
      //   inline: true
      // }
    )
    .setThumbnail(guild.iconURL({ dynamic: true }))
    .setColor("GREEN")
    .setTimestamp()
//
    client.channels.cache.get("850197480230486026").send(EM)
    channel.send(INVITES)
})


// Left a guild
client.on("guildDelete", guild => {
    //
    let EM = new MessageEmbed()
		.setTitle(`Total Server: ${client.guilds.cache.size}`)
    .addField("Left The Guild", "Guild Name: \n**"+guild.name+"**")
    .setColor("RED")
    .setTimestamp()
//
    client.channels.cache.get("850197480230486026").send(EM)
    //remove from guildArray
})


// functions / module
client.fnc = require('./fn/funcs')