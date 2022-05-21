import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Router } from "@reach/router";
import withAuthentication from '../components/hocs/withAuthentication'

import SEO from '../components/seo'
import Lobby from '../components/Lobby'
import GameRoom from '../components/GameRoom'
import Lost from '../components/Lost'
import { Layout } from '../Layout'
import { useRoom } from '../components/Context/RoomProvider';
import { FullPageDiv } from '../components/styled-components';

const Content = ({slug}) => {	
	const { roomData, getInitialRoomData, subscribeToRoomUpdates, subscribeToDeletion, loadingRoom} = useRoom()
	
	useEffect(() => {
		getInitialRoomData(slug)
	},[])

	return(
		<>
			<SEO title="Game" />
			<FullPageDiv>
			{
				!loadingRoom && Array.isArray(roomData?.rooms) && roomData?.rooms.length ? 
					!roomData.rooms[0].started
						?
						// render lobby
						<Lobby
							room={roomData.rooms[0]}
							subscribeToRoomUpdates={() => subscribeToRoomUpdates(slug)}
							subscribeToDeletion={() => subscribeToDeletion(slug)}
						/>
						:
						// render game room
						<GameRoom
							room={roomData.rooms[0]}
							subscribeToRoomUpdates={() => subscribeToRoomUpdates(slug)}
							subscribeToDeletion={() => subscribeToDeletion(slug)}
						/>
					: null
			}
			</FullPageDiv>
		</>
	)
}

Content.propTypes = {
	room: PropTypes.object,
	subscribeToRoomUpdates: PropTypes.func,
	subscribeToDeletion: PropTypes.func
}


const GamePage = () => {	

	const { loadingRoom } = useRoom()

	return (
		<Layout
			title="Game"
			content={
				<Router>
					<Lost path="/play/"/>
					<Content path="/play/:slug"/>
				</Router>
				}
			loading={loadingRoom}
		/>
	)
}

GamePage.propTypes = {

}

export default withAuthentication(GamePage)
