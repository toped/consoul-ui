import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Reward from 'react-rewards'

import Typography from './Typography'
import Button from './Button'

const SelectButton = styled(Button)`
	background-color: #6767fa !important;
	border-radius: 5px !important;
	margin: 0 .3rem;
  .bp3-button-text {
		justify-content: center;
    align-items: center;
    display: flex;
  }
`

const Flipper = styled.div`
  @keyframes selectAnimation {
    0% {
      transform: rotateY(720deg);
    }
    100% {
      transform: rotateY(180deg);
    }
  }

  /* flip speed goes here */
  transition: 0.6s;
  transform-style: preserve-3d;

  position: relative;
	height:100%;
`

const Front = styled.div`
  z-index: 2;
  /* for firefox 31 */
  transform: rotateY(0deg);
  backface-visibility: hidden;
  background-color: #000;

  position: absolute;
  top: 0;
  left: 0;
  color: #000;
  text-align: center;
 
  width: 230px;
  height: 324px;
  border-radius: .5rem;
  padding: 1rem;

`
const Back = styled.div`
  transform: rotateY(180deg);
  backface-visibility: hidden;
  background-color:  ${({ $highlighted }) => $highlighted ? 'green' : '#FFF'};
  color:  ${({ $highlighted }) => $highlighted ? '#FFF' : '#000'};

  position: absolute;
  top: 0;
  left: 0;
  text-align: center;
  
  width: 230px;
  height: 324px;
  border-radius: .5rem;
  padding: 1rem;
`
const CardContainer = styled.div`
  /* entire container, keeps perspective */
	perspective: 1000;

  width: 230px;
  height: 324px;
  margin: .5rem 1rem;
  border-radius: .5rem;
  font-weight: 900;
  word-wrap: break-word;
  font-size: 1.5rem;
  vertical-align: top;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
  cursor: pointer;
  transition: 0.25s;

  height: ${({ $highlighted }) => $highlighted ? '350px' : '324px'} !important;

  ${({ $outlined, theme }) => {
		if ($outlined) {
			return `
      border: 1.5px dashed ${theme.text};
      background-color: transparent;
      box-shadow: none;
      `
		}
	}}

  /* flip the pane when hovered */
  /* &:hover ${Flipper} {
    transform: rotateY(180deg);
  } */

  ${Flipper} {
    ${({ $revealCard, $animate }) => {
		if ($animate) {
			return `
      animation: 1s ease-out 0s 1 selectAnimation;
      animation-fill-mode: forwards;
        `
		}else	if ($revealCard) {
			return `
        transform: rotateY(180deg);
        `
		}
	}}
  }
`

const PlayingCard = ({ children, outlined, revealed, highlighted, handleClick, choose, showChooseButton, animate, ...props }) => {

	const doHandleClick = () => {
		handleClick && handleClick()
	}
  
	const reward = useRef(null)
  
	useEffect(() => {
		if(animate)
			reward.current.rewardMe()
	}, [animate])

	return (
		<div className="flex flex-col items-center">
			<Reward
				ref={reward}
				type='memphis'

			>
				<CardContainer
					{...props} 
					$outlined={outlined} 
					$revealCard={revealed} 
					$highlighted={highlighted} 
					$animate={animate}
					onClick={() => doHandleClick()}>
					<Flipper>
						{
							outlined
								? <div className="flex h-full items-center justify-center">
									<Typography variant="h5" weight="bold" className="m-0">waiting...</Typography>
								</div>
								: <>
									<Back className="flex flex-col h-full" $highlighted={highlighted}>
										<div className="flex flex-1 text-left">
											{children}
										</div>
										<div className="flex items-end justify-end">
											<Typography variant="body" weight="bold" className="m-0" color={highlighted ? '#FFF' : '#000'}>memez.</Typography>
										</div>

									</Back>
									<Front className="flex flex-col h-full items-center justify-center">
										<Typography variant="h5" weight="bold" className="m-0" color="#FFF">memez.</Typography>
									</Front>
								</>
						}
					</Flipper>
				</CardContainer>
			</Reward>
			{
				highlighted && showChooseButton
					? 
					<SelectButton className="w-32" onClick={() => choose()}>
						<Typography variant="body" weight="bold" className="m-0" color="#FFF">select</Typography>
					</SelectButton>
					: null
			}
     
		</div>

	)
}

PlayingCard.propTypes = {
	/** Optional React Node to pass into component */
	children: PropTypes.node,
	animate: PropTypes.bool,
	outlined: PropTypes.bool,
	revealed: PropTypes.bool,
	highlighted: PropTypes.bool,
	handleClick: PropTypes.func,
	doRevealCard: PropTypes.func,
	choose: PropTypes.func,
	showChooseButton: PropTypes.bool,
}

export default PlayingCard
