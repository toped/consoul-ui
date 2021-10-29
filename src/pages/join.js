import React from 'react'
import SEO from '../components/seo'

import Join from '../components/Join'
import { Layout } from '../Layout'

const Content = () => (
	<>
		<SEO title="Join Game" />
		<Join/>
	</>
)


const JoinPage = () => ( 
	<Layout
		title="Join Game"
		content={<Content/>}
	/>
)

export default JoinPage
