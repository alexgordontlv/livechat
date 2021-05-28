const { GraphQLServer, PubSub } = require('graphql-yoga');
const typeDefs = require('./types/types');
const mongoose = require('mongoose');
const Conversations = require('./models/schema');
//Provide here you MONGDODB CREDENTIALS
const dbURI = '';

(async () => {
	await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

	let conversations = [];
	const updateConversations = async () => {
		setTimeout(() => pubsub.publish('NEW_MESSAGE', { conversations }), 1000);
		try {
			conversations = await Conversations.find();
		} catch (err) {
			console.log(err);
		}
	};

	const resolvers = {
		Query: {
			conversations: () => conversations,
		},
		Mutation: {
			postMessage: async (parent, { conversationId, user, content }) => {
				try {
					const foundConversation = await Conversations.findOne({ _id: conversationId });
					foundConversation.messages.push({
						user,
						content,
					});
					const res = await foundConversation.save();
					await updateConversations();
					return res.id;
				} catch (err) {
					console.log(err);
				}
			},

			createConversation: async (parent, { userId }) => {
				const conversation = new Conversations({
					userId: userId,
					messages: [],
				});
				try {
					const res = await conversation.save();
					await updateConversations();
					return res.id;
				} catch (err) {
					console.log(err);
				}
			},
		},
		Subscription: {
			conversations: {
				subscribe: async (parent, args, { pubsub }) => {
					await updateConversations();
					return pubsub.asyncIterator('NEW_MESSAGE');
				},
			},
		},
	};
	const pubsub = new PubSub();
	const server = new GraphQLServer({ typeDefs, resolvers, context: { pubsub } });
	server.start(({ port }) => {
		console.log(`Server on http://localhost:${port}/`);
	});
})();
