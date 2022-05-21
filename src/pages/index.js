import React from 'react'

import SEO from '../components/seo'
import Home from '../components/Home'
import { Layout } from '../Layout'


const IndexPage = () => ( 
	<Layout
		title="Home"
		content={
			<>
				<SEO title="Home" />
				<Home/>
			</>
		}
	/>
)

export default IndexPage