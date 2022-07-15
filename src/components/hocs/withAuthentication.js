import React, { useEffect, useState } from 'react'
import { navigate } from 'gatsby' // to query for image data

import { useUser } from '../Context/UserProvider'


export function withAuthentication(Component) {
	return function withAuthenticationComponent(props) {
		const { getCurrentUser, getUserRoomData } = useUser()
		const [ calledGetUserRoomData, setCalledGetUserRoomData ] = useState(false)

		// Redirect to login if page is protected
		useEffect(async () => {
			const user = await getCurrentUser()
			console.log('user in authentication room (check if still logged in) ->', user)

			if (user.loading && !user.signedIn) {
				navigate('/login')
			} else {
				if(!calledGetUserRoomData) {
					getUserRoomData()
					setCalledGetUserRoomData(true)
				}
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