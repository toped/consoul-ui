import React from 'react'
import PropTypes from 'prop-types'
import Typography from './Typography'
import GameLoading from './GameLoading'


const Countdown = ({ count }) => {
	return (
		<div
			className="flex flex-col items-center justify-center absolute z-50">
			{
				count > 0
					?
					<>
						<GameLoading/>
						<Typography variant="h4" weight="500" fontFamily="Montserrat" className="my-4">
							{count}
						</Typography>
						<Typography 
							variant="h6" 
							weight="bold"
							className="m-0 text-center">
        Round is Loading...
						</Typography>
					</>
					:
					<Typography variant="h4" weight="500" fontFamily="Montserrat" className="my-8">
							GET READY!!
					</Typography>
			}
		</div>
	)
}

Countdown.propTypes = {
	open: PropTypes.bool,
	onClose: PropTypes.func,
	count: PropTypes.number
}

export default Countdown
