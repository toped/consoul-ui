import React from 'react'
import SEO from '../components/seo'

import Join from '../components/Join'
import { Layout } from '../Layout'

const JoinPage = () => ( 
	<Layout
		title="Join Game"
		content={
			<>
				<SEO title="Join Game" />
				<Join/>
			</>
		}
	/>
)

export default JoinPage
