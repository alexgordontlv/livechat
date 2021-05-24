import React, { useState } from 'react';
import ChatIcon from '@material-ui/icons/Chat';
import Fab from '@material-ui/core/Fab';

import { ApolloProvider, InMemoryCache, ApolloClient, gql, useMutation } from '@apollo/client/';

import CloseIcon from '@material-ui/icons/Close';
import ChatWindow from '../chatwindow/Chatwindow';

const client = new ApolloClient({
	uri: 'http://localhost:4000/',
	cache: new InMemoryCache(),
});

const Chat = () => {
	const [openChat, setOpenChat] = useState(false);
	const handleOpenClose = () => {
		setOpenChat((state) => !state);
	};
	return (
		<>
			<Fab color='primary' aria-label='open-chat' onClick={handleOpenClose}>
				{openChat ? <CloseIcon /> : <ChatIcon />}
			</Fab>
			<ChatWindow openChat={openChat} />
		</>
	);
};

export default () => (
	<ApolloProvider client={client}>
		<Chat />
	</ApolloProvider>
);
