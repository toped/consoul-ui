import React from 'react'
import PropTypes from 'prop-types'
import  Link from 'gatsby-link'

import { FullPageDiv } from '../components/styled-components/FullPageDiv'
import { Typography, Button } from './primitives'
import { withFirebaseAuthentication } from './hocs/withFirebaseAuthentication'

const Home = ({ user, loadingRooms }) => {

	return (
		<FullPageDiv>
			<Typography variant="h3">What you Meme?</Typography>
			<Link to="/join">
				<Button className="mb-4" >Join a Game</Button>
			</Link>
			{
				user?.hostedRoom
					?
					<Link to={`/play/${user.hostedRoom.slug}`}>
						<Button className="mb-4" loading={loadingRooms} color="SlateBlue" outline>Re-join Hosted Game</Button>
					</Link>
					:
					<Link to="/setup">
						<Button className="mb-4" loading={loadingRooms} outline>Host a Game</Button>
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
	loadingRooms: PropTypes.bool
}

export default withFirebaseAuthentication(Home)
