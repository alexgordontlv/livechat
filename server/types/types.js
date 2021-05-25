const typeDefs = `
type Conversation {
    id: ID!
    userId: ID!
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
createConversation(userId: ID!): ID!
}

type Subscription {
    messages(conversationId:ID!): [Message!]
    conversations: [Conversation!]
}
`;
module.exports = typeDefs;
