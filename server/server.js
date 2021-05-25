const { GraphQLServer, PubSub } = require('graphql-yoga');

const messages = [];
const conversations = [];

const typeDefs = `
type Conversation {
    id: ID!
    messages: [Message!]
}

type Message {
    id: ID!
    user: String!
    content: String!
}

type Query {
 messages(conversationId:ID!): [Message!]
 conversations: [Conversation!]
}

type Mutation {
 postMessage(conversationId:ID!, user: String!, content: String!): ID!
createConversation: ID!
}

type Subscription {
    messages(conversationId:ID!): [Message!]
    conversations: [Conversation!]
}
`;

const subscribers = [];
const onMessagesUpdates = (fn) => subscribers.push(fn);

const resolvers = {
	Query: {
		messages: (parent, { conversationId }) => {
			const foundConversation = conversations.find((conversation) => conversation.id === conversationId);
			return foundConversation.messages;
		},
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

		createConversation: () => {
			const id = Math.random().toString(26).slice(2);
			console.log(id);
			conversations.push({
				id,
				messages: [],
			});
			return id;
		},
	},
	Subscription: {
		messages: {
			subscribe: (parent, { conversationId }, { pubsub }) => {
				const channel = Math.random().toString(36).slice(2, 15);
				const foundConversation = conversations.find((conversation) => conversation.id === conversationId);

				onMessagesUpdates(() => pubsub.publish(channel, { ...foundConversation }));
				setTimeout(() => pubsub.publish(channel, { ...foundConversation }), 0);
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
