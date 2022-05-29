import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import  Link from 'gatsby-link'

import { Typography, Button } from './primitives'
import { useUser } from './Context/UserProvider'

const Home = () => {
	const {user, getUserRoomData, loadingHostedRooms, loadingPlayingRooms} = useUser()
	
	useEffect(()=> {
		getUserRoomData()
	},[user])
	
	return (
		<>
			<Typography variant="h3">What you Meme?</Typography>
			{
				user?.playingRoom
					?
					<Link to={`/play/${user?.playingRoom?.slug}`}>
						<Button className="mb-4" loading={loadingPlayingRooms} color="MediumSeaGreen" outline>Re-join Current Game</Button>
					</Link>
					:
					<Link to="/join">
						<Button className="mb-4" loading={loadingPlayingRooms}>Join a Game</Button>
					</Link>
			}

			{
				!user?.playingRoom && !user?.hostedRoom
					?
					<Link to="/setup">
						<Button className="mb-4" loading={loadingHostedRooms} outline>Host a Game</Button>
					</Link>
					: null
			}
			<Link to="/rules">
				<Button secondary outline>How to Play</Button>
			</Link>
		</>
	)
}

Home.propTypes = {
	user: PropTypes.object,
	loadingHostedRooms: PropTypes.bool,
	loadingPlayingRooms: PropTypes.bool
}

export default Home
