import React, { createContext, useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useLazyQuery, useMutation } from '@apollo/react-hooks'
import { navigate } from 'gatsby'
import { toaster } from 'evergreen-ui'

import { formatters } from '../../../utils/functions'
import { ROOMS } from '../../../utils/graphql/queries'
import { CREATE_ROOM, DELETE_ROOM, UPDATE_ROOM } from '../../../utils/graphql/mutations'
import { ROOM_SUBSCRIPTION, ROOM_DELETED_SUBSCRIPTION } from '../../../utils/graphql/subscriptions'

const RoomContext = createContext()

const useRoom = () => (useContext(RoomContext))

const RoomContextProvider = ({children}) => {
	
	const [unsubscribeToRoomUpdates, setunsubscribeToRoomUpdates] = useState(null)

	useEffect(() => {
		console.log('unsubscribeToRoomUpdates is:', unsubscribeToRoomUpdates)
	}, [])

	// Queries
    const [getRooms, {subscribeToMore, data: roomData, loading: loadingRoom }] = useLazyQuery(ROOMS, {
		onCompleted: (data) => {
			const room = getRoom()
			console.log(roomData)
			console.log(`and the room is ${room}`)
			const slug = room?.slug

			if(slug && !unsubscribeToRoomUpdates) {
				console.log('Subscribing to room updates')
				const subscription1 = subscribeToRoomUpdates(slug)
				const subscription2 = subscribeToDeletion(slug)
				setunsubscribeToRoomUpdates(() => {
					return () => { subscription1(); subscription2(); }
				})
			}
		},
		onError: (err) => {
			toaster.danger(`Oops: ${formatters.extractGQLErrorMessage('RoomContextProvider.getRooms', err)}`)
		},
		fetchPolicy: 'network-only'
	})

	// Mutations
	const [createRoomMutation, {loading: loadingRoomCreation}] = useMutation(
		CREATE_ROOM, {
			onError: (err) => {
				toaster.danger(`Oops: ${formatters.extractGQLErrorMessage('RoomContextProvider.createRoomMutation', err)}`)
			}
		}
	)

	const [updateRoomMutation, { loading: loadingRoomUpdate }] = useMutation(
		UPDATE_ROOM, {
			onError: (err) => {
				toaster.danger(`Oops: ${formatters.extractGQLErrorMessage('RoomContextProvider.updateRoomMutation', err)}`)
			}
		}
	)

	const [deleteRoomMutation, {loading: loadingRoomDeletion}] = useMutation(
		DELETE_ROOM, {
			onError: (err) => {
				toaster.danger(`Oops: ${formatters.extractGQLErrorMessage('RoomContextProvider.deleteRoomMutation', err)}`)
			}
		}
	)

	// Subscriptions	
	const subscribeToDeletion = (slug) => {
		const unsubscribe = subscribeToMore({
			document: ROOM_DELETED_SUBSCRIPTION,
			variables: { slug },
			updateQuery: (prevRooms, { subscriptionData }) => {
				console.log('!! ⛔️ GOT A ROOM DELETION UPDATE ⛔️ !!')
				unsubscribe()
				toaster.danger('Room has closed!')
				
				navigate('/') 

				return Object.assign({}, prevRooms, {
					rooms: null
				})
			}
		})

		return unsubscribe
	}

	const subscribeToRoomUpdates = (slug) => {
		const unsubscribe = subscribeToMore({
			document: ROOM_SUBSCRIPTION,
			variables: { slug },
			updateQuery: (prevRooms, { subscriptionData }) => {
				console.log('!! ⭐️ GOT A ROOM UPDATE ⭐️ !!')
				if (!subscriptionData.data) return prevRooms

				//check players
				if (prevRooms.rooms[0].host !== subscriptionData.data.roomUpdated.host) {
					// get new host name
					const hostName = subscriptionData.data.roomUpdated.players.find(p => p.uid === subscriptionData.data.roomUpdated.host).displayName
					toaster.notify(`Host reassigned to ${hostName}`)
				}
				else 
				if (subscriptionData.data.roomUpdated.players) {
					if(JSON.stringify(prevRooms.rooms[0].players) !== JSON.stringify(subscriptionData.data.roomUpdated.players)){
						if (prevRooms.rooms[0].players.length < subscriptionData.data.roomUpdated.players.length) {
							toaster.notify('Player joined!')
						} else if (prevRooms.rooms[0].players.length > subscriptionData.data.roomUpdated.players.length) { 
							toaster.warning('Player left!')
						} 
					}
				}
			
				return Object.assign({}, prevRooms, {
					rooms: [subscriptionData.data.roomUpdated]
				})
			}
		})

		return unsubscribe
	}

	const getInitialRoomData = (slug) => {
		console.log('Getting initial room data')

        getRooms({
            variables: {
                slug
            }
        })		
    }

	const addPlayer = (player) => {
		
		const room = getRoom()
		if(!room) return

		updateRoomMutation(
			{
				variables: {
					room: {
						...room,
						players: [
							...room?.players,
							player
						]
					}
				}
			}
		)
	}
	
	const removePlayer = (player) => {
		const room = getRoom()
		if(!room) return

		console.log('Removing player')
		// currently assuming, player can only remove themself
		// if we were using removePlayer() to kick a player, we would need to 
		// revisit this
		console.log('unsubscribing becuase player removed')
		unsubscribe()
		
		updateRoomMutation(
			{
				variables: {
					room: {
						...room,
						players: [
							...room.players.filter(p=>p.uid !== player.uid)
						]
					}
				},
				onCompleted: () => {
					navigate('/')
				},
				fetchPolicy: 'no-cache'
			}
		)
	}

	const startGame = () => {
		
		const room = getRoom()
		if(!room) return

		updateRoomMutation(
			{
				variables: {
					room: {
						...room,
						started: true
					}
				}
			}
		)
	}

	const deleteRoom = (uid) => {
		const room = getRoom()
		if(!room) return
		
		console.log(`Deleting Room`)
		deleteRoomMutation(
			{
				variables: {
					host:  uid
				},
				update: (cache, { data }) => {
					console.log(`Delete complete - updating cache for room with slug:...${room.slug}`)
					try {
						cache.writeQuery({
							query: ROOMS,
							variables: {
								slug: room.slug
							},
							data: {
								rooms: null
							}
						})
					} catch (error) {
						console.log('error occured writing to apollo cache')
					}
				},
				onCompleted: (data) => {
					console.log('unsubscribing becuase room deleted')
					unsubscribe()
					//navigate to home
					navigate('/') 
				}
			}
		)
	}

	const createRoom = (uid, rounds, timeLimit, maxPlayers) => {
		console.log(`Creating Room`)

		createRoomMutation(
			{
				variables: {
					room: {
						host: uid,
						settings: {
							rounds,
							timeLimit,
							maxPlayers
						}
					}
				},
				onCompleted: (data) => {
					//navigate to lobby
					navigate(`/play/${data.createRoom.slug}`) 
				},
			}
		)
	}

	// Helper functions
	const getRoom = () => {
		return roomData?.rooms?.length ? roomData?.rooms[0] : null
	}

	const roomIncludesPlayer = (uid) => {
		const room = getRoom()
		if(!room) return

		return room?.players.map(p => p.uid).includes(uid)
	}

	const roomFull = () => {
		const room = getRoom()
		if(!room) return

		return room?.players.length < room?.settings.maxPlayers
	}

	const unsubscribe = () => {
		if(typeof(unsubscribeToRoomUpdates) === 'function') {
			console.log('unsubscribed')
			unsubscribeToRoomUpdates()
			setunsubscribeToRoomUpdates(null)
		}
	}

	return (
		<RoomContext.Provider value={{
			room: getRoom(), 
			getInitialRoomData, 
			subscribeToRoomUpdates, 
			subscribeToDeletion, 
			roomIncludesPlayer,
			roomFull,
			addPlayer,
			removePlayer,
			startGame,
			deleteRoom,
			createRoom,
			loadingRoomCreation,
			loadingRoomDeletion,
			loadingRoomUpdate,
			loadingRoom}}>
			{children}
		</RoomContext.Provider>
	)
}

RoomContextProvider.propTypes = {
	children: PropTypes.object
}

export { RoomContextProvider, useRoom }