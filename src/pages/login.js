import React from 'react'
import SEO from '../components/seo'

import Login from '../components/Login'
import { Layout } from '../Layout'

const Content = () => (
	<>
		<SEO title="Login" />
		<Login/>
	</>
)


const LoginPage = () => ( 
	<Layout
		title="Login"
		content={<Content/>}
	/>
)

export default LoginPage
