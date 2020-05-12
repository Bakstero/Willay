import styled, { css } from 'styled-components';
import {Link} from 'react-router-dom'
import Timestamp from 'react-timestamp'
import TextareaAutosize from 'react-textarea-autosize';
export const StyledLink = styled(Link)`
text-decoration:none;
`
export const Wrapper = styled.div`
	margin-top: 25px;
	width: 100%;
	background-color:#202020;
	border-radius: 15px;
`
export const StyledPostInfo = styled.div`
	width: 100%;
	border-radius: 10px;
	display: flex;
		padding: 12px
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
	border-radius: 0px 0px 10px 10px ;
	padding-left: 12px;
	margin-top: 24px;
	${props => props.content && css`
    	margin-top: 0px;
  `}
`

export const StyledUserIcon = styled.img`
	width: 60px;
	height: 60px;
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

export const StyledUserName = styled.span`
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
export const PostImage = styled.img`
	width: 100%;
	height:40%;
`
export const StyledContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items:center;
	margin-bottom:12px;
}
`
export const StyledCommentContainer = styled.div`
background-color: #202020;
	width:100%;
	padding-top:12px;
	border-top: solid 1px #FFC045;
	display:flex;
`
export const AvatarContainer = styled.div`

`
export const ButtonsCommentContainer = styled.div`
	padding-top:12px;
	width:100%;
	display:flex;
	justify-content: space-between;
`

export const CommentContainer = styled.div`
	width:93%;
	display:flex;
	flex-direction: column;
	justify-content: space-around;
`

export const CommantInput = styled(TextareaAutosize)`
	min-height:40px;
	overflow: hidden;
	outline: none;
	resize: none;
	background-color:#323232;
	border:1px solid rgba(255,192,69,.1);
	color:white;
`
export const Button = styled.button`
width: 75px;
height: 25px;
color: white;
background: none;
border:1px solid rgba(255,192,69,.5);
border-radius: 5px;
outline: none;
	${props => props.like && css`
		background: rgba(255,192,69,1);
		margin-bottom:12px;
  `}
`
export const AvatarImg = styled.img`
	width: 60px;
	height: 60px;
	border-radius: 50%;
		outline: none;
	@media screen and (max-width: 1024px){
		width: 40px;
		height: 40px;
	}
		${props => props.comment && css`
		width: 40px;
		height: 40px;
		margin-right:20px;
	`}
			${props => props.Usercomment && css`
		width: 40px;
		height: 40px;
  `}

`