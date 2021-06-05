import React from 'react';
import './Sidebar.css';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import { Avatar, IconButton } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SidebarChat from '../SidebarChat/SidebarChat';

function Sidebar() {
	return (
		<div className="sidebar">
			<div className="sidebar__header">
				<Avatar src="https://wallpaperaccess.com/full/1313700.jpg" />
				<div className="sidebar__headerRight">
					<IconButton>
						<DonutLargeIcon />
					</IconButton>
					<IconButton>
						<ChatIcon />
					</IconButton>
					<IconButton>
						<MoreVertIcon />
					</IconButton>
				</div>
			</div>

			<SidebarChat />
		</div>
	);
}

export default Sidebar;
