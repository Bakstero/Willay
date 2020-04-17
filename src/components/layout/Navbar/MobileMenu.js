import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as Blog } from '../../Static/Icons/LeftSection/blog.svg'
import { ReactComponent as Developer } from '../../Static/Icons/LeftSection/developer.svg'
import { ReactComponent as GameLibary } from '../../Static/Icons/LeftSection/gamelibary.svg'
import { ReactComponent as Play } from '../../Static/Icons/LeftSection/play.svg'
import { ReactComponent as Settings } from '../../Static/Icons/LeftSection/settings.svg'
import { ReactComponent as Friends } from '../../Static/Icons/LeftSection/friends.svg'
import styled from 'styled-components';

const Wrapper = styled.div`
	width:100%;
	height: 100%;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`

const Ul = styled.ul`
	display: flex;
	flex-direction: column;
	padding:0;
`
const Li = styled.li`
	display: flex;
	border-radius: 10px;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color:#202020;
	width:120px;
	height:80px;
	margin:10px;
		@media screen and (max-width: 1024px){
			width:350px;
			height:200px;
			margin:10px;
	}
		@media screen and (max-width: 700px){
			width:170px;
			height:120px;
			margin:5px;
	}
		@media screen and (max-width: 350px){
			width:140px;
			height:100px;
			margin:5px;
	}
`
const IconBlog = styled(Blog)`
	width: 25px;
	height:25px;
	fill: white;
`
const IconDeveloper = styled(Developer)`
	width: 25px;
	height:25px;
	fill: white;
`
const IconGameLibary = styled(GameLibary)`
	width: 25px;
	height:25px;
	fill: white;
`
const IconPlay = styled(Play)`
	width: 25px;
	height:25px;
	fill: white;
`
const IconSettings = styled(Settings)`
	width: 25px;
	height:25px;
	fill: white;
`
const IconFriends = styled(Friends)`
	width: 25px;
	height:25px;
	fill: white;
	:hover {
		fill: #FFC045;
	}
`

const H4 = styled.h4`
color: #ffffff;
`
const LinkStyled = styled(Link)`
text-decoration: none;
`

export class MobileMenu extends Component {
	render() {
		return (
			<Wrapper>
				<Ul>
					<LinkStyled to='/play'><Li><IconPlay /><H4>Search</H4></Li></LinkStyled>
					<LinkStyled to='/gamelibary'><Li><IconGameLibary /><H4>Game Libary</H4></Li></LinkStyled>
					<LinkStyled to='/blog'><Li><IconBlog /><H4>Blog</H4></Li></LinkStyled>
				</Ul>
				<Ul>
					<LinkStyled to='/developer'><Li><IconDeveloper /><H4>Developer</H4></Li></LinkStyled>
					<LinkStyled to='/friends'><Li><IconFriends /><H4>Friends</H4></Li></LinkStyled>
					<LinkStyled to='/settings'><Li><IconSettings /><H4>Settings</H4></Li></LinkStyled >
				</Ul>
			</Wrapper>
		)
	}
}

export default MobileMenu
