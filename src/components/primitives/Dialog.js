import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Dialog } from '@blueprintjs/core'
import tw from 'twin.macro'

const Styled_ = styled(Dialog)`
  && {
		padding: 0;
		${tw`mx-4`}
    .dialog-body {
    }

    .bp3-dialog-header {
			border-radius: 0;
			display: ${({showHeader}) => !showHeader ? 'none' : 'inherit'}
    }

    .bp3-heading {
    }

    .bp3-icon {
    }

  }
`

const _ = ({ children, ...props }) => (
	<Styled_ {...props}>
		<div className='dialog-body'>
			{children}
		</div>
	</Styled_>
)
_.propTypes = {
	/** Children elements that will render inside the body of the dialog */
	children: PropTypes.any,
	/** Determines if the modal is showing or not */
	isOpen: PropTypes.bool.isRequired,
	/** Determines if the header (work around for this issue: https://github.com/palantir/blueprint/issues/3380 ) */
	showHeader: PropTypes.bool.isRequired,
	/** Adds a header to the dialog containing the string title below */
	title: PropTypes.string,
	/** Adds an icon next to the title, title required */
	icon: PropTypes.string,
	/** Determines if x icon appears in title, title required */
	isCloseButtonShown: PropTypes.bool,
	/** Event handler for when dialog closes */
	onClose: PropTypes.func
}
_.defaultProps = {
	isCloseButtonShown: true
}

export default _
