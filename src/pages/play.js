import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Router } from "@reach/router";

import SEO from '../components/seo'
import withAuthentication from '../components/hocs/withAuthentication'
import { GameContextProvider } from '../components/Context/GameProvider'
import Lobby from '../components/Lobby'
import GameRoom from '../components/GameRoom'
import Lost from '../components/Lost'
import { Layout } from '../Layout'
import { useRoom } from '../components/Context/RoomProvider';
import { FullPageDiv } from '../components/styled-components';
import { useUser } from '../components/Context/UserProvider';

const Content = ({slug}) => {	
	const { room, getInitialRoomData } = useRoom()

	useEffect(() => {
		if(slug) {
			getInitialRoomData(slug)
		}
	}, [slug])

	return(
		<>
			<SEO title="Game" />
			{
				!room?.started
					?
					// render lobby
					<Lobby slug={slug} />
					:
					// render game room
					<GameContextProvider>
						<GameRoom slug={slug}/>
					</GameContextProvider>
			}
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

export default withAuthentication(GamePage)
