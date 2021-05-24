import React from 'react';
import ChatIcon from '@material-ui/icons/Chat';
import Fab from '@material-ui/core/Fab';
import { Card, CardActions, CardContent } from '@material-ui/core';
import { useStyles } from './ChatStyles';
import { ApolloProvider, InMemoryCache, ApolloClient, gql, useMutation } from '@apollo/client/';
import { IconButton } from '@material-ui/core';
import RateReviewIcon from '@material-ui/icons/RateReview';
import Conversations from '../conversations/Conversations';

const client = new ApolloClient({
	uri: 'http://localhost:4000/',
	cache: new InMemoryCache(),
});

const Chat = () => {
	const classes = useStyles();

	const CREATE_CONVERSATIONS = gql`
		mutation {
			createConversation
		}
	`;
	const [createConversation] = useMutation(CREATE_CONVERSATIONS);

	return (
		<>
			<Fab color='primary' aria-label='open-chat'>
				<ChatIcon />
			</Fab>
			<Card className={classes.root}>
				<CardActions>
					<IconButton onClick={() => createConversation()}>
						<RateReviewIcon />
					</IconButton>
				</CardActions>
				<CardContent className={classes.chatWindow}>
					<Conversations role='Customer' />
				</CardContent>
			</Card>
		</>
	);
};

export default () => (
	<ApolloProvider client={client}>
		<Chat />
	</ApolloProvider>
);
