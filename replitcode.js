const { Client, Intents, MessageEmbed, RichEmbed } = require("discord.js");
const https = require("https");
const bodyParser = require("body-parser");
const keepAlive = require("./server");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const date = new Date();
      // console.log("current Time", date);
var ISToffSet = 330; //IST is 5:30; i.e. 60*5+30 = 330 in minutes 
offset = ISToffSet * 60 * 1000;
var today = new Date(date.getTime() + offset);

      // var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();
var hour = String(today.getHours());
if (hour.length == 1) {
  hour = "0" + hour;
}
var minute = String(today.getMinutes());
if (minute.length == 1) {
    minute = "0" + minute;
}

const tdate=today = dd + '.' + mm + '.' + yyyy;
const ttime = hour + ":" + minute;

function allupdate() {
  https.get("https://enigmatic-bastion-    19478.herokuapp.com/reminders", function (response) {
    response.on("data", function (data) {
      var noticeData = JSON.parse(data);
      noticeData.forEach(function (el) {

        if(el.date==tdate){
          const eembed = new MessageEmbed().setColor('#0099ff').setTitle(el.name).setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed").addField('Details:', el.content, true);
          // console.log(embed);
          client.guilds.fetch(guildId)
            .then(guild =>
              guild.channels.fetch(channelId)
                .then(channel =>
                  channel.send({ embeds: [eembed] })
                ));
        }
        // sendmessage(msg);
       


      })
    })
  })
}
function showupdates() {
  https.get("https://enigmatic-bastion-19478.herokuapp.com/reminders", function (response) {
    response.on("data", function (data) {
      var noticeData = JSON.parse(data);



      const date = new Date();
      // console.log("current Time", date);
      var ISToffSet = 330; //IST is 5:30; i.e. 60*5+30 = 330 in minutes 
      offset = ISToffSet * 60 * 1000;
      var today = new Date(date.getTime() + offset);

      // var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0');
      var yyyy = today.getFullYear();
      var hour = String(today.getHours());
      if (hour.length == 1) {
        hour = "0" + hour;
      }
      var minute = String(today.getMinutes());
      if (minute.length == 1) {
        minute = "0" + minute;
      }

      today = dd + '.' + mm + '.' + yyyy;
      var time = hour + ":" + minute;
      console.log(today + " " + time + "---->");

      noticeData.forEach(function (el) {
        console.log(el.date + " " + el.time);
        if (el.date == today) {
          if (el.time == time) {

            var msg = "@everyone\n";
            // sendmessage(msg);
            const eembed = new MessageEmbed().setColor('#0099ff').setTitle(el.name).setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed").addField('Details:', el.content, true);
            // console.log(embed);
            client.guilds.fetch(guildId)
              .then(guild =>
                guild.channels.fetch(channelId)
                  .then(channel =>
                    channel.send({ embeds: [eembed] })
                  ));
          }



        }
      });

      console.log("\n");


    })
  })
}
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
})


client.on("messageCreate", (msg) => {
  if (msg.content == "!update") {
    allupdate();
  }
})

let channelId = "946648852394549251";
let guildId = "946648852394549248"
const sendmessage = (message) => {
  client.guilds.fetch(guildId)
    .then(guild =>
      guild.channels.fetch(channelId)
        .then(channel =>
          channel.send(message)
        ));
}


const time = new Date().getMinutes();
// if(time=="00" || time =="30"){
//while (true){
setInterval(showupdates, 60000);
//}

// }




const { token } = require("./config.json")
keepAlive();
client.login(token);