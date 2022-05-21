import React, { createContext, useContext } from 'react'
import PropTypes from 'prop-types'
import { useLazyQuery } from '@apollo/react-hooks'
import { navigate } from 'gatsby'
import { toaster } from 'evergreen-ui'

import { ROOMS } from '../../../utils/graphql/queries'
import { ROOM_SUBSCRIPTION, ROOM_DELETED_SUBSCRIPTION } from '../../../utils/graphql/subscriptions'

const RoomContext = createContext()

const useRoom = () => (useContext(RoomContext))

const RoomContextProvider = ({children}) => {

    const getInitialRoomData = (slug) => {
        getRooms({
            variables: {
                slug
            }
        })
    }

    const [getRooms, {subscribeToMore, data: roomData, loading: loadingRoom }] = useLazyQuery(ROOMS, {
		onCompleted: (data) => {
			if (roomData === undefined && data.rooms.length === 0) {
				navigate('/lost') // should probably have a dedicated room not found page (404 page)
			} 
		},
		onError: (err) => {
			console.error(err)
		},
		fetchPolicy: 'network-only'
	})

	const subscribeToDeletion = (slug) => {
		subscribeToMore({
			document: ROOM_DELETED_SUBSCRIPTION,
			variables: { slug },
			updateQuery: (prev) => {
				navigate('/') 
				toaster.danger('Game room closed!')

				return Object.assign({}, prev, {
					rooms: null
				})
			}
		})
	}

	const subscribeToRoomUpdates = (slug) =>
		subscribeToMore({
			document: ROOM_SUBSCRIPTION,
			variables: { slug },
			updateQuery: (prev, { subscriptionData }) => {

				if (!subscriptionData.data) return prev
				
				// check players
				if (prev.rooms[0].host !== subscriptionData.data.roomUpdated.host) {
					toaster.notify('Host reassigned!')
				}
				else if(JSON.stringify(prev.rooms[0].players) !== JSON.stringify(subscriptionData.data.roomUpdated.players)){
					if (prev.rooms[0].players.length < subscriptionData.data.roomUpdated.players.length) {
						toaster.notify('Player joined!')
					} else {
						toaster.warning('Player left!')
					}
				}
			
				return Object.assign({}, prev, {
					rooms: [subscriptionData.data.roomUpdated]
				})
			}
	})

	return (
		<RoomContext.Provider value={{roomData, getInitialRoomData, subscribeToRoomUpdates, subscribeToDeletion, loadingRoom}}>
			{children}
		</RoomContext.Provider>
	)
}

RoomContextProvider.propTypes = {
	children: PropTypes.object
}

export { RoomContextProvider, useRoom }