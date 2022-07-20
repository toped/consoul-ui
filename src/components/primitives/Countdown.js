import React from 'react'
import PropTypes from 'prop-types'
import Typography from './Typography'
import GameLoading from './GameLoading'


const Countdown = ({ count }) => {
	return (
		<div className="flex flex-col items-center justify-center h-screen w-screen absolute top-0 z-50">
			<div className="flex flex-col w-full items-center">
				{
					count > 0
						?
						<>
							<GameLoading/>
							<Typography variant="h4" weight="500" fontFamily="Montserrat" className="my-4">
								{count}
							</Typography>
							<Typography variant="h6" weight="bold"className="m-0 text-center">
								Round is Loading...
							</Typography>
						</>
						:
						<Typography variant="h4" weight="500" fontFamily="Montserrat" className="my-8">
							GET READY!!
						</Typography>
				}
			</div>
		</div>
	)
}

Countdown.propTypes = {
	open: PropTypes.bool,
	onClose: PropTypes.func,
	count: PropTypes.number
}

export default Countdown
