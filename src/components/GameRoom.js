import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import { useMutation } from '@apollo/react-hooks'
import { toaster } from 'evergreen-ui'

import { FullPageDiv, GameStageLeft, GameStageRight, MemeFrame, CaptionInput } from '../components/styled-components'
import { Typography, Countdown, Timer, LeaderboardList, CardSummary, TimesUp, Button } from './primitives'
import { formatters } from '../../utils/functions'
import { Game } from '../../utils/models'
import { withFirebaseAuthentication } from './hocs/withFirebaseAuthentication'
import { UPDATE_ROOM } from '../../utils/graphql/mutations'

const GameRoom = ({ user, signInLoading, room, subscribeToRoomUpdates, subscribeToDeletion }) => {

	const [game, setGame] = useState(null)

	useEffect(() => {
		console.log('lobby subscribing to room updates')
		subscribeToRoomUpdates()
		subscribeToDeletion()
	}, [])
  
	useEffect(() => {
		if (user?.uid && !room?.players.map(p => p.uid).includes(user.uid)) {
			navigate('/lost')
		}
		
		if (!signInLoading && !Object.keys(user).length) {
			navigate('/lost')
		}
    
		// update game object on server
		if (user?.uid && user.uid === room.host) {
			if (!room.game) {
				updateGameObject()
			} else {
				console.log('And we live->', room.game)
			}
		}

	}, [user])

	useEffect(() => {
		if (room.game) {
			const gameObj = new Game({
				...room.game,
				players: room.players
			})

			console.log(gameObj)
			setGame(gameObj)
		}
	}, [room])
  
	const [updateRoomMutation] = useMutation(
		UPDATE_ROOM, {
			onError: (err) => {
				toaster.danger(formatters.extractGQLErrorMessage(err))
			}
		}
	)
  
	const updateGameObject = (progress) => {
		let currentRound
		let currentTurn

		if (progress && room.game) {
			currentTurn = room.game.currentTurn < room.players.length ? room.game.currentTurn + 1 : null
			console.log('Current turn updating to ', currentTurn)
			currentRound = !currentTurn ? room.game.currentRound + 1 : room.game.currentRound
			console.log('Current round updating to ', currentRound)

		}
		
		const gameObj = new Game({
			rounds: room.settings.rounds,
			timeLimit: room.settings.timeLimit,
			currentRound,
			currentTurn,
			players: room.players,
			gameOver: game?.lastRound
		})
    
		console.log('mutating room from game room')
		updateRoomMutation(
			{
				variables: {
					room: {
						...room,
						triggerRound: true,
						game: gameObj.toGraphQLModel
					}
				}
			}
		)
	}
  
	return (
		<FullPageDiv>
			<div className="flex w-full h-full flex-col md:flex-row">
				<GameStageLeft>
					<div className="flex justify-between">
						{
							!game?.countDownTime
								? 
								<Timer 
									duration={game?.timeLimit}
									currentTick={game?.roundTime}
									controlled={true}
									radius={30}
									active={Boolean(game?.roundTime)}
									onCompleted={()=>{}}
								/>
								: null
						}
						<div className="flex flex-col">
							<Typography variant="h6" weight="bold" className="m-0">{`Round ${game?.currentRound}`}</Typography>
							<Typography variant="tiny" weight="bold" className="m-0">{game?.currentPlayer.displayName}</Typography>
						</div>
					</div>
					<div className="flex flex-col flex-1 items-center w-full">
						<MemeFrame>
							<img 
								src="https://assetblast.b-cdn.net/wp-content/uploads/2021/09/Facebook-will-smith-e1632766993863.jpeg?aspect_ratio=13:6&width=360&quality=60" 
								alt="" />
						</MemeFrame>
						{
							!game?.gameOver
								?
								<>
									{
										game?.roundTimeElapsed
											?
											<>
												<TimesUp>
													<Typography variant="h6" weight="bold" fon className="m-0" fontFamily="Press_Start_2P" color="red">Time is up!!</Typography>
												</TimesUp>
												{
													room.host === user.uid
										&& <Button className="mb-4" color="MediumSeaGreen" outline onClick={() => updateGameObject(true)}>Start Next Round</Button>
												}
											</>
											:
											<CaptionInput
												onChange={(e) => {}}
												className="my-4"
												placeholder="Enter a caption"
												type="text"
												name="caption"
												maxLength="25"
												value={''}
											/>
									}
						
									<CardSummary players={room.players}/>
								</>
								:<TimesUp>
									<Typography variant="h3" weight="bold" fon className="m-0" fontFamily="Press_Start_2P">Game Over!!</Typography>
								</TimesUp>
						}
						
					</div>
				</GameStageLeft>
				<GameStageRight>
					<Typography variant="h4" weight="bold" className="m-0">Leaderboard</Typography>
					<LeaderboardList players={room.players} />
				</GameStageRight>
			</div>

			{
				game?.countDownTime
					? <Countdown count={game?.countDownTime} />
					: null
			}
		</FullPageDiv>
	)
}

GameRoom.propTypes = {
	room: PropTypes.object,
	user: PropTypes.object,
	signInLoading: PropTypes.bool,
	subscribeToRoomUpdates: PropTypes.func,
	subscribeToDeletion: PropTypes.func
}

export default withFirebaseAuthentication(GameRoom)