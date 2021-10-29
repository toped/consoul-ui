import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Firebase from './firebase'
import { uiConfig } from './uiConfig'

const FirebaseContext = React.createContext({})

const FirebaseContextProvider = ({children}) => {
	const [firebase, setFirebase] = useState(null)
	const [app, setApp] = useState(null)
	
	useEffect(() => {
		const app = require('firebase/app')

		require('firebase/auth')
		require('firebase/database')
		require('firebase/storage')
		const firebase = new Firebase(app)

		setApp(app)
		setFirebase(firebase)
	}, [])

	return (
		<FirebaseContext.Provider value={
			{
				firebase,
				uiConfig: app ? uiConfig(app) : null
			}
		}>
			{children}
		</FirebaseContext.Provider>
	)
}

FirebaseContextProvider.propTypes = {
	children: PropTypes.object
}

export { FirebaseContext, FirebaseContextProvider }