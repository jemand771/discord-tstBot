const Discord = require('discord.js');
const client = new Discord.Client();
var config = require('./config.json');
const fs = require('fs');
path=require("path");
let commands, smemes, refs;

function reloadFiles() {
//TODO !reload does not work properly
	process.stdout.write("loading data.. ");
  const cmdFiles = fs.readdirSync('./cmd');
  commands = new Discord.Collection();
  for (const file of cmdFiles) {
		let filename = path.resolve(`./cmd/${file}`);
		delete require.cache[filename];
		let cmd = require(`./cmd/${file}`);
		commands.set(cmd.name, undefined);
    commands.set(cmd.name, cmd);
		// console.log(commands.get(cmd.name).execute.toString());
  }

  const smemeFiles = fs.readdirSync('./smemes');
  smemes = new Discord.Collection();
  for (const file of smemeFiles) {
    let smeme = `./smemes/${file}`;
    smemes.set(smeme.split("/smemes/")[1].split(".")[0], smeme);
  }
	console.log("OK!");
	console.log(commands.size + " commands");
	console.log(smemes.size + " smemes");

	refs = {
	  "config": config,
		"commands": commands,
	  "client": client,
	  "smemes": smemes,
		"reload": reloadFiles
	};
}
reloadFiles();



client.on('ready', () => {
  console.log("OK!");
  console.log("Hello " + client.user.username + "!");
});

client.on('message', msg => {
  // msg.guild.members.forEach(member => { console.log(member.user.username);});
  if (!msg.content.startsWith(config.prefix)) return;

  const args = msg.content.slice(config.prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (!commands.has(command)) {
    msg.reply('unknown command');
    return;
  }

  try {
    let cmd = commands.get(command);
    cmd.execute(refs, msg, args);

  } catch (error) {
    msg.reply('an error has occurred, please notify bot developers. (@jemand771#1132)');
    console.log(error);
  }





});

process.stdout.write("logging in.. ");
client.login(config.token);
