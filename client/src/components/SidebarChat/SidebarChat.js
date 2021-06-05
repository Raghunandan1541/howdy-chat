import { Avatar } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import React, { Fragment, useContext, useState } from 'react';
import './SidebarChat.css';
import axios from '../../axios';
import { GroupContext } from '../MainComponent';

function SidebarChat() {
	const [input, setInput] = useState('');
	const GC = useContext(GroupContext);

	const createGroup = async (e) => {
		e.preventDefault();

		await axios.post('/groups/new', {
			name: input,
		});

		setInput('');
	};

	return (
		<Fragment>
			<div className="sidebar__search">
				<div className="sidebar__searchContainer">
					<SearchOutlined />
					<form>
						<input
							value={input}
							onChange={(e) => setInput(e.target.value)}
							placeholder="Search or start new chat"
							type="text"
						/>
						<button onClick={createGroup} type="submit"></button>
					</form>
				</div>
			</div>

			<div className="sidebar__chats">
				{GC.groups.map((group, index) => (
					<div key={index} className="sidebarChat">
						<Avatar />
						<div className="sidebarChat__info">
							<h2> {group.name} </h2>
						</div>
					</div>
				))}
			</div>
		</Fragment>
	);
}

export default SidebarChat;
