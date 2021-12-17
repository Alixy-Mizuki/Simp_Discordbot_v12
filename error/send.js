const { MessageEmbed } = require("discord.js")

/**
 * Easy to send errors because im lazy to do the same things :p
 * @param {String} text - Message which is need to send
 * @param {TextChannel} channel - A Channel to send error
 */
module.exports = async (text, channel) => {
    let embed = new MessageEmbed()
    .setTitle("Error Logged")
    .setColor("RED")
    .setDescription(text)
    .setFooter("Something went wrong :(")
    await channel.send(embed)
}

/*

const { cerror } = require("../../config.json")
const SE = require("../../error/send"); // SE(text, channel)
    
    let ERCH = this.client.channels.cache.get(`${cerror}`)


        .catch(e =>
        {
          SE(`\`\`\`fix\n${e.message}\n\`\`\`\n\n\`\`\`yaml\n${module.filename}\n\`\`\``, ERCH)
          message.channel.stopTyping()
          message.lineReply("Error Detected, Please Don't use the Command for Now").then(X => X.delete({ timeout:4000 }))
        })

*/