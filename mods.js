const Discord = require("discord.js");

Discord.MessageReaction.prototype.fetch = async function() {
	const message = await this.message.fetch();
	const existing = message.reactions.cache.get(this.emoji.id || this.emoji.name);

	this.message = message;
	this._patch(existing || { count: 0 });
	return this;
}

Discord.Message.prototype.delete = async function(options = {}) {
	if (typeof options !== 'object') return Promise.reject(new TypeError('INVALID_TYPE', 'options', 'object', true));
	const { timeout = 0 } = options;
	if (timeout <= 0) {
		return this.channel.messages.delete(this.id).then(() => this);
	} else {
		return new Promise(resolve => {
			this.client.setTimeout(() => {
				resolve(this.delete());
			}, timeout);
		});
	}
}
