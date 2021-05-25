import React, { useEffect, useState } from 'react';

import { IconButton, List, ListItem, Divider, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';
import { gql, useMutation } from '@apollo/client/';
import { useStyles } from './styles';
import { CardActions, CardContent } from '@material-ui/core';
import RateReviewIcon from '@material-ui/icons/RateReview';
const CREATE_CONVERSATIONS = gql`
	mutation ($userId: ID!) {
		createConversation(userId: $userId)
	}
`;

const Rooms = ({ setConversationId, conversations, user }) => {
	const [conversationArray, setConversationArray] = useState([]);
	const classes = useStyles();
	console.log(conversationArray);
	useEffect(() => {
		if (user.role !== 'Admin') {
			const filteredConversations = conversations.filter((cnv) => cnv.userId === user.userId);
			setConversationArray(filteredConversations);
		} else {
			setConversationArray(conversations);
		}
	}, [conversations]);
	const [createConversation] = useMutation(CREATE_CONVERSATIONS, {
		variables: { userId: user.userId },
	});

	return (
		<>
			<CardActions className={classes.header}>
				<p>Conversations</p>
				<IconButton onClick={() => createConversation()}>
					<RateReviewIcon />
				</IconButton>
			</CardActions>
			<CardContent className={classes.body}>
				<List className={classes.list}>
					{conversationArray.map((conversation, idx) => (
						<div key={conversation.id}>
							<ListItem alignItems='flex-start' onClick={() => setConversationId(conversation.id)}>
								<ListItemAvatar>
									<Avatar alt='Admin' src='/static/images/avatar/1.jpg' />
								</ListItemAvatar>
								<ListItemText
									primary={conversation.messages.length > 0 ? conversation.messages[conversation.messages.length - 1].content : 'Empty Chat'}
								/>
							</ListItem>
							<Divider variant='inset' component='li' />
						</div>
					))}
				</List>
			</CardContent>
		</>
	);
};

export default Rooms;
