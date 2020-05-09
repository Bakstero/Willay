import React, { Component } from 'react'
import PostContainer from './AllPostsContainer'
import CreatePost from './CratePost'
import styled from 'styled-components'

const Wrapper = styled.div`
	margin-top:100px;
`

function PostSection() {
		return (
			< Wrapper>
				<CreatePost/>
				<PostContainer />
			</ Wrapper>
		)
}

export default PostSection
