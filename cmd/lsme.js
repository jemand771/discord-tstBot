module.exports = {
  name: 'lsme',
  description: 'list all smemes',
  type: 0,
  execute(refs, msg, args) {

		let helpString = "```\nList of all smemes currently available:\n";
		refs.smemes.forEach((value, key, map) => {
						helpString = helpString.concat('\n', refs.config.prefix, "sme ", key);
		});
		helpString = helpString.concat('\n```');
		msg.channel.send(helpString);
  }
}
