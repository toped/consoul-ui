import React from 'react'
import SEO from '../components/seo'

import Lobby from '../components/Lobby'
import { Layout } from '../Layout'

const Content = () => (
	<>
		<SEO title="Join Game" />
		<Lobby/>
	</>
)


const LobbyPage = () => ( 
	<Layout
		title="Join Game"
		content={<Content/>}
	/>
)

export default LobbyPage
