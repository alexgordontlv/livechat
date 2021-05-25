import React, { useState, useRef, useEffect } from 'react';

import { useStyles } from './styles';
import { FormControl, TextField, IconButton, List, ListItem, Divider, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';
import { useSubscription, gql, useMutation } from '@apollo/client/';
import { CardActions, CardContent } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import SendIcon from '@material-ui/icons/Send';

const GET_MESSAGES = gql`
	subscription ($conversationId: ID!) {
		messages(conversationId: $conversationId) {
			id
			user
			content
		}
	}
`;

const POST_MESSAGE = gql`
	mutation ($conversationId: ID!, $user: String!, $content: String!) {
		postMessage(conversationId: $conversationId, user: $user, content: $content)
	}
`;

const Messages = ({ conversationId, setConversationId }) => {
	const [content, setContent] = useState('');
	const [user, setUser] = useState('admin');
	const { loading, error, data } = useSubscription(GET_MESSAGES, {
		variables: { conversationId },
	});
	const scrollRef = useRef(null);

	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollIntoView({ behaviour: 'smooth' });
		}
	}, [data]);

	const classes = useStyles();

	const [postMessage] = useMutation(POST_MESSAGE);

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('submit', content);
		postMessage({
			variables: { conversationId, user, content },
		});
		setContent('');
	};

	if (loading) return <div>Loading...</div>;
	if (error) return `Error! ${error}`;
	return (
		<>
			<CardActions className={classes.header}>
				<p>Messages</p>
				<IconButton onClick={() => setConversationId(null)}>
					<ArrowBackIosIcon />
				</IconButton>
			</CardActions>
			<CardContent className={classes.body}>
				<List className={classes.list}>
					{data.messages.map((message, idx) => (
						<div key={message.id}>
							<ListItem
								ref={scrollRef}
								autoFocus={true}
								style={{
									display: 'flex',
									textAlign: message.user === 'customer' ? 'right' : 'left',
								}}>
								{message.user !== 'customer' && (
									<ListItemAvatar>
										<Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
									</ListItemAvatar>
								)}

								<ListItemText primary={message.content} />
							</ListItem>
							<Divider variant='inset' component='li' />
						</div>
					))}
				</List>
			</CardContent>
			<form onSubmit={handleSubmit}>
				<CardActions className={classes.footer}>
					<TextField
						value={content}
						onChange={(e) => setContent(e.target.value)}
						autoFocus
						className={classes.input}
						fullWidth
						placeholder='Text Here...'
						InputProps={{ disableUnderline: true }}
					/>
					<IconButton type='submit'>
						<SendIcon />
					</IconButton>
				</CardActions>
			</form>
		</>
	);
};

export default Messages;
