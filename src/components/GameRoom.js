import React, { useEffect } from 'react'
import { navigate } from 'gatsby'

import { FullPageDiv, GameStageLeft, GameStageRight, MemeFrame } from '../components/styled-components'
import { Typography, Countdown, Timer, LeaderboardList, CardSummary, TimesUp, Button, CaptionInput } from './primitives'
import { Game } from '../../utils/models'
import { useUser } from './Context/UserProvider'
import { useRoom } from './Context/RoomProvider'
import { useGame } from './Context/GameProvider'


const GameRoom = () => {

	const { user } = useUser()
	const { roomData, roomIncludesPlayer} = useRoom()
	const { game, setGame, updateGameObject, submitCard, revealCard, highlightCard } = useGame()
	const room = roomData.rooms[0]

  
	useEffect(() => {
		if(!roomIncludesPlayer(user.uid)) {
			navigate('/lost')
		}
		
		if (!Object.keys(user).length) {
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

  
	return (
		<>
		{
			!room 
			? <Empty/>
			:<FullPageDiv>
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
													room?.host === user.uid
														? <Button className="my-4" color="MediumSeaGreen" outline onClick={() => updateGameObject(true)}>Start Next Round</Button>
														: <Typography className="my-4"  variant="tiny" weight="normal">Waiting for host to start the next round...</Typography>
												}
											</>
											: game?.currentPlayer.uid === user.uid
												? <Typography className="my-4"  variant="tiny" weight="normal"> Waiting for other players to submit a card...</Typography>
												: <CaptionInput submitCaption={(text) => submitCard(text)}/>
									}
						
									<CardSummary
										activePlayer={game?.currentPlayer}
										isActivePlayer={game?.currentPlayer.uid === user.uid}
										players={game?.players}
										cards={game?.cards}
										revealCard={(uid) => revealCard(uid)}
										highlightCard={(uid) => highlightCard(uid)}
									/>
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
		}
		</>
	)
}

GameRoom.propTypes = {
}

export default GameRoom
