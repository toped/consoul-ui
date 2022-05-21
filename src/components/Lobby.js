import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import  Link from 'gatsby-link'
import { useMutation } from '@apollo/react-hooks'
import { navigate } from 'gatsby'
import { toaster } from 'evergreen-ui'

import { FullPageDiv } from '../components/styled-components/FullPageDiv'
import { Typography, Button, PlayerList } from './primitives'
import { formatters } from '../../utils/functions'
import { DELETE_ROOM, UPDATE_ROOM } from '../../utils/graphql/mutations'
import { useUser } from './Context/UserProvider'

const RoomSettings = ({room}) => {

	return (
		<div className="my-4 text-center">
			{
				room?.settings && Object.keys(room?.settings).map(settingKey => {
					return <Typography key={settingKey} variant="p">{settingKey}: {room?.settings[settingKey]}</Typography>
				})
			}
		</div>
	)
}

RoomSettings.propTypes = {
	room: PropTypes.object
}

const Lobby = ({ room, subscribeToRoomUpdates, subscribeToDeletion }) => {

	const {user} = useUser()
	
	useEffect(() => {
		if (user?.uid && !room?.players.map(p => p.uid).includes(user.uid)) {
			if(room?.players.length < room?.settings.maxPlayers)
				addPlayer({
					displayName: user.displayName,
					email: user.email,
					photoURL: user.photoURL,
					phoneNumber: user.phoneNumber,
					uid: user.uid
				})
		}
		
		if (user === null || !Object.keys(user).length) {
			console.log('allow play as guest')
		}
	}, [user])

	useEffect(() => {
		console.log('lobby subscribing to room updates')
		subscribeToRoomUpdates()
		subscribeToDeletion()
	}, [])

	const [updateRoomMutation] = useMutation(
		UPDATE_ROOM, {
			onError: (err) => {
				toaster.danger(formatters.extractGQLErrorMessage(err))
			}
		}
	)

	const addPlayer = (player) => {
		console.log('mutating room from lobby')

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
		console.log('mutating room from lobby')

		updateRoomMutation(
			{
				variables: {
					room: {
						...room,
						players: [
							...room?.players.filter(p=>p.uid !== player.uid)
						]
					}
				}
			}
		)
	}

	const startGame = () => {
		console.log('mutating room from lobby')

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
				toaster.danger(formatters.extractGQLErrorMessage(err))
			}
		}
	)

	const deleteRoom = () => {
		deleteRoomMutation(
			{
				variables: {
					host:  user.uid
				}
			}
		)
	}

	return (
		<FullPageDiv>
			<Typography variant="h3" weight="bold" className="m-0">Wait here for others to join...</Typography>
			<Typography variant="h5">The host will start the game soon.</Typography>
			<PlayerList players={room?.players} />
			<RoomSettings room={room} />
			<Link to="/">
				<Button className="mb-4" outline>Back to home</Button>
			</Link>
			{
				user?.uid === room?.host
					? <Button className="mb-4" color="MediumSeaGreen" outline onClick={()=>startGame()}>Start Game</Button>
					: null
			}
			{
				user?.uid === room?.host
					? <Button className="mb-4" color='Crimson' outline onClick={deleteRoom} loading={loadingRoomDeletion}>End game</Button>
					: <Button className="mb-4" color='Crimson' outline onClick={()=>removePlayer({uid:user?.uid})} loading={loadingRoomDeletion}>Leave game</Button>
			}
		</FullPageDiv>
	)
}

Lobby.propTypes = {
	room: PropTypes.object,
	user: PropTypes.object,
	subscribeToRoomUpdates: PropTypes.func,
	subscribeToDeletion: PropTypes.func
}

export default Lobby
