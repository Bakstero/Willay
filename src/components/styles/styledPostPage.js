import styled, {css} from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';
import Timestamp from 'react-timestamp'
export const Wrapper = styled.div`
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,.8);
	position:fixed;
	overflow-y: auto;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 999;
`

export const BackDiv = styled.div`
	border-radius: 0px;
	border: none;
	background: none;
	width: 100%;
	height: 100vh;
	position:fixed;
	z-index:1;
			@media screen and (max-width: 1024px){
			display:none;
	}
`

export const Postdiv = styled.div`
	height:100%;
	background-color: #202020;
	width:50%;
	display: flex;
	flex-direction: column;
		z-index: 999;
		@media screen and (max-width: 1024px){
			width:100%
	}

`
export const AvatarImg = styled.img`
	width: 60px;
	border-radius: 50%;
		outline: none;
	@media screen and (max-width: 1024px){
		width: 40px;
	}
		${props => props.comment && css`
		width: 40px;
		margin-right:20px;
	`}
			${props => props.Usercomment && css`
		width: 40px;
  `}

`

export const StyledPostInfo = styled.div`
	width: 100%;
	border-radius: 10px;
	display: flex;
`
export const StyledInfoContainer = styled.div`
	margin-left:12px;
	display:flex;
	flex-direction: column;
`

export const StyledUserName = styled.a`
color:#fbfbfb;
	font-size: 24px;
	font-weight: bold;
		${props => props.comment && css`
    font-size: 18px;
  `}
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
export const StyledStatContainer = styled.div`
	width:100%;
	border-top: solid 1px #FFC045;
	background-color: #202020;
	display:flex;
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
export const StyledSpan = styled.span`
	margin:12px 0px 12px 0px;
	${props => props.commentTag && css`
    color:#FFC045
  `}
`

export const CommentsContainter = styled.div`
	background-color: #202020;
	display:flex;
	flex-direction:column;
`

export const StyledCommentsInfo = styled.div`
	background-color: #202020;
	border-top: solid 1px #FFC045;
	height:100%;
	display: flex;
	flex-direction: row;
	margin-top: auto;
	padding-top: 12px;
`
export const PostImage = styled.img`
	width: 100%;
`