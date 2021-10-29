import React from 'react'

import SEO from '../components/seo'
import Setup from '../components/Setup'
import { Layout } from '../Layout'

const Content = () => (
	<>
		<SEO title="Setup" />
		<Setup/>
	</>
)


const SetupPage = () => ( 
	<Layout
		title="Setup"
		content={<Content/>}
	/>
)

export default SetupPage