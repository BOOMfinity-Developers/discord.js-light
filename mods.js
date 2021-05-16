const Discord = require("discord.js");

Discord.MessageReaction.prototype.fetch = async function() {
	const message = await this.message.fetch();
	const existing = message.reactions.cache.get(this.emoji.id || this.emoji.name);

	this.message = message;
	this._patch(existing || { count: 0 });
	return this;
}
