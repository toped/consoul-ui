import React, { useState } from 'react'
import PropTypes from 'prop-types'
import  Link from 'gatsby-link'
import { useStaticQuery, graphql, navigate } from 'gatsby' // to query for image data
import { useMutation } from '@apollo/react-hooks'
import { toaster } from 'evergreen-ui'

import CategoryList from './primitives/CategoryList'
import { FullPageDiv } from '../components/styled-components/FullPageDiv'
import { Typography, SegmentedControl, Button } from './primitives'
import { formatters } from '../../utils/functions'
import { CREATE_ROOM } from '../../utils/graphql/mutations'
import { useUser } from './Context/UserProvider'

const Setup = () => {

	const [rounds, setRounds] = useState(5)
	const [timeLimit, setTimeLimit] = useState(30)
	const [maxPlayers, setMaxPlayers] = useState(5)
	const {user} = useUser()
	
	const [createRoomMutation, {loading: loadingRoomCreation}] = useMutation(
		CREATE_ROOM, {
			onCompleted: (data) => {
				//navigate to lobby
				navigate(`/play/${data.createRoom.slug}`) 
			},
			onError: (err) => {
				toaster.danger(formatters.extractGQLErrorMessage(err))
			}
		}
	)

	const createRoom = () => {
		createRoomMutation(
			{
				variables: {
					room: {
						host: user.uid,
						settings: {
							rounds,
							timeLimit,
							maxPlayers
						}
					}
				}
			}
		)
	}

	const { setupMeme } = useStaticQuery(graphql`
		query {
			setupMeme: file(name: {eq: "setup-image"}) {
				childImageSharp {
					fluid(quality: 100) {
						...GatsbyImageSharpFluid_withWebp
					}
				}
			}
		}
	`)

	return (
		<FullPageDiv>
			<div className="flex flex-col items-center p-4">
				<Typography variant="h4" weight="bold">Game Setup</Typography>
				<img src={setupMeme.childImageSharp.fluid.src} className="w-full md:w-1/2" alt="" />

				{/* Settings Options */}
				<div className="flex flex-col items-start mt-20">
					<div className="mb-4">
						<Typography variant="h5" weight="medium" className="m-0 mb-2">Category:</Typography>
						<CategoryList onGameTapped={(gameSelection) => {console.log(gameSelection)}}/>
					</div>

					<div className="mb-4">
						<Typography variant="h5" weight="medium" className="m-0 mb-2">Rounds:</Typography>
						<SegmentedControl
							initialSegment={rounds}
							segments={[5, 10, 15]}
							changeHandler={(value) => setRounds(value)}
							className="w-full"
						/>
					</div>

					<div className="mb-4">
						<Typography variant="h5" weight="medium" className="m-0 mb-2">Time Limit (in seconds):</Typography>
						<SegmentedControl
							initialSegment={timeLimit}
							segments={[30, 60, 90]}
							changeHandler={(value) => setTimeLimit(value)}
							className="w-full"
						/>
					</div>

					<div className="mb-4">
						<Typography variant="h5" weight="medium" className="m-0 mb-2">Max Players:</Typography>
						<SegmentedControl
							initialSegment={maxPlayers}
							segments={[5, 6, 7, 8]}
							changeHandler={(value) => setMaxPlayers(value)}
							className="w-full"
						/>
					</div>
					
					{/* Confirm/Cancel */}
					<div className="flex self-end mt-20">
						<div className="mb-4 mr-2">
							<Link to="/">
								<Button primary outline disabled={loadingRoomCreation}>Cancel</Button>
							</Link>
						</div>

						<div className="mb-4">
							<Button primary onClick={createRoom} loading={loadingRoomCreation}>Confirm</Button>
						</div> 
					</div>
				</div>				
			</div>
		</FullPageDiv>
	)
}

Setup.propTypes = {
	user: PropTypes.object
}

export default Setup
