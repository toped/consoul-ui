import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Avatar, BanCircleIcon, CrownIcon } from 'evergreen-ui'

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

const _ = ({players, cards}) => {

	return (
		<Wrapper className="flex my-4 w-full">
			{
				players
					? players.map(user => {
						
						return (
							<div key={user.uid}>
								{
									cards?.map(card => card.user).includes(user.uid)
										? <PlayingCard/>
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
	isOwner: PropTypes.bool
}

export default _
