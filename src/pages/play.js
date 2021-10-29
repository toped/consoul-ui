import React from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import { useQuery } from '@apollo/react-hooks'

import SEO from '../components/seo'
import Lobby from '../components/Lobby'
import { Layout } from '../Layout'
import { withFirebaseAuthentication } from '../components/hocs/withFirebaseAuthentication'
import { ROOMS } from '../../utils/graphql/queries'

const Content = ({room}) => (
	<>
		<SEO title="Game" />
		<Lobby room={room} />
	</>
)

Content.propTypes = {
	room: PropTypes.object
}


const GamePage = ({ user, signedIn, signInLoading, ...props }) => {
	if (props['*'] === '') navigate('/404')

	const { data: roomData, loading: loadingRoom } = useQuery(ROOMS, {
		variables: {
			slug: props['*']
		},
		onCompleted: (data) => {
			if (data.rooms.length === 0) {
				navigate('/404') // should probably have a dedicated room not found page
			}
		},
		onError: (err) => {
			console.error(err)
		}
	})

	return (
		<Layout
			title="Game"
			content={!loadingRoom && <Content room={roomData.rooms[0]} />}
			isLoading={loadingRoom}
		/>
	)
}

GamePage.propTypes = {
	'*': PropTypes.string,
	user: PropTypes.object,
	signedIn: PropTypes.bool,
	signInLoading: PropTypes.bool
}

export default withFirebaseAuthentication(GamePage)
