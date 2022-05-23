import { nanoid } from 'nanoid'

class User {
	constructor(firebaseUser) {
		this.displayName = firebaseUser?.displayName
		this.email = firebaseUser?.email
		this.photoURL = firebaseUser?.photoURL
		this.uid = firebaseUser?.uid
		this.signedIn = Boolean(firebaseUser)
		this.loading = firebaseUser === undefined
		this.anonymousUser = Boolean(firebaseUser) ? false : true
	}	
}
export default User