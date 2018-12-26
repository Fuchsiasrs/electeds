const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.on("message", message => {
    const dmchannel = client.channels.find("name", "dm-log");
    if (message.channel.type === "dm") {
        if (message.author.bot) return;
        dmchannel.sendMessage("", {embed: {
            color: 3447003,
            title: `Gönderen: ${message.author.tag}`,
            description: `Bota Özelden Gönderilen DM: ${message.content}`
        }})
    }
});

const snekfetch = require('snekfetch');
let points = JSON.parse(fs.readFileSync('./xp.json', 'utf8'));

var f = [];
function factorial (n) {
  if (n == 0 || n == 1)
    return 1;
  if (f[n] > 0)
    return f[n];
  return f[n] = factorial(n-1) * n;
};
function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}

client.on("message", async message => {
    if (message.channel.type === "dm") return;

  if (message.author.bot) return;

  var user = message.mentions.users.first() || message.author;
  if (!message.guild) user = message.author;

  if (!points[user.id]) points[user.id] = {
    points: 0,
    level: 0,
  };

  let userData = points[user.id];
  userData.points++;

  let curLevel = Math.floor(0.1 * Math.sqrt(userData.points));
  if (curLevel > userData.level) {
    userData.level = curLevel;
        var user = message.mentions.users.first() || message.author;
message.channel.send(`🆙  ${user.username}   Geveze seni yine level atladın -_- `)
    }

fs.writeFile('./xp.json', JSON.stringify(points), (err) => {
    if (err) console.error(err)
  })

  if (message.content.toLowerCase() === prefix + 'profil' || message.content.toLowerCase() === prefix + 'profile') {
const level = new Discord.RichEmbed().setTitle(`${user.username}`).setDescription(`**Seviye:** ${userData.level}\n**Exp (Experience ):** ${userData.points}`).setColor("RANDOM").setFooter(``).setThumbnail(user.avatarURL)
message.channel.send(`📝 **| ${user.username} Adlı Kullanıcının Profili Burada!**`)
message.channel.send(level)
  }
});

var f = [];
function factorial (n) {
  if (n == 0 || n == 1)
    return 1;
  if (f[n] > 0)
    return f[n];
  return f[n] = factorial(n-1) * n;
};
function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}



client.on('message', msg => {
  if (msg.content.toLowerCase() === '1564891564891') {
   msg.delete(30)
    msg.reply('Bu sunucuda küfür etmek yasak!');
  }
});

client.on('message', msg => {  
   if (msg.content.toLowerCase() === 'sa') {
      msg.react("🇦")
      msg.react("🇸")
	}
   if (msg.content.toLowerCase() === 'Sa') {
      msg.reply('Aleyküm selam,  Hoş Geldin :raised_hands:');
	}
});


function checkExistingCommand(commandText, commandName) {
    let commandExists = false;
    fs.readFile('./özelkomut/komut.txt', 'utf8', function (err, f) {
        let findCommands = f.toString().split(";");
        for (i = 0; i < findCommands.length; i++) {
            if (commandName === findCommands[i]) {
                commandExists = true;
            }
        }
        if (commandExists === true) {
            createCommand(commandText, true, commandName);
        } else if (commandExists === false) {
            createCommand(commandText, false, commandName);
        }
    });

}


function createCommand(commandText, commandExists, commandName) {
    let fileName = "./özelkomut/" + commandName + ".txt";
    if (commandExists === true) {
        fs.writeFile(fileName, commandText, function (err) {
            if (err) {
                return console.error(err);
            }
        });
    } else if (commandExists === false) {
        fs.appendFile('./özelkomut/komut.txt', commandName + ';', (err) => {
            if (err) throw err;
        });

        fs.writeFile(fileName, commandText.trim(), function (err) {
            if (err) {
                return console.error(err);
            }
        });
    }
}


function checkExistingCommand(commandText, commandName) {
    let commandExists = false;
    fs.readFile('./özelkomut/komut.txt', 'utf8', function (err, f) {
        let findCommands = f.toString().split(";");
        for (i = 0; i < findCommands.length; i++) {
            if (commandName === findCommands[i]) {
                commandExists = true;
            }
        }
        if (commandExists === true) {
            createCommand(commandText, true, commandName);
        } else if (commandExists === false) {
            createCommand(commandText, false, commandName);
        }
    });

}


function createCommand(commandText, commandExists, commandName) {
    let fileName = "./özelkomut/" + commandName + ".txt";
    if (commandExists === true) {
        fs.writeFile(fileName, commandText, function (err) {
            if (err) {
                return console.error(err);
            }
        });
    } else if (commandExists === false) {
        fs.appendFile('./özelkomut/komut.txt', commandName + ';', (err) => {
            if (err) throw err;
        });

        fs.writeFile(fileName, commandText.trim(), function (err) {
            if (err) {
                return console.error(err);
            }
        });
    }
}

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'kuş') {
		if (!msg.guild.member(msg.author).hasPermission("BAN_MEMBERS")) {
			msg.author.sendMessage('cik cik pelin abliş'); 
		} else {
		msg.reply('cik cik pelin abliş^^');
		}
	}
});

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);
