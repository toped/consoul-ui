import React, { useState, useEffect, createContext, useContext } from 'react'
import PropTypes from 'prop-types'
import Firebase from '../../models/Firebase'

const FirebaseContext = createContext({})

const useFirebase = () => (useContext(FirebaseContext))

const FirebaseContextProvider = ({children}) => {
	const [firebase, setFirebase] = useState(null)
	
	useEffect(() => {
		const firebase = new Firebase()
		setFirebase(firebase)
	}, [])

	return (
		<FirebaseContext.Provider value={{firebase}}>
			{children}
		</FirebaseContext.Provider>
	)
}

FirebaseContextProvider.propTypes = {
	children: PropTypes.object
}

export { FirebaseContextProvider, useFirebase }