import React, { useEffect, useState } from 'react';
import ChatComponent from './Chat/ChatComponent.js';
import Sidebar from './Sidebar/Sidebar.js';
import Pusher from 'pusher-js';
import axios from '../axios';

export const GroupContext = React.createContext();

function MainComponent() {
	const [messages, setMessages] = useState([]);
	const [groups, setGroups] = useState([]);

	useEffect(() => {
		axios.get('/messages/sync').then((res) => {
			setMessages(res.data);
		});

		axios.get('/groups/sync').then((res) => {
			setGroups(res.data);
		});
	}, []);

	useEffect(() => {
		const pusher = new Pusher(process.env.PUSHER_KEY, {
			cluster: 'eu',
		});

		const channel = pusher.subscribe('messages');
		channel.bind('inserted', (newMessage) => {
			setMessages([...messages, newMessage]);
		});

		return () => {
			channel.unbind_all();
			channel.unsubscribe();
		};
	}, [messages]);

	useEffect(() => {
		const pusher = new Pusher(process.env.PUSHER_KEY, {
			cluster: 'eu',
		});

		const channel = pusher.subscribe('groups');
		channel.bind('inserted', (newMessage) => {
			setGroups([...groups, newMessage]);
		});

		return () => {
			channel.unbind_all();
			channel.unsubscribe();
		};
	}, [groups]);

	return (
		<div className="app__body">
			<GroupContext.Provider
				value={{
					groups: groups,
					setGroups: setGroups,
				}}>
				<Sidebar />
			</GroupContext.Provider>
			<ChatComponent messages={messages} />
		</div>
	);
}

export default MainComponent;
