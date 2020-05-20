import React, {useRef, useEffect} from 'react'
import { ReactComponent as WelcomeUserImg} from '../Static/Images/WelcomeUser.svg'
import gsap from 'gsap'

function WelcomeContainer() {
	const wrapper = useRef(null)

	useEffect(()=> {
		const [elements] = wrapper.current.children

		const characters = elements.getElementById('Characters')
		const button = elements.getElementById('Button')
		const browser = elements.getElementById('browser')
		const touch = elements.getElementById('Touch')
		const group = elements.getElementById('Group')
		const text = elements.getElementById('text')
		const line = elements.getElementById('Line')
		const pageContent = elements.getElementById('pageContent')
		const outsiteContainerUp = elements.getElementById('outsiteContainerUp')
		const outsiteContainerDown = elements.getElementById('outsiteContainerDown')

		gsap.set([characters, button, browser, touch, group, text, line, pageContent, outsiteContainerUp, outsiteContainerDown], {autoAlpha: 0});
		const tl = gsap.timeline({defaults: {ease: 'power3.inOut'}});

		gsap.set(touch, {transformOrigin: '50% 50%'})

		tl.fromTo(button, {x: '-300'},{duration: 0.5, x: '+=300', autoAlpha: 1})
		tl.to(characters, {duration: 0.5, autoAlpha: 1})
		tl.to(browser, { duration: 0.5, autoAlpha: 1 })
		tl.fromTo(text, { x: '-100' }, { duration: 0.5, x: '+=100', autoAlpha: 1 })
		tl.fromTo(line, { x: '-50' }, { duration: 0.5, x: '+=50', autoAlpha: 1 }, '=-0.6')
		tl.fromTo(pageContent, { x: '-100' }, { duration: 0.5, x: '+=100', autoAlpha: 1 }, '=-0.6')
		tl.fromTo(outsiteContainerUp, { y: '100' }, { duration: 0.5, y: '-=100', autoAlpha: 1 }, '=-0.1')
		tl.fromTo(outsiteContainerDown, { y: '-100' }, { duration: 0.5, y: '+=100', autoAlpha: 1 }, '=-0.5')
		tl.fromTo(touch,{scale: 0.5},{duration: 0.5, scale: 1, autoAlpha:1})
	})

	return (
		<div ref={wrapper}>
			<WelcomeUserImg />
		</div>
	)
}

export default WelcomeContainer
