import { initializeApp } from 'firebase/app'
import {
	GoogleAuthProvider,
	getAuth,
	signInWithPopup,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
	signOut,
	signInWithRedirect
} from "firebase/auth"
import {
	getFirestore,
	query,
	getDocs,
	collection,
	where,
	addDoc,
} from "firebase/firestore";
	

const config = require('../../../firebaseConfig')

class Firebase {
	constructor() {
		this.app = initializeApp(config)
		this.auth = getAuth(this.app)
		this.googleProvider = new GoogleAuthProvider()
		this.db = getFirestore(this.app);
	}	

	doSignOut() {
		signOut()
	}

	async signInWithGoogle() {
		console.log('signing in with google')
		signInWithPopup(this.auth, this.googleProvider)
		.then((result) => {
			// This gives you a Google Access Token. You can use it to access the Google API.
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const token = credential.accessToken;
			// The signed-in user info.
			const user = result.user;
			// ...
		}).catch((error) => {
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;
			// The email of the user's account used.
			const email = error.email;
			// The AuthCredential type that was used.
			const credential = GoogleAuthProvider.credentialFromError(error);
			// ...
		});
	}

	async logInWithEmailAndPassword(email, password) {
		try {
			await signInWithEmailAndPassword(this.auth, email, password)
		} catch (err) {
			console.error(err)
			alert(err.message)
		}
	}

	async registerWithEmailAndPassword(name, email, password) {
		try {
		  const res = await createUserWithEmailAndPassword(this.auth, email, password)
		  const user = res.user
		  await addDoc(collection(this.db, "users"), {
			uid: user.uid,
			name,
			authProvider: "local",
			email,
		  })
		} catch (err) {
		  console.error(err)
		  alert(err.message)
		}
	}

	async sendPasswordReset(email) {
		try {
		  await sendPasswordResetEmail(this.auth, email);
		  alert("Password reset link sent!");
		} catch (err) {
		  console.error(err);
		  alert(err.message);
		}
	};
}
export default Firebase