import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import { Spinner } from 'evergreen-ui'
import { useFirebase } from './Context/FirebaseProvider'
import Link from 'gatsby-link'

import { Typography } from './primitives'
import styled from 'styled-components'
import { useUser } from './Context/UserProvider'

const Wrapper = styled.div`
  	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`
const LoginCard = styled.div`
  border-radius: 5px !important;
  margin: 0 4rem;
  width: 640px;
  background-image: 
	${({ theme }) => theme.name === 'light'
		? 'linear-gradient(to bottom, #FFEFBA, #edf0aa) !important'
		: 'linear-gradient(to bottom, #FFEFBA, #edf0aa) !important'};
  background-size: cover;
  border: none !important;
  .firebaseui-tospp-full-message {
    color: #7a6526 !important;
  }
  .firebaseui-tospp-full-message a {
    color: #7a6526 !important;
  }
`
const StyledFirebaseAuth = styled.div`
	.login {
		height: 100vh;
		width: 100vw;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.login__container {
		display: flex;
		flex-direction: column;
		text-align: center;
		background-color: #dcdcdc;
		padding: 30px;
	}
	.login__textBox {
		padding: 10px;
		font-size: 18px;
		margin-bottom: 10px;
	}
	.login__btn {
		padding: 10px;
		font-size: 18px;
		margin-bottom: 10px;
		border: none;
		color: white;
		background-color: black;
	}
	.login__google {
		background-color: #4285f4;
	}
	.login div {
		margin-top: 7px;
	}
`
const Login = () => {

	const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
	const { firebase } = useFirebase()
	const {user} = useUser()
	
	const cookiesEnabled = () => {
		if (typeof window !== 'undefined') {
			var cookieEnabled = window.navigator.cookieEnabled
			if (!cookieEnabled){ 
				document.cookie = 'testcookie'
				cookieEnabled = document.cookie.indexOf('testcookie') !== -1
			}
		}
		return cookieEnabled
	}


	useEffect(() => {
		if (user.signedIn) {
			navigate('/')
		}
	}, [])
	
	const LoginForm = () => {
		return (
			<>
				{
					firebase != null
						? <StyledFirebaseAuth>
							<div className="login">
								<div className="login__container">
									<input
									type="text"
									className="login__textBox"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="E-mail Address"
									/>
									<input
									type="password"
									className="login__textBox"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									placeholder="Password"
									/>
									<button
									className="login__btn"
									onClick={() => firebase?.signInWithEmailAndPassword(email, password)}
									>
									Login
									</button>
									<button className="login__btn login__google" onClick={() => firebase?.signInWithGoogle()}>
									Login with Google
									</button>
									<div>
									<Link to="/reset">Forgot Password</Link>
									</div>
									<div>
									Don't have an account? <Link to="/register">Register</Link> now.
									</div>
								</div>
							</div>
						  </StyledFirebaseAuth>
						: <Spinner size={24}/>
				}
			</>
		)
	}

	const CookieMessage = () => {
		return (
			<>
				<Typography variant="h5" weight="black" color="#FFF" className="text-center" >{'Do you have cookies disabled? 🧐'}</Typography>
				<Typography variant="h6" weight="normal" color="#FFF" className="text-center" >{'Please enable cookies in your browser to login'}</Typography>
			</>
		)
	}

	return (
		<Wrapper>
			<LoginCard>
				{
					cookiesEnabled()
						? <LoginForm/>
						: typeof window !== 'undefined'
							? <CookieMessage/>
							: <Spinner size={24}/>
				}
			</LoginCard>
		</Wrapper>
	)
}

Login.propTypes = {
	firebase: PropTypes.object,
	firebaseUIConfig: PropTypes.object,
	user: PropTypes.object,
}

export default Login
