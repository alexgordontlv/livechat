import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Card } from '@material-ui/core';
import { useStyles } from './styles';
import Conversations from '../conversations/Conversations';
import Messages from '../messages/Messages';
const ChatWindow = ({ openChat }) => {
	const classes = useStyles();
	const [conversationId, setConversationId] = useState(null);
	console.log(conversationId);

	return openChat
		? ReactDOM.createPortal(
				<Card className={classes.root}>
					{!conversationId ? (
						<Conversations setConversationId={setConversationId} />
					) : (
						<Messages conversationId={conversationId} setConversationId={setConversationId} />
					)}
				</Card>,
				document.body
		  )
		: null;
};

export default ChatWindow;
