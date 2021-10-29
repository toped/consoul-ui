import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button } from '@blueprintjs/core'

const StyledButton = styled(Button)`
  &&& {
    background-image: none;
    :hover, :disabled{
      opacity: .75;
    }
    box-shadow: none;
    outline: none;
    border: ${({ theme, $outline, $secondary, $color }) => {
		if (!$outline) {
			return 'none'
		}
  
		return `1px solid ${$color || ($secondary ? theme.secondary : theme.primary)}`
	}};

    .bp3-button-text {
      color: ${({ theme, $outline, $secondary, $color }) => {
		if (!$outline) {
			return `${$color || theme.trueWhite}`
		}
      
		return `${$color || ($secondary ? theme.secondary : theme.primary)}`
	}};
      flex: 1;
      text-align: center;
    }

    .bp3-icon {
      color: inherit;
    }

    border-radius: ${({$borderRadius}) => `${$borderRadius || '3px'}`};

    ${({theme, $secondary, $outline, $backgroundColor}) => {
		if ($outline) {
			return `
        background-color: transparent;
        :hover, :disabled {
          background-color: ${$backgroundColor || theme.trueWhite};
          opacity: .75;
        }
      `
		}
		if ($secondary) {
			return `
        background-color: ${$backgroundColor || theme.secondary};
        :hover, :disabled {
          background-color: ${$backgroundColor || theme.secondary};
          opacity: .75;
        }
      `
		}
		return `
      background-color: ${$backgroundColor || theme.primary};
      :hover, :disabled {
        background-color: ${$backgroundColor || theme.primary};
        opacity: .75;
      }
    `
	}};
  }
`

const _ = (props) => {
	const { borderRadius, backgroundColor, outline, primary, secondary, color, ...rest } = props
	return <StyledButton 
		$borderRadius={borderRadius} 
		$backgroundColor={backgroundColor}
		$outline={outline}
		$primary={primary}
		$secondary={secondary}
		$color={color}
		{ ...rest } />
}
_.propTypes = {
	/** Background color override */
	backgroundColor: PropTypes.string,
	borderRadius: PropTypes.string,
	/** Sets button to a primary button */
	secondary: PropTypes.bool,
	primary: PropTypes.bool,
	color: PropTypes.string,
	/** Sets background to white with only a border color */
	outline: PropTypes.bool
}

export default _