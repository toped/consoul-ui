import React, { createContext, useContext } from 'react'
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

    const getInitialRoomData = (slug) => {
        getRooms({
            variables: {
                slug
            }
        })
    }

    const [getRooms, {subscribeToMore, data: roomData, loading: loadingRoom }] = useLazyQuery(ROOMS, {
		onError: (err) => {
			console.error(err)
		},
		fetchPolicy: 'network-only'
	})

	const subscribeToDeletion = (slug) => {
		subscribeToMore({
			document: ROOM_DELETED_SUBSCRIPTION,
			variables: { slug },
			updateQuery: (prevRooms) => {
				navigate('/') 
				toaster.danger('Game has ended!')

				return Object.assign({}, prevRooms, {
					rooms: null
				})
			}
		})
	}

	const subscribeToRoomUpdates = (slug) =>
		subscribeToMore({
			document: ROOM_SUBSCRIPTION,
			variables: { slug },
			updateQuery: (prevRooms, { subscriptionData }) => {

				if (!subscriptionData.data) return prevnuRooms
				
				//check players
				if (prevRooms.rooms[0].host !== subscriptionData.data.roomUpdated.host) {
					toaster.notify('Host reassigned!')
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

	const roomIncludesPlayer = (uid) => {
		if(!roomData) return
		const room = roomData.rooms[0]
		return room?.players.map(p => p.uid).includes(uid)
	}

	const roomFull = () => {
		if(!roomData) return
		const room = roomData.rooms[0]
		return room?.players.length < room?.settings.maxPlayers
	}

	const [updateRoomMutation, { loading: loadingRoomUpdate }] = useMutation(
		UPDATE_ROOM, {
			onError: (err) => {
				toaster.danger(`Oops: ${formatters.extractGQLErrorMessage(err)}`)
			}
		}
	)

	const addPlayer = (player) => {
		
		if(!roomData) return

		const room = roomData.rooms[0]

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
		
		if(!roomData) return

		const room = roomData.rooms[0]

		// check if player to be removed is host
		if(room.host === player.uid) {
			tryReassignRoomHost(player.uid)
		}

		// TODO: Check if game can continue with current number of players
		console.log('removing player...')
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
				}
			}
		)
	}

	const startGame = () => {
		
		if(!roomData) return

		const room = roomData.rooms[0]

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

	const [deleteRoomMutation, {loading: loadingRoomDeletion}] = useMutation(
		DELETE_ROOM, {
			onCompleted: (data) => {
				//navigate to home
				navigate('/') 
			},
			onError: (err) => {
				toaster.danger(`Oops: ${formatters.extractGQLErrorMessage(err)}`)
			}
		}
	)

	const deleteRoom = (uid) => {
		deleteRoomMutation(
			{
				variables: {
					host:  uid
				}
			}
		)
	}

	/**
	 * Used when curren host needs to sign out and leave game
	 * @param {User} currentHost 
	 */
	const tryReassignRoomHost = (currentHostId) => {
		console.log('Attemptng to reassign host')
		console.log('Host to be reassigned->', currentHostId)
		const room = roomData.rooms[0]
		let potentialHostList = room.players.filter(p => p.uid !== currentHostId)
		
		console.log('potentialHostList->', potentialHostList)

		
		potentialHostList[0] = {
			...potentialHostList[0],
			isHost: true
		}

		let newPlayerList = potentialHostList

		console.log('newplayerlist->', newPlayerList)
		if(newPlayerList.length <= 2){
			toaster.warning('Host left! Not enough players to continue... 😢')
			deleteRoom(room.host)
		} else {
			updateRoomMutation(
				{
					variables: {
						room: {
							...room,
							host: newPlayerList[0].uid,
							players: newPlayerList
						}
					},
					onCompleted: () => {
						navigate('/')
					}
				}
			)
		}
	}

	const [createRoomMutation, {loading: loadingRoomCreation}] = useMutation(
		CREATE_ROOM, {
			onCompleted: (data) => {
				//navigate to lobby
				navigate(`/play/${data.createRoom.slug}`) 
			},
			onError: (err) => {
				toaster.danger(`Oops: ${formatters.extractGQLErrorMessage(err)}`)
			}
		}
	)

	const createRoom = (uid, rounds, timeLimit, maxPlayers) => {
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
				}
			}
		)
	}

	return (
		<RoomContext.Provider value={{
			roomData, 
			getInitialRoomData, 
			subscribeToRoomUpdates, 
			subscribeToDeletion, 
			roomIncludesPlayer,
			roomFull,
			addPlayer,
			removePlayer,
			startGame,
			deleteRoom,
			tryReassignRoomHost,
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