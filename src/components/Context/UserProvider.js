import React, { useState, useEffect, createContext, useContext } from 'react'
import PropTypes from 'prop-types'
import { useLazyQuery } from '@apollo/react-hooks'

import { ROOMS } from '../../../utils/graphql/queries'
import User from '../../models/User'
import { useFirebase } from './FirebaseProvider'

const UserContext = createContext({})

const useUser = () => (useContext(UserContext))

const UserContextProvider = ({children}) => {
	const [user, setUser] = useState(new User())
	const { firebase } = useFirebase()

	useEffect(() => {
		if(firebase) {			
			firebase.auth.onAuthStateChanged(
				(firebaseUser) => {
					console.log('got user state change->', firebaseUser)
					setUser(new User(firebaseUser))

					if (firebaseUser && !user?.signedIn) {
						console.log('Got firebaseuser. Signing user in...')
					} 

					if (firebaseUser && user?.signedIn) {
						console.log('user already signed in... not updating')
					}

					if(!firebaseUser && !user?.signedIn) {
						console.log('user not signed in... updating')
					}
				}
			)
		} 
	}, [firebase])

	/* Side effect of getUserRoomData is that user state is modified */
	const getUserRoomData = () => {
		if(user.signedIn) {
			getUserHostedRooms({
				variables: {
					host: user.uid
				}
			})
	
			getUserPlayingRooms({
				variables: {
					playerUid: user.uid
				}
			})
		}
	}

	/* Query to check if user is hosting a room */
	const [getUserHostedRooms, { loading: loadingHostedRooms, error: roomsHostedError}] = useLazyQuery(
		ROOMS, {
			onCompleted: (data) => {
				if (data.rooms?.length > 0) {
					console.log('updating hosted room')
					setUser(prev => {
						return {
							...prev,
							hostedRoom: data.rooms[0]
						}
					})
				} else {
					console.log('user not hosting')
					setUser(prev => {
						return {
							...prev,
							hostedRoom: null
						}
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
				if (data.rooms?.length > 0) {
					console.log('updating playing room')
					setUser(prev => {
						return {
							...prev,
							playingRoom: data.rooms[0]
						}
					})
				} else {
					console.log('user not playing in any rooms')
					setUser(prev => {
						return {
							...prev,
							playingRoom: null
						}
					})
				}
			},
			fetchPolicy: 'no-cache'
		}
	)

	return (
		<UserContext.Provider value={{user, getUserRoomData, loadingHostedRooms, loadingPlayingRooms}}>
			{children}
		</UserContext.Provider>
	)
}

UserContextProvider.propTypes = {
	children: PropTypes.object
}

export { UserContextProvider, useUser }