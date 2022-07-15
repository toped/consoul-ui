import React, { useState, createContext, useContext } from 'react'
import PropTypes from 'prop-types'
import Firebase from '../../models/Firebase'

const FirebaseContext = createContext({})

const useFirebase = () => (useContext(FirebaseContext))

const FirebaseContextProvider = ({children}) => {
	const [firebase, setFirebase] = useState(null)

	const getFirebase = () => {
		if(!firebase) {
			const fb = new Firebase()
			setFirebase(fb)
			return fb
		} 
		
		return firebase
	}

	return (
		<FirebaseContext.Provider value={{getFirebase}}>
			{children}
		</FirebaseContext.Provider>
	)
}

FirebaseContextProvider.propTypes = {
	children: PropTypes.object
}

export { FirebaseContextProvider, useFirebase }