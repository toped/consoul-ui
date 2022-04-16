import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { toaster } from 'evergreen-ui'

import Typography from './Typography'
import PlayingCard from './PlayingCard'

const Wrapper = styled.div`
  overflow-x: scroll;
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
`

const NoCard = styled.div`
  background: rgba(255,255,255,.06);
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  padding: 10px 12px;
  margin: 0 1rem 8px;
  cursor: pointer;
`

const _ = ({ players, cards, revealCard, highlightCard, activePlayer, isActivePlayer }) => {

	const getCard = (user) => { console.log(cards.filter(c => c.user === user.uid)[0]); return cards.filter(c => c.user === user.uid)[0]}

	console.log(cards)

	return (
		<Wrapper className="flex my-4 w-full">
			{
				players
					? players.filter(p=>p.uid !== activePlayer?.uid).map(user => {
						return (
							<div key={user.uid}>
								{
									cards?.map(card => card.user).includes(user.uid)
										? <PlayingCard
											handleClick={() => {
												isActivePlayer
													? getCard(user)?.revealed ? highlightCard(user.uid) : revealCard(user.uid)
													: toaster.notify(`Wait for ${activePlayer?.displayName} to choose a card`)
											}}
											revealed={getCard(user)?.revealed}
											highlighted={getCard(user)?.highlighted}
											showChooseButton={isActivePlayer}
										>
											{getCard(user)?.text}
										</PlayingCard>
										: <PlayingCard outlined={true} />
								}
							</div>
						)
					})
					: null
			}
		</Wrapper>
	)
}

_.propTypes = {
	players: PropTypes.array,
	cards: PropTypes.array,
	owner: PropTypes.string,
	revealCard: PropTypes.func,
	highlightCard: PropTypes.func,
	isOwner: PropTypes.bool,
	isActivePlayer: PropTypes.bool,
	activePlayer: PropTypes.object
}

export default _
