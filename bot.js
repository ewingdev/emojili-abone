const Discord = require("discord.js");
const client = new Discord.Client();
const express = require("express");
const app = express();
const {
    JsonDatabase
} = require("wio.db");
const db = new JsonDatabase("abonerolu");
const fs = require("fs");
                              // Ewing Baba <3
//Uptime için__________________________________________________________________
app.get("/", (req, res) => {
  res.send("Ewing babam");
});
app.listen(process.env.PORT);

//KOMUT Algılayıcı______________________________________________________________
client.commands = new Discord.Collection();

fs.readdir("./komutlar/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    let cmd = require(`./komutlar/${file}`);
    let cmdFileName = file.split(".")[0];
    console.log(`Komut Yükleme Çalışıyor: ${cmdFileName}`);
    client.commands.set(cmd.help.name, cmd);
  });
});
 // Ewing Baba <3
//EVENTS Yükleyici_______________________________________________________________
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    console.log(`Etkinlik Yükleme Çalışıyor: ${eventName}`);
    client.on(eventName, event.bind(null, client));
  });
});

client.on("ready", () => {
  console.log(`Ewing Abone Botu Aktif!`);
});

client.login("TOKENİN_KNK");
// Ewing Baba <3


client.on("message",message=>{
	  if(message.author.bot) return false;

  if(message.channel.id=="galeri_kanal_id"){ 
  if(message.attachments.size < 1) return false;
  if(message.member.roles.cache.get("yetkili_rol_id")) return false;

  let kod = "`" 
  
      message.react("tik_emoji_id"); // EMOJİ 1
      message.react("carpi_emoji_id"); // EMOJİ 2
    
      message.reply(`Attığın ss eğer **son video** değilse, **like**, **yorum**, **abone** yoksa ${kod}abone rolün verilmez.${kod}\nYetkililerimiz en kısa sürede ilgilenecektir. Lütfen bekleyin.`)
      const filter = (reaction, user) => {
        return message.guild.members.cache.get(user.id).roles.cache.has("abone_rol_id")&&!user.bot;
      };  
      const collector = message.createReactionCollector(filter, {});
  
      collector.on('collect', (reaction, user) => {

        if(reaction.emoji.name=="tik_emoji_isim"){ // EMOJİ 1
		if(message.member.roles.cache.get("abone_rol_id")) return false;
          message.guild.member(message.author.id).roles.add("abone_rol_id")
		  client.channels.cache.get("galeri_kanal_id").send(`${message.author} isimli kullanıcıya ${kod}${user.tag}${kod} tarafından ${kod}ABONE${kod} rolü verildi.`); 
          
          
        }else if(reaction.emoji.name=="carpi_emoji_isim"){ // EMOJİ 3
		  client.channels.cache.get("galeri_kanal_id").send(`${message.author} son video like yorum ve abone gereli.`);

      
        }
      });
    };
  });
