import React from 'react'
import SEO from '../components/seo'

import Lobby from '../components/Lobby'
import { Layout } from '../Layout'

const LobbyPage = () => ( 
	<Layout
		title="Join Game"
		content={
			<>
				<SEO title="Join Game" />
				<Lobby/>
			</>
		}
	/>
)

export default LobbyPage
