import React, { Component } from 'react'
import PostsContainer from './PostsContainer'
import CreatePost from './CratePost'
import styled from 'styled-components';

const Wrapper = styled.div`
	margin-top:100px;
`

export class PostSection extends Component {
	render() {
		return (
			< Wrapper>
				<CreatePost/>
				<PostsContainer />
			</ Wrapper>
		)
	}
}

export default PostSection
