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
import { useUser } from '../components/Context/UserProvider';

const Content = ({slug}) => {	
	const { roomData, getInitialRoomData, subscribeToRoomUpdates, subscribeToDeletion, loadingRoom} = useRoom()
	const room = roomData?.rooms.length ? roomData?.rooms[0] : null

	useEffect(() => {
		getInitialRoomData(slug)

		console.log('Subscribing to room updates')
		subscribeToRoomUpdates(slug)
		subscribeToDeletion(slug)
	},[])

	return(
		<>
			<SEO title="Game" />
			<FullPageDiv>
			{
				!room?.started
					?
					// render lobby
					<Lobby slug={slug} />
					:
					// render game room
					<GameRoom slug={slug}
					/>
			}
			</FullPageDiv>
		</>
	)
}

Content.propTypes = {
	slug: PropTypes.string
}


const GamePage = () => {	

	const { loadingRoom } = useRoom()
	const { user } = useUser()

	return (
		<Layout
			title="Game"
			content={
				<Router>
					<Lost path="/play/"/>
					<Content path="/play/:slug"/>
				</Router>
				}
			isLoading={loadingRoom || user.loading}
		/>
	)
}

GamePage.propTypes = {

}

export default GamePage
