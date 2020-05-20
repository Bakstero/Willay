import React from 'react';
import { Link } from 'react-router-dom'

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import Assignment from '@material-ui/icons/Assignment';
import DeveloperModeIcon from '@material-ui/icons/DeveloperMode';
import SettingsIcon from '@material-ui/icons/Settings';
import DashboardIcon from '@material-ui/icons/Dashboard';

export const mainListItems = (
	<div>
		<ListItem button component={Link} to='/home'>
			<ListItemIcon>
				<DashboardIcon />
			</ListItemIcon>
			<ListItemText primary="Dashboard" />
		</ListItem>
		<ListItem button component={Link} to='/play'>
			<ListItemIcon>
				<PlayArrowIcon />
			</ListItemIcon>
			<ListItemText primary="Play" />
		</ListItem>
		<ListItem button component={Link} to='/gamelibrary'>
			<ListItemIcon>
				<VideoLibraryIcon />
			</ListItemIcon>
			<ListItemText primary="Game library" />
		</ListItem>
		<ListItem button component={Link} to='/blog'>
			<ListItemIcon>
				<Assignment />
			</ListItemIcon>
			<ListItemText primary="Blog" />
		</ListItem>
		<ListItem button component={Link} to='/developer'>
			<ListItemIcon>
				<DeveloperModeIcon />
			</ListItemIcon>
			<ListItemText primary="Developer" />
		</ListItem>
		<ListItem button component={Link} to='/settings'>
			<ListItemIcon>
				<SettingsIcon />
			</ListItemIcon>
			<ListItemText primary="Settings" />
		</ListItem>
	</div>
);