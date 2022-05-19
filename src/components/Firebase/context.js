import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Firebase from './firebase'
import { uiConfig as firebaseUIConfig } from './uiConfig'

const FirebaseContext = React.createContext({})

const FirebaseContextProvider = ({children}) => {
	const [firebase, setFirebase] = useState(null)
	
	useEffect(() => {
		const firebase = new Firebase()
		setFirebase(firebase)
	}, [])

	return (
		<FirebaseContext.Provider value={
			{
				firebase
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