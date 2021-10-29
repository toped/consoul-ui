import React from 'react'
import PropTypes from 'prop-types'
import  Link from 'gatsby-link'
import { useMutation } from '@apollo/react-hooks'
import { navigate } from 'gatsby'
import { toaster } from 'evergreen-ui'

import { FullPageDiv } from '../components/styled-components/FullPageDiv'
import { Typography, Button, PlayerList } from './primitives'
import { formatters } from '../../utils/functions'
import { withFirebaseAuthentication } from './hocs/withFirebaseAuthentication'
import { DELETE_ROOM } from '../../utils/graphql/mutations'

const RoomSettings = ({room}) => {

	return (
		<>
			{
				room?.settings && Object.keys(room.settings).map(settingKey => {
					return <Typography key={settingKey} variant="p">{settingKey}: {room?.settings[settingKey]}</Typography>
				})
			}
		</>
	)
}

RoomSettings.propTypes = {
	room: PropTypes.object
}

const Lobby = ({ user, room }) => {
	
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
			<Typography variant="h3">Wait here for host to start game...</Typography>
			<RoomSettings room={room} />
			<PlayerList />
			<Link to="/">
				<Button className="mb-4" outline>Back to home</Button>
			</Link>
			{
				user.uid === room?.host
					? <Button className="mb-4" color='Crimson' outline onClick={deleteRoom} loading={loadingRoomDeletion}>End game</Button>
					: null
			}
		</FullPageDiv>
	)
}

Lobby.propTypes = {
	room: PropTypes.object,
	user: PropTypes.object
}

export default withFirebaseAuthentication(Lobby)
