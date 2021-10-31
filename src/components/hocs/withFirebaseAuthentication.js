import React, { useState, useContext, useEffect } from 'react'
import { navigate } from 'gatsby' // to query for image data
import { useLocation } from '@reach/router'
import { useLazyQuery } from '@apollo/react-hooks'

import { FirebaseContext } from '../Firebase'
import { ROOMS } from '../../../utils/graphql/queries'


export function withFirebaseAuthentication(Component) {
	return function withFirebaseAuthenticationComponent(props) {
		const { firebase } = useContext(FirebaseContext)
		const [signedIn, setSignedIn] = useState(false)
		const [loading, setLoading] = useState(true)
		const [user, setUser] = useState({})
		const location = useLocation()
		
		const protectedPages = ['/setup']

		// Redirect to login if page is protected
		useEffect(() => {
			if (!loading && !signedIn && protectedPages.includes(location.pathname)) {
				navigate('/login')
			}
		}, [signedIn, loading])
		
		// Redirect to room if user is hosting a room
		useEffect(() => {
			if (user?.uid) {
				getUserHostedRooms({
					variables: {
						host: user?.uid
					}
				})

				getUserPlayingRooms({
					variables: {
						playerUid: user?.uid
					}
				})
			}
		}, [user])
		

		/* Query to check if user is hosting a room */
		const [getUserHostedRooms, { loading: loadingHostedRooms, error: roomsHostedError}] = useLazyQuery(
			ROOMS, {
				onCompleted: (data) => {
					// check if hostedRoom exists to avoid subsequent updates to state
					if (!user.hostedRoom && data.rooms.length > 0) {
						setUser({
							...user,
							hostedRoom: data.rooms[0]
						})
					}
				},
				fetchPolicy: 'no-cache'
			}
		)

		/* Query to check if user is already playing in a room */
		const [getUserPlayingRooms, {loading: loadingPlayingRooms, error: roomsPlayingError}] = useLazyQuery(
			ROOMS, {
				onCompleted: (data) => {
					// check if hostedRoom exists to avoid subsequent updates to state
					if (!user.playingRoom && data.rooms.length > 0) {
						setUser({
							...user,
							playingRoom: data.rooms[0]
						})
					}
				},
				fetchPolicy: 'no-cache'
			}
		)
		
		useEffect(() => {
			if(firebase) {			
				firebase.auth.onAuthStateChanged(
					(user) => {
						setSignedIn(Boolean(user))
						setLoading(false)
						setUser(user)
					}
				)
			} 
		}, [firebase])
		
		return (
			<>
				<Component
					{...props}
					signedIn={signedIn} 
					signInLoading={loading}
					loadingHostedRooms={loadingHostedRooms}
					loadingPlayingRooms={loadingPlayingRooms}
					user={user}
				/>
			</>
		)
	}
}

export default withFirebaseAuthentication