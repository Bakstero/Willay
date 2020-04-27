import React, { Component } from 'react'
import styled from 'styled-components';
import {Link} from 'react-router-dom'
import HamburgerMenu from './HamburgerMenu'
import UserIcon from '../userIcon/userIcon'
import { ReactComponent as Logo } from '../../Static/Icons/logo/Logo.svg'
import { ReactComponent as Blog } from '../../Static/Icons/LeftSection/blog.svg'
import { ReactComponent as Developer } from '../../Static/Icons/LeftSection/developer.svg'
import { ReactComponent as GameLibary } from '../../Static/Icons/LeftSection/gamelibary.svg'
import { ReactComponent as Play } from '../../Static/Icons/LeftSection/play.svg'
import { ReactComponent as Settings } from '../../Static/Icons/LeftSection/settings.svg'
import { ReactComponent as Notification } from '../../Static/Icons/RightSection/notification.svg'

const Wrapper = styled.div`
	position: fixed;
	width:100%;
	height:60px;
	background-color:#181818;
	border-bottom: solid 1px #FFC045;
	z-index: 99;
	display: flex;
	align-items:center;
	justify-content: space-between;
`

const Ul = styled.ul`
	display: flex;
		@media screen and (max-width: 968px){
			display:none ;
	}
`
const Li = styled.li`
	display: flex;
	align-items:center;
	justify-content: center;
	margin-left: 10px;
	border-radius: 10px;
	width:100px;
	height:50px;
	:hover {
		background-color:#202020;
	}
`
const LogoDiv = styled.div`
	margin-left:20px;
	display: flex;
	align-items:center;
`
const UserDiv = styled.div`
	display: flex;
	align-items:center;
	margin-right:20px;
`
const LogoIcon = styled(Logo)`
	width: 50px;
	height:50px;

`
const NotificationIcon = styled(Notification)`
	margin-right:20px;
	width: 20px;
	height:20px;
	fill: white;
		@media screen and (max-width: 1024px){
			margin-right:10px;
			width: 15px;
			height:15px; ;
	}

`
const IconBlog = styled(Blog)`
	width: 20px;
	height:20px;
	fill: white;
`
const IconDeveloper = styled(Developer)`
	width: 20px;
	height:20px;
	fill: white;
`
const IconGameLibary = styled(GameLibary)`
	width: 20px;
	height:20px;
	fill: white;
`
const IconPlay = styled(Play)`
	width: 20px;
	height:20px;
	fill: white;
`
const IconSettings = styled(Settings)`
	width: 20px;
	height:20px;
	fill: white;
`

export class Navbar extends Component {
	render() {
		return (
			<Wrapper>
				<LogoDiv>
					<Link to='/home'><LogoIcon /></Link>
					<HamburgerMenu />
				</LogoDiv>
					<Ul>
						<Link to='/play'><Li><IconPlay /></Li></Link>
						<Link to='/gamelibary'><Li><IconGameLibary /> </Li></Link>
						<Link to='/blog'><Li><IconBlog /> </Li></Link>
						<Link to='/developer'><Li><IconDeveloper /> </Li></Link>
						<Link to='/settings'><Li><IconSettings /></Li></Link >
					</Ul>
				<UserDiv>
					<Link to='/'><NotificationIcon /></Link>
					<UserIcon />
				</UserDiv>
			</Wrapper>
		)
	}
}

export default Navbar
