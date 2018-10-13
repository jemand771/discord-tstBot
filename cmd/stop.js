module.exports = {
  name: 'stop',
  description: 'stop the bot',
  type: 0,
  execute(refs, msg, args) {
		console.log("stopping bot");
		const fs = require('fs');
		fs.unlink('running', (err) => {
  		if (err) throw err;
  		console.log('stop flag set');
		});
		msg.channel.send("Bye everyone!");
		msg.channel.send("*goes offline*");
		process.exit(0);
  }
}
