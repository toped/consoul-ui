import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import  Link from 'gatsby-link'
import { useMutation } from '@apollo/react-hooks'
import { navigate } from 'gatsby'
import { toaster } from 'evergreen-ui'

import { FullPageDiv } from '../components/styled-components/FullPageDiv'
import { Typography, Button, PlayerList } from './primitives'
import { formatters } from '../../utils/functions'
import { withFirebaseAuthentication } from './hocs/withFirebaseAuthentication'
import { DELETE_ROOM, UPDATE_ROOM } from '../../utils/graphql/mutations'

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

const Lobby = ({ user, room, subscribeToRoomUpdates, subscribeToDeletion }) => {

	useEffect(() => {
		if (user?.uid && !room?.players.map(p=>p.uid).includes(user.uid)) {
			addPlayer({
				displayName: user.displayName,
				email: user.email,
				photoURL: user.photoURL,
				phoneNumber: user.phoneNumber,
				uid: user.uid
			})
		}
		
		if (user === null) {
			console.log('allow play as guest')
		}
	}, [user])

	useEffect(() => {
		console.log('subscribing to room updates')
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
					? <Button className="mb-4" color='Crimson' outline onClick={deleteRoom} loading={loadingRoomDeletion}>End game</Button>
					: null
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

export default withFirebaseAuthentication(Lobby)
