import React from 'react'
import SEO from '../components/seo'

import Rules from '../components/Rules'
import { Layout } from '../Layout'

const Content = () => (
	<>
		<SEO title="Rules" />
		<Rules/>
	</>
)


const RulesPage = () => ( 
	<Layout
		title="Rules"
		content={<Content/>}
	/>
)

export default RulesPage
