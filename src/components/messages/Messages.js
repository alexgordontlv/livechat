import React, { useState, useRef, useEffect } from 'react';

import { useStyles } from './styles';
import { FormControl, TextField, IconButton, List, ListItem, Divider, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';
import { useSubscription, gql, useMutation } from '@apollo/client/';
import { CardActions, CardContent } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import SendIcon from '@material-ui/icons/Send';

const POST_MESSAGE = gql`
	mutation ($conversationId: ID!, $user: String!, $content: String!) {
		postMessage(conversationId: $conversationId, user: $user, content: $content)
	}
`;

const Messages = ({ conversationId, setConversationId, messages, user }) => {
	const [content, setContent] = useState('');
	const scrollRef = useRef(null);

	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollIntoView({ behaviour: 'smooth' });
		}
	}, [messages]);

	const classes = useStyles();
	const [postMessage] = useMutation(POST_MESSAGE);

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('submit', content);
		postMessage({
			variables: { conversationId, user: user.role, content },
		});
		setContent('');
	};

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
					{messages.messages.map((message, idx) => (
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
										<Avatar alt='Admin' src='/static/images/avatar/1.jpg' />
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
