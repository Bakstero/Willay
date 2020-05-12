import styled, { css } from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';
import ReactModal from 'react-firebase-file-uploader'
export const WrapperContainter = styled.div`
	margin-top: 12%;
	width:100%;
	display:flex;
	align-items: center;
	justify-content: center;
`

export const MainContainer = styled.div`
	width:100%;
	height:100%;
	background: #202020;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border-radius: 15px;
`

export const Form = styled.form`
	width:100%;
	height:100%;
	text-align: center;
	border:  solid 1px  #FFC045;
	border-radius: 10px;
	outline-offset: -10px;
`

export const CommantInput = styled(TextareaAutosize)`
	width:85%;
	min-height:20px;
	overflow: hidden;
	outline: none;
	resize: none;
	border:none;
	color:white;
	background-color: #202020;
	border-bottom:solid 1px #FFC045 ;
`

export const Button = styled.button`
	width: 110px;
	height: 45px;
	color: white;
	background: none;
	border: solid 1px #FFC045;
	border-radius: 10px;
	outline:none;
	${props => props.createPost && css`
    background: none;
    color: #FFC045;
  `}
		${props => props.close && css`
			border-radius: 0px;
			border: none;
			background: none;
			width: 100%;
			height: 100vh;
			position:fixed;
			z-index:1;
  `}
`

export const ButtonsContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding: 20px 50px 0px 50px;
`

export const Img = styled.img`
	max-width:100%;
	max-height: 250px;
`

export const Modal = styled(ReactModal)`
	background-color: rgba(0,0,0,.9);
	height:100%;
	width:100%;
	outline: none;
	display:flex;
	align-items: center;
	justify-content: center;
`
