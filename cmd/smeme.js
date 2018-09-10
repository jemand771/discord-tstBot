const Permissions = require("discord.js/src/util/Permissions");
module.exports = {
  name: 'smeme',
  description: 'play a meme',
  type: 0,
  execute(refs, msg, args) {



    if (!refs.smemes.has(args[0])) {
      msg.reply('thats not a meme i know');
      return;
    }
    try {
      // play the smeme
      let smeme = refs.smemes.get(args[0]);
      if (msg.member.voiceChannel) {
        var voiceChannel = msg.member.voiceChannel;
        msg.delete();
        voiceChannel.join().then(connection => {

          console.log("now playing " + args[0]);
          const dispatcher = connection.playFile(smeme);
          dispatcher.on("end", end => {
						process.stdout.write("done playing. ");
            setTimeout(function() {
              console.log("bye");
              voiceChannel.leave();
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