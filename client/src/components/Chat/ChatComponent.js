import { Avatar, IconButton } from "@material-ui/core";
import {
	AttachFile,
	InsertEmoticon,
	Mic,
	MoreVert,
	SearchOutlined,
} from "@material-ui/icons";
import React, { useState } from "react";
import axios from "../../axios";

import "./Chat.css";

function ChatComponent({ messages }) {
	const [input, setInput] = useState("");

	const sendMessage = async (e) => {
		e.preventDefault();

		await axios.post("/messages/new", {
			message: input,
			name: "Raghu",
			timestamp: "Just Now",
			received: true,
		});

		setInput("");
	};

	return (
		<div className="chat">
			<div className="chat__header">
				<Avatar />

				<div className="chat__headerInfo">
					<h3>Room name</h3>
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
					<p key={index}
						className={`chat__message ${
							message.received && "chat__reciever"
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
				<InsertEmoticon />
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
