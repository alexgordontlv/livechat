import React from 'react';

import { IconButton, List, ListItem, Divider, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';
import { useQuery, gql } from '@apollo/client/';
import { useStyles } from './styles';

const Rooms = ({ setConversationId }) => {
	const classes = useStyles();
	const GET_CONVERSATIONS = gql`
		query {
			conversations {
				id
				messages {
					id
					user
					content
				}
			}
		}
	`;

	const { loading, error, data } = useQuery(GET_CONVERSATIONS);

	console.log(data);
	if (loading) return <div>Loading...</div>;
	if (error) return `Error! ${error}`;

	return (
		<>
			<List className={classes.list}>
				{data.conversations.map((conversation, idx) => (
					<div key={conversation.id}>
						<ListItem alignItems='flex-start' onClick={() => setConversationId(conversation.id)}>
							<ListItemAvatar>
								<Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
							</ListItemAvatar>
							<ListItemText primary={conversation.messages.length > 0 ? conversation.messages[0].content : 'Empty Chat'} />
						</ListItem>
						<Divider variant='inset' component='li' />
					</div>
				))}
			</List>
		</>
	);
};

export default Rooms;
