import React from 'react'
import SEO from '../components/seo'

import Login from '../components/Login'
import { Layout } from '../Layout'

const LoginPage = () => ( 
	<Layout
		title="Login"
		content={
			<>
				<SEO title="Login" />
				<Login/>
			</>
		}
	/>
)

export default LoginPage
