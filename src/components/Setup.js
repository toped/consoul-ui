import React, { useState } from 'react'
import PropTypes from 'prop-types'
import  Link from 'gatsby-link'
import { useStaticQuery, graphql } from 'gatsby' // to query for image data

import GameList from './primitives/GameList'
import { Typography, SegmentedControl, Button } from './primitives'
import { useUser } from './Context/UserProvider'
import { useRoom } from './Context/RoomProvider'
import { Position } from '@blueprintjs/core'
import { Tooltip2 } from "@blueprintjs/popover2";

const Setup = () => {

	const [rounds, setRounds] = useState(5)
	const [timeLimit, setTimeLimit] = useState(30)
	const [maxPlayers, setMaxPlayers] = useState(5)
	const [selectedGame, setSelectedGame] = useState(null)
	const { user } = useUser()
	const { createRoom, loadingRoomCreation } = useRoom()

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
		<div className="sm:flex sm:flex-col sm:items-center sm:justify-center">
			<div className="p-4">
				<Typography variant="h4" weight="bold">Game Setup</Typography>
				{/* <img src={setupMeme.childImageSharp.fluid.src} className="w-full md:w-1/2" alt="" /> */}

				{/* Settings Options */}
				<>
					<div className="mb-4 mt-8">
						<Typography variant="h5" weight="medium" className="m-0 mb-2">Choose a game:</Typography>
						<GameList onGameTapped={(gameSelection) => {console.log(gameSelection); setSelectedGame(gameSelection)}}/>
					</div>

					{
						selectedGame?.setupOptions.rounds
						&& <div className="mb-4">
								<Typography variant="h5" weight="medium" className="m-0 mb-2">Rounds:</Typography>
								<SegmentedControl
									initialSegment={rounds}
									segments={[5, 10, 15]}
									changeHandler={(value) => setRounds(value)}
									className="w-full"
								/>
							</div>
					}
					{
						selectedGame?.setupOptions.timeLimit
						&& <div className="mb-4">
								<Typography variant="h5" weight="medium" className="m-0 mb-2">Time Limit (in seconds):</Typography>
								<SegmentedControl
									initialSegment={timeLimit}
									segments={[30, 60, 90]}
									changeHandler={(value) => setTimeLimit(value)}
									className="w-full"
								/>
							</div>
					}

					{
						selectedGame?.setupOptions.maxPlayers
						&& <div className="mb-4">
								<Typography variant="h5" weight="medium" className="m-0 mb-2">Max Players:</Typography>
								<SegmentedControl
									initialSegment={maxPlayers}
									segments={[5, 6, 7, 8]}
									changeHandler={(value) => setMaxPlayers(value)}
									className="w-full"
								/>
							</div>
					}
					
					{/* Confirm/Cancel */}
					<div className="flex mt-20 justify-end">
						<div className="mb-4 mr-2">
							<Link to="/">
								<Button primary outline disabled={loadingRoomCreation}>Cancel</Button>
							</Link>
						</div>

						<div className="mb-4">
							<Tooltip2 content={<Typography variant="tiny" weight="medium" className="m-0 mb-2">Select a game</Typography>}
								disabled={Boolean(selectedGame)} 
								position={Position.TOP}
								openOnTargetFocus={false}>
								<Button primary onClick={() => createRoom(user?.uid, rounds, timeLimit, maxPlayers, selectedGame)} disabled={!Boolean(selectedGame)} loading={loadingRoomCreation}>Confirm</Button>
							</Tooltip2>
						</div> 
					</div>
				</>				
			</div>
		</div>
	)
}

Setup.propTypes = {
	user: PropTypes.object
}

export default Setup
