import { Avatar, IconButton } from '@material-ui/core';
import {
	AttachFile,
	InsertEmoticon,
	Mic,
	MoreVert,
	SearchOutlined,
} from '@material-ui/icons';
import React, { useState } from 'react';
import axios from '../../axios';
import Picker, { SKIN_TONE_NEUTRAL } from 'emoji-picker-react';

import './Chat.css';

function ChatComponent({ messages }) {
	const [input, setInput] = useState('');
	const [chosenEmoji, setChosenEmoji] = useState(null);
	const [open, setopen] = useState(false);

	const time = new Date();

	const handleToggle = async (event, emojiObject) => {
		setopen(true);
	};
	const handleDisplay = async (event, emojiObject) => {
		setChosenEmoji(emojiObject.emoji);

		setInput(input + chosenEmoji);
		setopen(false);
	};

	const sendMessage = async (e) => {
		e.preventDefault();

		await axios.post('/messages/new', {
			message: input,
			name: 'Raghunandan',
			timestamp: time.getHours() + ':' + time.getMinutes(),
			received: true,
		});

		setInput('');
		setChosenEmoji('');
	};

	return (
		<div className="chat">
			<div className="chat__header">
				<Avatar />

				<div className="chat__headerInfo">
					<h3>GR - 6</h3>
					<p>Let's listen at...</p>
				</div>

				<div className="chat__headerRight">
					<IconButton>
						<SearchOutlined />
					</IconButton>
					<IconButton>
						<AttachFile />
					</IconButton>
					<IconButton>
						<MoreVert />
					</IconButton>
				</div>
			</div>

			<div className="chat__body">
				{messages.map((message, index) => (
					<p
						key={index}
						className={`chat__message ${
							message.received && 'chat__reciever'
						}`}>
						<span className="chat__name">{message.name}</span>
						{message.message}
						<span className="chat__timestamp">
							{message.timestamp}
						</span>
					</p>
				))}
			</div>

			<div className="chat__footer">
				<InsertEmoticon onClick={handleToggle} />

				<div
					style={{
						display: open ? 'block' : 'none',
						position: 'absolute',
						bottom: '5rem',
					}}>
					<Picker
						onEmojiClick={handleDisplay}
						skinTone={SKIN_TONE_NEUTRAL}
					/>
				</div>
				<form>
					<input
						value={input}
						onChange={(e) => setInput(e.target.value)}
						placeholder="Type a message"
						type="text"
					/>
					<button onClick={sendMessage} type="submit">
						Send a message
					</button>
				</form>
				<Mic />
			</div>
		</div>
	);
}

export default ChatComponent;
