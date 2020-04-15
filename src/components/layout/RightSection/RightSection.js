import React, { Component } from 'react';
import UserIcon from '../userIcon/userIcon';
import styled from 'styled-components';
import { logout } from '../../Logout/index';
import { ReactComponent as Notification} from '../../Static/Icons/RightSection/notification.svg'
import { ReactComponent as MoreOptions } from '../../Static/Icons/RightSection/MoreOptions.svg'
const Wrapper = styled.div`
	width:7%;
	height:100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	right:0px;
	position:fixed;
`

const UserIconSection = styled.div`
	margin-top: 25px;
`

const IconsSection = styled.div`
	display:flex;
	flex-direction: column;
`

const IconNotification = styled(Notification)`
	width: 20px;
	height:20px;
	fill: white;
	margin-top: 20px;
`
const IconMoreOptions = styled(MoreOptions)`
	width: 20px;
	height:20px;
	fill: white;
	margin-top: 50px;
`

const LogoutButton = styled.button`
	width:100px;
	height:33px;
	color: white;
	background: none;
	border: 1px solid #FFC045;
	border-radius:5px;
`

export class RightSection extends Component {
	render() {
		return (
			<Wrapper>
					<UserIconSection>
						<UserIcon/>
					</UserIconSection>

					<IconsSection>
						<IconNotification />
						<IconMoreOptions />
					</IconsSection>
					<LogoutButton onClick={() => logout()}>Logout</LogoutButton>
			</Wrapper>
		)
	}
}

export default RightSection
