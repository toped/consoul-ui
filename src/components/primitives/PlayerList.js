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

const _ = ({players, owner, isOwner}) => {

	return (
		<Wrapper className="flex flex-no-wrap overflow-hidden overflow-x-auto">
			{
				players
					? players.map(user => (
						<div key={user.uid} className="flex flex-col items-center text-center mr-4">
							<div className="flex">
								<Avatar name={user.displayName} size={60} />
								{user.uid !== owner 
									? isOwner 
										? <BanCircleIcon 
											color="red" 
											className="cursor-pointer"
											onClick={() => {}}
										/> 
										: null
									: <CrownIcon color="gold"/>}
							</div>
							
							<Typography variant="tiny" weight="600" className="my-2">{user.displayName}</Typography>
						</div>
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
