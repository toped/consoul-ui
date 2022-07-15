class User {
	constructor(firebaseUser) {
		this.displayName = firebaseUser?.displayName
		this.email = firebaseUser?.email
		this.photoURL = firebaseUser?.photoURL
		this.uid = firebaseUser?.uid
		this.signedIn = Boolean(firebaseUser)
		this.loading = !Boolean(firebaseUser)
		this.anonymousUser = Boolean(firebaseUser) ? false : true
	}	

	isEqualToUser(user) {
		return this.displayName == user.displayName &&
			this.email == user.email &&
			this.photoURL == user.photoURL &&
			this.uid == user.uid &&
			this.signedIn == user.signedIn &&
			this.anonymousUser == user.anonymousUser
	}	
}
export default User