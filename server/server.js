const { GraphQLServer, PubSub } = require('graphql-yoga');
const typeDefs = require('./types/types');
const mongoose = require('mongoose');
const Conversations = require('./models/schema');
//Provide here you MONGDODB CREDENTIALS
const dbURI = '';

(async () => {
	await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

	let conversations = [];
	const subscribers = [];

	const updateConversations = async () => {
		conversations = await Conversations.find();
	};

	const onMessagesUpdates = (fn) => subscribers.push(fn);

	const resolvers = {
		Query: {
			conversations: async () => conversations,
		},
		Mutation: {
			postMessage: async (parent, { conversationId, user, content }) => {
				const foundConversation = await Conversations.findOne({ _id: conversationId });
				foundConversation.messages.push({
					user,
					content,
				});
				const res = await foundConversation.save();
				await updateConversations();
				subscribers.forEach((fn) => fn());
				return res.id;
			},

			createConversation: async (parent, { userId }) => {
				const conversation = new Conversations({
					userId: userId,
					messages: [],
				});
				const res = await conversation.save();
				await updateConversations();
				subscribers.forEach((fn) => fn());
				return res.id;
			},
		},
		Subscription: {
			conversations: {
				subscribe: (parent, args, { pubsub }) => {
					const channel = Math.random().toString(26).slice(2);
					onMessagesUpdates(() => pubsub.publish(channel, { conversations }));
					setTimeout(() => pubsub.publish(channel, { conversations }), 1000);
					return pubsub.asyncIterator(channel);
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
