import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Link from 'gatsby-link'
import { navigate } from 'gatsby'
import { Navbar, Alignment } from '@blueprintjs/core'
import { FirebaseContext } from '../components/Firebase'

import { Typography, OnlineCircle } from '../components/primitives'
import { withFirebaseAuthentication } from '../components/hocs/withFirebaseAuthentication'

const Container = styled(Navbar)`
	background-color: ${({theme}) => theme.background};
	box-shadow: none;
`
const NavLinks = styled.div`
	display: flex;
`
const ThemedLink = styled(Link)`
	&& {
		* {
			color: ${({theme}) => theme.grey};
		}
	}
`
const UserName = styled.div`
	display: flex !important;
	align-items: center;
`

const NavbarLinks = [
	{ name: 'Home', link: '/' }
]

const _ = ({
	page, fixed, signedIn, user, signInLoading, loadingRooms, loadingHostedRooms, loadingPlayingRooms, ...props
}) => {

	const {firebase} = useContext(FirebaseContext)

	const logOut = () => {
		if(firebase) {
			firebase.doSignOut()
			navigate('/login')
		}
	}
	
	return (
		<Container {...props} fixedToTop={fixed}>
			<Navbar.Group align={Alignment.LEFT} className="pl-10">
				{/* no content */}
			</Navbar.Group>
			<Navbar.Group align={Alignment.RIGHT} className="pl-4">
				<NavLinks>
					{
						NavbarLinks.map(({ name, link }, i) => (
							<ThemedLink key={i} to={link}>
								<Typography variant="body" className="px-2 mb-0" weight={page === name ? 'bold' : 'normal'}>
									{ name }
								</Typography>
							</ThemedLink>
						))
					}
				</NavLinks>
				<ThemedLink to={ signedIn ? '/' : '/login' } onClick={() => ( signedIn ? logOut() : null )}>
					<Typography variant="body" className="px-2 m-0" weight="normal">
						{ signedIn ? 'Logout' : 'Login' }
					</Typography>
				</ThemedLink>	
				{
					user && user.displayName
						?<UserName>
							<Typography variant="body" weight="100" className="flex px-2 mb-0 align-center">
								<span className="flex pr-4">|</span><span>{ user.displayName }</span>
							</Typography>
							<OnlineCircle className="mr-4"/>
						</UserName>
						:null
				}
			</Navbar.Group>
		</Container>
	)
}
_.propTypes = {
	page: PropTypes.string,
	/** Specifies whether positioning should be fixed or relative */
	fixed: PropTypes.bool,
	background: PropTypes.string,
	boxshadow: PropTypes.string,
	signedIn: PropTypes.bool,
	user: PropTypes.object,
	signInLoading: PropTypes.bool,
	loadingRooms: PropTypes.bool,
	loadingHostedRooms: PropTypes.bool,
	loadingPlayingRooms: PropTypes.bool
}
_.defaultProps = {
	background: '#FFF',
	boxshadow: '0 0 0 1px rgba(16, 22, 26, 0.1), 0 0 0 rgba(16, 22, 26, 0), 0 1px 1px rgba(16, 22, 26, 0.1);'
}

export default withFirebaseAuthentication(_)
