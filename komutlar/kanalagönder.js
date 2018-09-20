const Discord = require('discord.js');

exports.run = (client, message, args) => {
    let kanal = args[0];
  let mesaj = args.slice(1).join(' ');

  
  if (!kanal) return message.reply("kanal adı giriniz")
	if(!mesaj) return message.reply("mesajınızı giriniz");

  message.guild.channels.find("name", kanal).send(mesaj);
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'kanalagönder',
  description: 'İstediğiniz şeyi kanala yazar.',
  usage: 'kanalagönder <kanal adı> <mesaj>'
};