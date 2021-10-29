const config = require('../../../firebaseConfig')

class Firebase {
	constructor(app) {
		app.initializeApp(config)
		this.auth = app.auth()
		this.db = app.database()
		this.storage = () => app.storage()
		this.doSignOut = () => this.auth.signOut()
	}	
}
 
export default Firebase