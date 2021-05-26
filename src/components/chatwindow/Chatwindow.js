import React, { useState, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { Card } from '@material-ui/core';
import { useStyles } from './styles';
import Conversations from '../conversations/Conversations';
import Messages from '../messages/Messages';
import { useSubscription, gql } from '@apollo/client/';
import { useLocation } from 'react-router-dom';
const GET_CONVERSATIONS = gql`
	subscription {
		conversations {
			id
			userId
			messages {
				id
				user
				content
			}
		}
	}
`;

const ChatWindow = ({ openChat }) => {
	const classes = useStyles();
	const location = useLocation();
	const [user, setUser] = useState({ role: 'customer', userId: '' });
	const [conversationId, setConversationId] = useState(null);

	//Better option to user LocalStorage... I suppose, but for the test purpose
	//and to use the same browser I use Component lifetime ID
	const userId = useMemo(() => Math.random().toString(26).slice(2), []);

	useEffect(() => {
		if (location.pathname.includes('admin')) {
			setUser({ role: 'Admin', userId });
		} else {
			setUser({ ...user, userId });
		}
	}, []);

	const { loading, error, data } = useSubscription(GET_CONVERSATIONS);

	if (loading) return null;
	if (error) return `Error! ${error}`;

	return openChat
		? ReactDOM.createPortal(
				<Card className={classes.root}>
					{!conversationId ? (
						<Conversations user={user} conversations={data.conversations} setConversationId={setConversationId} />
					) : (
						<Messages
							user={user}
							conversationId={conversationId}
							setConversationId={setConversationId}
							messages={data.conversations.find((conv) => conv.id === conversationId)}
						/>
					)}
				</Card>,
				document.body
		  )
		: null;
};

export default ChatWindow;
