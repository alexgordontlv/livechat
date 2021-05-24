import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Card, CardActions, CardContent } from '@material-ui/core';
import { useStyles } from './ChatStyles';
import { IconButton } from '@material-ui/core';
import RateReviewIcon from '@material-ui/icons/RateReview';
import { gql, useMutation } from '@apollo/client/';
import Conversations from '../conversations/Conversations';
import Messages from '../messages/Messages';
const ChatWindow = ({ openChat }) => {
	const classes = useStyles();
	const [conversationId, setConversationId] = useState(null);
	console.log(conversationId);
	const CREATE_CONVERSATIONS = gql`
		mutation {
			createConversation
		}
	`;

	const [createConversation] = useMutation(CREATE_CONVERSATIONS);
	return openChat
		? ReactDOM.createPortal(
				<Card className={classes.root}>
					<CardActions className={classes.header}>
						<p>Conversations</p>
						<IconButton onClick={() => createConversation()}>
							<RateReviewIcon />
						</IconButton>
					</CardActions>
					<CardContent className={classes.chatWindow}>
						{!conversationId ? (
							<Conversations setConversationId={setConversationId} />
						) : (
							<Messages conversationId={conversationId} setConversationId={setConversationId} />
						)}
					</CardContent>
				</Card>,
				document.body
		  )
		: null;
};

export default ChatWindow;
