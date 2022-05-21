import React, { useState, useEffect } from 'react'
import { navigate } from 'gatsby' // to query for image data
import { useLazyQuery } from '@apollo/react-hooks'

import { ROOMS } from '../../../utils/graphql/queries'
import { useUser } from '../Context/UserProvider'


export function withAuthentication(Component) {
	return function withAuthenticationComponent(props) {
		const {user} = useUser()
		console.log('user in authentication room ->', user)

		// Redirect to login if page is protected
		useEffect(() => {
			if (!user.loading && !user.signedIn) {
				navigate('/login')
			}
		}, [user])
		
		return (
			<>
				<Component {...props} />
			</>
		)
	}
}

export default withAuthentication