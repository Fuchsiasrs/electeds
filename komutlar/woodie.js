const Discord = require('discord.js');


exports.run = function(client, message) {
 
    const embed = new Discord.RichEmbed()
        .setDescription("**Şakir**")
        .setImage("https://resmim.net/f/ckojv8.jpg?nocache")
        .setThumbnail("https://resmim.net/f/ckojv8.jpg?nocache")
        .setColor(0x00AE86)
        .addField("Cinsi", "Lutino Muhabbet Kuşu", true)
        .addField("Özellikleri", `
        *Sapsarı Mükemmel Tüyleri Var
   *Hiç susmuyor 😄
   `, true)

   message.channel.send(embed)
};

exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: [],
  permLevel: 0 
};

exports.help = {
  name: 'şakir', 
  description: 'Şakir hakkında bilgi verir',
  usage: 'şakir'
};
