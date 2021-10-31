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
import { ROOM_SUBSCRIPTION, ROOM_DELETED_SUBSCRIPTION } from '../../utils/graphql/subscriptions'

const Content = ({room, subscribeToRoomUpdates, subscribeToDeletion}) => (
	<>
		<SEO title="Game" />
		<Lobby
			room={room}
			subscribeToRoomUpdates={subscribeToRoomUpdates}
			subscribeToDeletion={subscribeToDeletion}
		/>
	</>
)

Content.propTypes = {
	room: PropTypes.object,
	subscribeToRoomUpdates: PropTypes.func,
	subscribeToDeletion: PropTypes.func
}


const GamePage = ({ user, signedIn, signInLoading, ...props }) => {
	if (props['*'] === '') navigate('/404')

	const {subscribeToMore,  data: roomData, loading: loadingRoom } = useQuery(ROOMS, {
		variables: {
			slug: props['*']
		},
		onCompleted: (data) => {
			console.log('completed room fetch')
			console.log(data)
			if (data.rooms.length === 0) {
				navigate('/404') // should probably have a dedicated room not found page
			}
		},
		onError: (err) => {
			console.error(err)
		},
		fetchPolicy: 'network-only'
	})

	const subscribeToDeletion = () => {
		subscribeToMore({
			document: ROOM_DELETED_SUBSCRIPTION,
			variables: { slug: props['*'] },
			updateQuery: (prev) => {
				
				navigate('/') 
				toaster.danger('Game room closed!')

				return Object.assign({}, prev, {
					rooms: null
				})
			}
		})
	}

	const subscribeToRoomUpdates = () =>
		subscribeToMore({
			document: ROOM_SUBSCRIPTION,
			variables: { slug: props['*'] },
			updateQuery: (prev, { subscriptionData }) => {

				console.log(subscriptionData)
				if (!subscriptionData.data) return prev
				
				// check players
				if(JSON.stringify(prev.rooms[0].players) !== JSON.stringify(subscriptionData.data.roomUpdated.players)){
					toaster.notify('Player joined!')
				}

				return Object.assign({}, prev, {
					rooms: [subscriptionData.data.roomUpdated]
				})
			}
		})

	return (
		<Layout
			title="Game"
			content={
				!loadingRoom && Array.isArray(roomData?.rooms) && roomData?.rooms.length
					? <Content
						room={roomData.rooms[0]}
						subscribeToRoomUpdates={subscribeToRoomUpdates}
						subscribeToDeletion={subscribeToDeletion}
					/>
					: null}
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
