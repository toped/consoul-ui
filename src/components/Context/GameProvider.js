import React, { useState, createContext, useContext } from 'react'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/react-hooks'
import { toaster } from 'evergreen-ui'

import { Game, GameCard } from '../../../utils/models'
import { formatters } from '../../../utils/functions'
import { UPDATE_ROOM } from '../../../utils/graphql/mutations'
import { useRoom } from './RoomProvider'


const GameContext = createContext()

const useGame = () => (useContext(GameContext))

const GameContextProvider = ({children}) => {

	const [game, setGame] = useState(null)
    const { roomData } = useRoom()
    const room = roomData?.rooms.length ? roomData?.rooms[0] : null

    const [updateRoomMutation] = useMutation(
		UPDATE_ROOM, {
			onError: (err) => {
				toaster.danger(`Oops: ${formatters.extractGQLErrorMessage(err)}`)
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


	const submitCard = (text) => {
		let cards = Object.assign([], game.cards || [])
		cards = cards.filter(c => c.user !== user.uid)

		const newCard = new GameCard({
			user: user.uid,
			text
		})

		cards.push(newCard)

		const gameObj = new Game({
			...game,
			cards
		})
    
		updateRoomMutation(
			{
				variables: {
					room: {
						...room,
						game: gameObj.toGraphQLModel
					}
				}
			}
		) 
	}

	const revealCard = (uid) => {
		let cards = Object.assign([], game.cards)
		cards = cards.map(c => (
			c.user === uid
				? {
					...c,
					revealed: true
				}
				: c
		))

		const gameObj = new Game({
			...game,
			cards
		})
    
		updateRoomMutation(
			{
				variables: {
					room: {
						...room,
						game: gameObj.toGraphQLModel
					}
				}
			}
		) 
	}

	const highlightCard = (uid) => {
		let cards = Object.assign([], game.cards)
		cards = cards.map(c => (
			c.user === uid
				? {
					...c,
					highlighted: true
				}
				: {
					...c,
					highlighted: false
				}
		))

		const gameObj = new Game({
			...game,
			cards
		})
    
		updateRoomMutation(
			{
				variables: {
					room: {
						...room,
						game: gameObj.toGraphQLModel
					}
				}
			}
		) 
	}

	return (
		<GameContext.Provider value={{
			    game,
                setGame,
                updateGameObject,
                submitCard,
                revealCard,
                highlightCard
		}}>
			{children}
		</GameContext.Provider>
	)
}

GameContextProvider.propTypes = {
	children: PropTypes.object
}

export { GameContextProvider, useGame }