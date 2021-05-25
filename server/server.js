const { GraphQLServer, PubSub } = require('graphql-yoga');
const typeDefs = require('./types/types');

	const conversations = [];

	const subscribers = [];
	const onMessagesUpdates = (fn) => subscribers.push(fn);

	const resolvers = {
		Query: {
			conversations: () => conversations,
		},
		Mutation: {
			postMessage: (parent, { conversationId, user, content }) => {
				console.log('posting');
				const foundConversation = conversations.find((conversation) => conversation.id === conversationId);
				const id = Math.random().toString(26).slice(2);
				foundConversation.messages.push({
					id,
					user,
					content,
				});
				subscribers.forEach((fn) => fn());

				return id;
			},

			createConversation: (parent, { userId }) => {
				const id = Math.random().toString(26).slice(2);
				console.log(id);
				conversations.push({
					id,
					userId,
					messages: [],
				});
				subscribers.forEach((fn) => fn());
				return id;
			},
		},
		Subscription: {
			conversations: {
				subscribe: (parent, args, { pubsub }) => {
					const channel = Math.random().toString(26).slice(2);

					onMessagesUpdates(() => pubsub.publish(channel, { conversations }));
					setTimeout(() => pubsub.publish(channel, { conversations }), 0);
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
