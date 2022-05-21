class User {
	constructor(firebaseUser) {
        this.displayName = firebaseUser?.displayName
        this.email = firebaseUser?.email
        this.photoURL = firebaseUser?.photoURL
        this.uid = firebaseUser?.uid
        this.displayName = firebaseUser?.displayName
        this.signedIn = Boolean(firebaseUser)
        this.loading = Boolean(firebaseUser) ? false : true
	}	
}
export default User