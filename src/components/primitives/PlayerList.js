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

const _ = ({players}) => {

	return (
		<Wrapper className="flex flex-no-wrap overflow-hidden overflow-x-auto my-4">
			{
				players
					? players.map(user => (
						<div key={user.uid} className="flex items-center text-center mx-2">
							<div className="flex flex-col items-center justify-center text-center">
								<div className="flex flex-col items-center">
									<div>
										{
											user.isHost
												? <CrownIcon color="gold" className="mx-2"/>
												: <CrownIcon color="transparent" className="mx-2"/>
										}
									</div>
									
									<Avatar name={user.displayName} size={60} />
								</div>
								<Typography variant="tiny" weight="600" className="flex my-2">
									{user.displayName}
								</Typography>
							</div>
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
