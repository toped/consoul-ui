import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import  Link from 'gatsby-link'

import { FullPageDiv } from '../components/styled-components/FullPageDiv'
import { Typography, Button } from './primitives'
import { useUser } from './Context/UserProvider'

const Home = () => {
	useEffect(()=> {
		getUserRoomData(user?.uid)
	},[])

	const {user, getUserRoomData, loadingHostedRooms, loadingPlayingRooms} = useUser()
	
	return (
		<FullPageDiv>
			<Typography variant="h3">What you Meme?</Typography>
			{
				user?.playingRoom
					?
					<Link to={`/play/${user.playingRoom.slug}`}>
						<Button className="mb-4" loading={loadingHostedRooms} color="MediumSeaGreen" outline>Re-join Current Game</Button>
					</Link>
					:
					<Link to="/join">
						<Button className="mb-4" loading={loadingPlayingRooms}>Join a Game</Button>
					</Link>
			}

			{
				user?.hostedRoom
					?
					<Link to={`/play/${user.hostedRoom.slug}`}>
						<Button className="mb-4" loading={loadingHostedRooms} color="SlateBlue" outline>Re-join Hosted Game</Button>
					</Link>
					:
					<Link to="/setup">
						<Button className="mb-4" loading={loadingHostedRooms} outline>Host a Game</Button>
					</Link>
			}
			<Link to="/rules">
				<Button secondary outline>How to Play</Button>
			</Link>
		</FullPageDiv>
	)
}

Home.propTypes = {
	user: PropTypes.object,
	loadingHostedRooms: PropTypes.bool,
	loadingPlayingRooms: PropTypes.bool
}

export default Home
