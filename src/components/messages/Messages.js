import React from 'react';

import TextField from '@material-ui/core/TextField';
import { useStyles } from '../conversations/styles';
import { IconButton, List, ListItem, Divider, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';
import { useQuery, gql } from '@apollo/client/';

const GET_MESSAGES = gql`
	query ($conversationId: ID!) {
		messages(conversationId: $conversationId) {
			id
			user
			content
		}
	}
`;

const Messages = ({ conversationId, setConversationId }) => {
	const classes = useStyles();
	console.log(conversationId);

	const { loading, error, data } = useQuery(GET_MESSAGES, {
		variables: { conversationId },
	});

	console.log(data);
	if (loading) return <div>Loading...</div>;
	if (error) return `Error! ${error}`;
	return (
		<>
			<List className={classes.list}>
				{data.messages.map((message, idx) => (
					<div key={message.id}>
						<ListItem alignItems='flex-start'>
							<ListItemAvatar>
								<Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
							</ListItemAvatar>
							<ListItemText primary={message.content} />
						</ListItem>
						<Divider variant='inset' component='li' />
					</div>
				))}
			</List>
		</>
	);
};

export default Messages;
