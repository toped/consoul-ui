import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Avatar, BanCircleIcon, CrownIcon } from 'evergreen-ui'

import Typography from './Typography'

const Wrapper = styled.div`
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
`

const LeaderboardItem = styled.div`
	background: ${({theme}) => theme.name === 'light' ? 'rgba(0,0,0,.06)' : 'rgba(255,255,255,.06)'};
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  padding: 10px 12px;
  margin: 0 1rem 8px;
  cursor: pointer;
`

const _ = ({players}) => {

	return (
		<Wrapper className="flex flex-col my-4 w-full">
			{
				players
					? players.map(user => (
						<LeaderboardItem key={user.uid}>
							<div className="flex items-center">
								<Avatar name={user.displayName} size={30} marginRight=".5rem" />
								<Typography variant="tiny" weight="600" className="flex my-2">
									{user.displayName}
								</Typography>
							</div>
							<div>
								{/* Score will go here */}
								<Typography variant="tiny" weight="bold" className="flex my-2">
									0
								</Typography>
							</div>
						</LeaderboardItem>
					))
					: null
			}
		</Wrapper>
	)
}

_.propTypes = {
	players: PropTypes.array,
	owner: PropTypes.string,
	isOwner: PropTypes.bool
}

export default _
