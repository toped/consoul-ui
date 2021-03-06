import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import  Link from 'gatsby-link'

import { Typography, Button, PlayerList } from './primitives'
import { useUser } from './Context/UserProvider'
import { useRoom } from './Context/RoomProvider'

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

const Lobby = () => {

	const { user } = useUser()
	const { room, roomIncludesPlayer, addPlayer, removePlayer, startGame, deleteRoom, loadingRoomDeletion, loadingRoomUpdate, roomNotFull} = useRoom()

	useEffect(() => {
		if(!roomIncludesPlayer(user.uid) && roomNotFull()){
			addPlayer({
				displayName: user.displayName,
				email: user.email,
				photoURL: user.photoURL,
				phoneNumber: user.phoneNumber,
				uid: user.uid
			})
		}
	}, [])

	return (
		<div className="flex flex-col items-center justify-center">
			{
				!user.loading && user.signedIn
				&&
				<>
					<Typography variant="h3" weight="bold" className="m-0">Wait here for others to join...</Typography>
					<Typography variant="h5">The host will start the game soon.</Typography>
					<PlayerList players={room?.players} />
					<RoomSettings room={room} />
					<Link to="/">
						<Button className="mb-4" outline>Back to home</Button>
					</Link>
					{/* Host buttons */}
					{
						user?.uid === room?.host
							? 
							<>
								<Button className="mb-4" color="MediumSeaGreen" outline onClick={()=>startGame()}>Start game</Button>
								<Button className="mb-4" color='Crimson' outline onClick={() => deleteRoom(user?.uid)} loading={loadingRoomDeletion}>End game</Button>
							</>
							: null
					}

					{/* Player buttons */}
					<Button className="mb-4" color='Crimson' outline onClick={() => removePlayer(user)} loading={loadingRoomUpdate}>Leave game</Button>
				</>
			}
			
			{
				!user.loading && !user.signedIn &&
				<Typography variant="h3" weight="bold" className="m-0">Currntly, users are not allowed to play as guets. Please sign in to join this room.</Typography>
			}
		</div>
	)
}

Lobby.propTypes = {
}

export default Lobby
