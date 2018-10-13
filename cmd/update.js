module.exports = {
  name: 'update',
  description: 'updates and restarts the bot',
  type: 0,
  execute(refs, msg, args) {
		console.log("restarting");
		msg.channel.send("Updating...");
		process.exit(0);
  }
}
