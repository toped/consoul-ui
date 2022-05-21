import React from 'react'
import SEO from '../components/seo'

import Rules from '../components/Rules'
import { Layout } from '../Layout'

const RulesPage = () => ( 
	<Layout
		title="Rules"
		content={
			<>
				<SEO title="Rules" />
				<Rules/>
			</>
		}
	/>
)

export default RulesPage
