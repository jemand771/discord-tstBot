const Permissions = require("discord.js/src/util/Permissions");
module.exports = {
  name: 'rsme',
  description: 'play a random meme',
  type: 0,
  execute(refs, msg, args) {


    

    try {
      // play the smeme
	  let items = Array.from(refs.smemes.keys());
	let smeme = items[Math.floor(Math.random() * items.length)];
	  if (msg.member.voiceChannel) {
        var voiceChannel = msg.member.voiceChannel;
        msg.delete();
        voiceChannel.join().then(connection => {

          console.log("now playing " + smeme);
          const dispatcher = connection.playFile(refs.smemes.get(smeme));
          dispatcher.on("end", end => {
						process.stdout.write("done playing. ");
            setTimeout(function() {
              console.log("bye");
              voiceChannel.leave();
			  // msg.channel.send("!rsme");
            }, 0)
          })
          // setTimeout(function() {
          //   msg.member.voiceChannel.leave();
          // }, 3000);
        }).catch(console.log);
      } else {
        msg.channel.send("please join a voice channel first!");
      }

    } catch (error) {
      msg.reply('an error has occurred, please notify bot developers.');
      console.log(error);
    }
  }
};