const mongoose = require('mongoose');
const { Schema } = mongoose;

const conversationSchema = new Schema({
	userId: String,
	messages: [{ user: String, content: String }],
});

const Conversations = mongoose.model('Conversations', conversationSchema);

module.exports = Conversations;
