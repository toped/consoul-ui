import React, { useEffect, useState } from 'react'
import { navigate } from 'gatsby' // to query for image data

import { useUser } from '../Context/UserProvider'


export function withAuthentication(Component) {
	return function withAuthenticationComponent(props) {
		const { getCurrentUser } = useUser()

		// Redirect to login if page is protected
		useEffect(async () => {
			const user = await getCurrentUser()
			if (user.loading && !user.signedIn) {
				navigate('/login')
			} 
		}, [])
		
		return (
			<>
				<Component {...props} />
			</>
		)
	}
}

export default withAuthentication