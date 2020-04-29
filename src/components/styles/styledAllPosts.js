import styled, { css } from 'styled-components';
import {Link} from 'react-router-dom'
import Timestamp from 'react-timestamp'
export const StyledLink = styled(Link)`
text-decoration:none;
`
export const Wrapper = styled.div`
	margin-top: 25px;
	width: 100%;
	background-color:#202020;
	border-radius: 15px;
	padding: 12px
`
export const StyledPostInfo = styled.div`
	width: 100%;
	border-radius: 10px;
	display: flex;
}
`
export const StyledInfoContainer = styled.div`
	margin-left:12px;
	display:flex;
	flex-direction: column;
		${props => props.button && css`
    	margin-left:10%;
  `}
`
export const StyledStatContainer = styled.div`
	border-top: solid 1px #FFC045;
	display:flex;
`

export const StyledUserIcon = styled.img`
	width: 60px;
	border-radius: 50%;
`
export const StyledButton = styled.button`
	cursor: pointer;
	width: 100px;
	height: 45px;
	border:none;
	color: #FFC045;
	border-radius: 5px;
	background: #202020;
	box-shadow:  2px 2px 5px #181818,
             	-2px -2px 5px #282828;
`

export const StyledUserName = styled.a`
color:#fbfbfb;
	font-size: 24px;
	font-weight: bold;
`

export const StyledData = styled(Timestamp)`
color:#fbfbfb;
	font-size: 10px;
	font-weight: bold;
`

export const Styledcontent = styled.h2`
	color:#fbfbfb;
	font-size: 16px;
	font-weight: 400;
		${props => props.comment && css`
    margin-left:2%;
  `}
`