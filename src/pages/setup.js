import React from 'react'
import { useUser } from '../components/Context/UserProvider'
import withAuthentication from '../components/hocs/withAuthentication'

import SEO from '../components/seo'
import Setup from '../components/Setup'
import { Layout } from '../Layout'

const Content = () => (
	<>
		<SEO title="Setup" />
		<Setup/>
	</>
)


const SetupPage = () => {
	const { user } = useUser()

	return(
		<Layout
			title="Setup"
			content={<Content/>}
		/>
	)
}

export default withAuthentication(SetupPage)