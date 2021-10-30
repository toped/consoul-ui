import React from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import { useQuery } from '@apollo/react-hooks'
import { toaster } from 'evergreen-ui'

import SEO from '../components/seo'
import Lobby from '../components/Lobby'
import { Layout } from '../Layout'
import { withFirebaseAuthentication } from '../components/hocs/withFirebaseAuthentication'
import { ROOMS } from '../../utils/graphql/queries'
import { ROOM_SUBSCRIPTION } from '../../utils/graphql/subscriptions'

const Content = ({room, subscribeToRoomUpdates}) => (
	<>
		<SEO title="Game" />
		<Lobby
			room={room}
			subscribeToRoomUpdates={subscribeToRoomUpdates}/>
	</>
)

Content.propTypes = {
	room: PropTypes.object,
	subscribeToRoomUpdates: PropTypes.func
}


const GamePage = ({ user, signedIn, signInLoading, ...props }) => {
	if (props['*'] === '') navigate('/404')

	const {subscribeToMore,  data: roomData, loading: loadingRoom } = useQuery(ROOMS, {
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


	const subscribeToRoomUpdates = () =>
		subscribeToMore({
			document: ROOM_SUBSCRIPTION,
			variables: { slug: props['*'] },
			updateQuery: (prev, { subscriptionData }) => {
				if (!subscriptionData.data) return prev

				toaster.notify('Player joined!')

				const newRoom = subscriptionData.data.roomUpdated

				return Object.assign({}, prev, {
					rooms: [newRoom]
				})
			}
		})

	return (
		<Layout
			title="Game"
			content={!loadingRoom && roomData?.rooms[0] ? <Content room={roomData.rooms[0]} subscribeToRoomUpdates={subscribeToRoomUpdates} /> : null}
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
