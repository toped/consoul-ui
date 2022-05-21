import React from 'react'
import PropTypes from 'prop-types'
import { ApolloProvider } from '@apollo/react-hooks'
import { client } from './client'
import { ThemeProvider } from '../Layout/ThemeProvider'
import { FirebaseContextProvider } from '../components/Context/FirebaseProvider'
import { UserContextProvider } from '../components/Context/UserProvider'
import { RoomContextProvider } from '../components/Context/RoomProvider'

export const wrapRootElement = ({ element }) => (
	<ApolloProvider client={client}>
		<ThemeProvider>
			<FirebaseContextProvider>
				<UserContextProvider>
					<RoomContextProvider>
						{element}
					</RoomContextProvider>
				</UserContextProvider>
			</FirebaseContextProvider>
		</ThemeProvider>
	</ApolloProvider>
)

wrapRootElement.propTypes = {
	element: PropTypes.any
}