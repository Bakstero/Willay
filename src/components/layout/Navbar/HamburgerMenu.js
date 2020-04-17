import React, { Component } from 'react'
import styled from 'styled-components';
import MobileMenu from './MobileMenu'

const HamburgerDiv = styled.div`
	display: none;
	background: none;
	width:40px;
	@media screen and (max-width: 968px){
			display:inline ;
	}
`
const HamburgerCloseDiv = styled.div`
	display: none;
	background: none;
	width:40px;
	margin-top:2%;
	margin-left: 9%;
	@media screen and (max-width: 968px){
			display:inline ;
	}
`

const Hamburger = styled.div`
	width: 35px;
	height:3px;
	background-color: white;
	margin:6px 0px 0px 20px;
`

const MobileNav = styled.div`
	display: flex;
	flex-direction: column;;
	width: 100%;
	height: 100vh;
	z-index: 99;
	position: fixed;
	background-color: #181818;
	left: 0;
	top:0;
`

export class HamburgerMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
		HamburgerButton: false,
		}
	}

	handleOpenNav = () => {
		this.setState({
			HamburgerButton: true
		})
	}

	handleCloseBar = () => {
		this.setState({
			HamburgerButton: false
		})
	}


	render() {
		return (
			<>
				{this.state.HamburgerButton === false
					?
					<HamburgerDiv onClick={this.handleOpenNav} >
						<Hamburger />
						<Hamburger />
						<Hamburger />
					</HamburgerDiv>
					:
					< MobileNav >
						<HamburgerCloseDiv onClick={this.handleCloseBar} >
								<Hamburger />
								<Hamburger />
								<Hamburger />
							</HamburgerCloseDiv>
							<MobileMenu />
					</MobileNav >
				}
			</>
		)
	}
}

export default HamburgerMenu


