import React, { useEffect, useState } from 'react'
import { navigate } from 'gatsby' // to query for image data

import { useUser } from '../Context/UserProvider'


export function withAuthentication(Component) {
	return function withAuthenticationComponent(props) {
		const { user, getUserRoomData } = useUser()
		const [ calledGetUserRoomData, setCalledGetUserRoomData ] = useState(false)
		console.log('user in authentication room (check if still logged in) ->', user)

		// Redirect to login if page is protected
		useEffect(() => {
			if (user.loading && !user.signedIn) {
				navigate('/login')
			} else {
				if(!calledGetUserRoomData) {
					getUserRoomData()
					setCalledGetUserRoomData(true)
				}
			}
		})
		
		return (
			<>
				<Component {...props} />
			</>
		)
	}
}

export default withAuthentication