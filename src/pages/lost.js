import React from 'react'

import Lost from '../components/Lost'
import { Layout } from '../Layout'

const SetupPage = () => ( 
	<Layout
		title="Lost?"
		content={<Lost/>}
	/>
)

export default SetupPage