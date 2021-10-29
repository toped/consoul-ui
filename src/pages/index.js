import React from 'react'

import SEO from '../components/seo'
import Home from '../components/Home'
import { Layout } from '../Layout'

const Content = () => (
	<>
		<SEO title="Home" />
		<Home/>
	</>
)


const IndexPage = () => ( 
	<Layout
		title="Home"
		content={<Content/>}
	/>
)

export default IndexPage