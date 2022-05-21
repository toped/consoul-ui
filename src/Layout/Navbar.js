import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Link from 'gatsby-link'
import { useMutation, useLazyQuery } from '@apollo/react-hooks'
import { toaster } from 'evergreen-ui'
import { navigate } from 'gatsby'
import { Navbar, Alignment } from '@blueprintjs/core'
import { useFirebase } from '../components/Context/FirebaseProvider'
import { useUser } from '../components/Context/UserProvider'

import { Typography, OnlineCircle } from '../components/primitives'
import { formatters } from '../../utils/functions'
import { DELETE_ROOM, UPDATE_ROOM } from '../../utils/graphql/mutations'
import { ROOMS } from '../../utils/graphql/queries'

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
	page, fixed, loadingRooms, loadingHostedRooms, loadingPlayingRooms, ...props
}) => {
			
	const {firebase} = useFirebase()
	const {user} = useUser()

	/* Query to check if user is hosting a room */
	const [getUserHostedRooms] = useLazyQuery(
		ROOMS, {
			onCompleted: (data) => {
				console.log('getUserHostedRooms->', data)

				if (data.rooms.length > 0) {
					console.log('getUserHostedRooms->', data)
					if (data.rooms[0].players.length > 1) {
						console.log('attempting to reassigning host')
						reassignHost(data.rooms[0])
					} else {
						console.log('deleting room')
						deleteRoom()
					}
				} else {
					// Check if user is playing in a room
					getUserPlayingRooms({
						variables: {
							playerUid: user?.uid
						}
					})
				}
			}, onError: (err) => {
				console.log(err)
			}
		}
	)

	const [getUserPlayingRooms] = useLazyQuery(
		ROOMS, {
			onCompleted: (data) => {
				// check if hostedRoom exists to avoid subsequent updates to state
				console.log(data)
				if (data.rooms.length > 0) {
					removePlayer(user.playingRoom)
				} else {
					//navigate
					navigate('/login')
					firebase.doSignOut()
				}
			}, onError: (err) => {
				console.log(err)
			}
		}
	)
	
	const [updateRoomMutation] = useMutation(
		UPDATE_ROOM, {
			onCompleted: () => {
				//navigate to home
				navigate('/login')
				firebase.doSignOut()
			},
			onError: (err) => {
				toaster.danger(formatters.extractGQLErrorMessage(err))
			}
		}
	)

	const [deleteRoomMutation] = useMutation(
		DELETE_ROOM, {
			onCompleted: () => {
				//navigate to home
				navigate('/login')
				firebase.doSignOut()
			},
			onError: (err) => {
				toaster.danger(formatters.extractGQLErrorMessage(err))
			}
		}
	)

	const reassignHost = (room) => {
		let newPlayerList = room.players.filter(p => !p.isHost && !p.anonymousUser)
		console.log('newPlayerList', newPlayerList)
		newPlayerList[0] = {
			...newPlayerList[0],
			isHost: true
		}
		
		updateRoomMutation(
			{
				variables: {
					room: {
						...room,
						host: newPlayerList[0].uid,
						players: newPlayerList
					}
				}
			}
		)
	}

	const removePlayer = (room) => {
		let newPlayerList = room.players.filter(p => p.uid !== user.uid)

		updateRoomMutation(
			{
				variables: {
					room: {
						...room,
						players: newPlayerList
					}
				}
			}
		)
		
	}

	const deleteRoom = () => {
		deleteRoomMutation(
			{
				variables: {
					host:  user.uid
				}
			}
		)
	}


	const logOut = () => {
		if (firebase) {
			// query for room to make sure details are up to date
			// then remove user from current room and reassign host if possible, otherwise delete room
			console.log('loggin user out: ', user.uid)
			getUserHostedRooms({
				variables: {
					host: user.uid
				}
			})
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
				<Typography variant="body" className="px-2 m-0 cursor-pointer" weight="normal" onClick={() => ( user.signedIn ? logOut() : navigate('/login') )}>
					{ user.signedIn ? 'Logout' : 'Login' }
				</Typography>
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

export default _
