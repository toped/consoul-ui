export const uiConfig = (auth) => {
	return {
	// Popup signin flow rather than redirect flow.
		signInFlow: 'popup',
		callbacks: {
			signInSuccessWithAuthResult: (authResult, redirectUrl) => {
				var user = authResult.user
				var credential = authResult.credential
				var isNewUser = authResult.additionalUserInfo.isNewUser
				var providerId = authResult.additionalUserInfo.providerId
				var operationType = authResult.operationType
				// Do something with the returned AuthResult.
				// Return type determines whether we continue the redirect automatically
				// or whether we leave that to developer to handle.
				return true
			},
			signInFailure: (error) => {
			// Some unrecoverable error occurred during sign-in.
			// Return a promise when error handling is completed and FirebaseUI
			// will reset, clearing any UI. This commonly occurs for error code
			// 'firebaseui/anonymous-upgrade-merge-conflict' when merge conflict
			// occurs. Check below for more details on this.
			// return handleUIError(error)
			},
			uiShown: () => {
			// The widget is rendered.
			// Hide the loader.
			// document.getElementById('loader').style.display = 'none'
			}
		},
		// Query parameter name for mode.
		queryParameterForWidgetMode: 'mode',
		// Query parameter name for sign in success url.
		queryParameterForSignInSuccessUrl: 'signInSuccessUrl',
		signInSuccessUrl: '/',
		signInOptions: [
		// Leave the lines as is for the providers you want to offer your users.
			{
				provider: auth.EmailAuthProvider.PROVIDER_ID,
				// Whether the display name should be displayed in the Sign Up page.
				requireDisplayName: true
			},
			auth.GoogleAuthProvider.PROVIDER_ID,
			// auth.FacebookAuthProvider.PROVIDER_ID,
			// auth.TwitterAuthProvider.PROVIDER_ID,
			// {
			// 	provider: auth.PhoneAuthProvider.PROVIDER_ID,
			// 	// Invisible reCAPTCHA with image challenge and bottom left badge.
			// 	recaptchaParameters: {
			// 		type: 'image',
			// 		size: 'invisible',
			// 		badge: 'bottomleft'
			// 	}
			// }
		],
		// Set to true if you only have a single federated provider like
		// auth.GoogleAuthProvider.PROVIDER_ID and you would like to
		// immediately redirect to the provider's site instead of showing a
		// 'Sign in with Provider' button first. In order for this to take
		// effect, the signInFlow option must also be set to 'redirect'.
		immediateFederatedRedirect: false,
		// tosUrl and privacyPolicyUrl accept either url string or a callback
		// function.
		// Terms of service url/callback.
		tosUrl: '<your-tos-url>',
		// Privacy policy url/callback.
		privacyPolicyUrl: () => {
		// window.location.assign('<your-privacy-policy-url>')
		}
	}
}