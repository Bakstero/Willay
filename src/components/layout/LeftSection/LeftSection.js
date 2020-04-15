import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { ReactComponent as Logo } from '../../Static/Icons/logo/Logo.svg'
import { ReactComponent as Blog } from '../../Static/Icons/LeftSection/blog.svg'
import { ReactComponent as Developer } from '../../Static/Icons/LeftSection/developer.svg'
import { ReactComponent as Friends } from '../../Static/Icons/LeftSection/friends.svg'
import { ReactComponent as GameLibary } from '../../Static/Icons/LeftSection/gamelibary.svg'
import { ReactComponent as Play } from '../../Static/Icons/LeftSection/play.svg'
import { ReactComponent as Settings } from '../../Static/Icons/LeftSection/settings.svg'

const Wrapper = styled.div`
 	width: 5%;
	height:100vh;
	display:flex;
	flex-direction: column;
	align-items: center;
	left: 0;
	border-right: 1px solid #FFC045;
	position: fixed;
`
const Logolink = styled(Link)`
 color: #FFC045;
 decoration: none;
 text-decoration: none;
`
const LogoContainer = styled.div`
	height: 12vh;
	display: flex;
	justify-content: center;
	align-items: center;
`
const IconsContainer = styled.div`
	height: 60vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`
const Ul = styled.ul`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 0px;
`

const Li = styled.li`
	margin-top: 30px;
	list-style-type: none;
`
const IconBlog = styled(Blog)`
	width: 25px;
	height:25px;
	fill: white;
	:hover {
		fill: #FFC045;
	}
`
const IconDeveloper = styled(Developer)`
	width: 25px;
	height:25px;
	fill: white;
	:hover {
		fill: #FFC045;
	}
`
const IconFriends = styled(Friends)`
	width: 25px;
	height:25px;
	fill: white;
	:hover {
		fill: #FFC045;
	}
`
const IconGameLibary = styled(GameLibary)`
	width: 25px;
	height:25px;
	fill: white;
	:hover {
		fill: #FFC045;
	}
`
const IconPlay = styled(Play)`
	width: 25px;
	height:25px;
	fill: white;
	:hover {
		fill: #FFC045;
	}
`
const IconSettings = styled(Settings)`
	width: 25px;
	height:25px;
	fill: white;
	:hover {
		fill: #FFC045;
	}
`
const IconLogo = styled(Logo)`
	width: 60px;
	height:60px;
`

export default class leftNavbar extends Component {
	render() {
		return (
			<Wrapper>
				<LogoContainer>
					<Link to='/home'><IconLogo /></Link>
				</LogoContainer>
				<IconsContainer>
					<Ul>
						<Li><Logolink to='/search'><IconPlay /></Logolink></Li>
						<Li><Logolink to='/friends'><IconFriends/></Logolink></Li>
						<Li><Logolink to='/gamelibary'><IconGameLibary /></Logolink></Li>
						<Li><Logolink to='/blog'><IconBlog /></Logolink></Li>
						<Li><Logolink to='/developers'><IconDeveloper /></Logolink></Li>
						<Li><Logolink to='/settings'><IconSettings  /></Logolink></Li>
					</Ul>
				</IconsContainer>
			</Wrapper>
		)
	}
}
