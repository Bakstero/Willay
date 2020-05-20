import React, { useRef, useEffect } from 'react'
import { ReactComponent as ErrorImg } from '../Static/Images/ERROR.svg'
import gsap from 'gsap'

function ErrorImage() {
	const wrapper = useRef(null)

	useEffect(() => {
		const [elements] = wrapper.current.children

		const Nature = elements.getElementById('Nature')
		const littleNature = elements.getElementById('littleNature')
		const numberShadow = elements.getElementById('numberShadow')
		const numbers = elements.getElementById('numbers')

		gsap.set([Nature, littleNature, numberShadow, numbers], { autoAlpha: 0 });
		const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } });

		tl.fromTo(numberShadow, { y: '-100' }, { duration: 0.5, y: '+=100', autoAlpha: 1 })
		tl.fromTo(numbers, { y: '-100' }, { duration: 0.5, y: '+=100', autoAlpha: 1 }, '=-0.3')
		tl.to(Nature, { duration: 1, autoAlpha: 1 })
		tl.to(littleNature, { duration: 2, autoAlpha: 1 })
	})

	return (
		<div ref={wrapper}>
			<ErrorImg />
		</div>
	)
}

export default ErrorImage
