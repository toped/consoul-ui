import React from 'react'
import { useUser } from '../components/Context/UserProvider'
import withAuthentication from '../components/hocs/withAuthentication'

import SEO from '../components/seo'
import Setup from '../components/Setup'
import { Layout } from '../Layout'

const SetupPage = () => {
	const { user } = useUser()

	return(
		<Layout
			title="Setup"
			content={
				<>
					<SEO title="Setup" />
					<Setup/>
				</>
			}
		/>
	)
}

export default withAuthentication(SetupPage)