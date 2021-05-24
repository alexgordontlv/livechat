const { GraphQLServer } = require('graphql-yoga');

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
`;

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
			const foundConversation = conversations.find((conversation) => conversation.id === conversationId);
			const id = Math.random().toString(26).slice(2);
			foundConversation.messages.push({
				id,
				user,
				content,
			});
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
};
const server = new GraphQLServer({ typeDefs, resolvers });
server.start(({ port }) => {
	console.log(`Server is working on port:${port}`);
});
