import React, { useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import { Spinner } from 'evergreen-ui'
import { FirebaseContext } from './Firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

import { withFirebaseAuthentication } from './hocs/withFirebaseAuthentication'
import { FullPageDiv } from '../components/styled-components/FullPageDiv'
import { Typography } from './primitives'
import styled from 'styled-components'

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
const Login = ({ signedIn }) => {

	const {firebase, uiConfig} = useContext(FirebaseContext)
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
		if (signedIn) {
			navigate('/')
		}
	}, [signedIn])
	
	const LoginForm = () => {
		return (
			<>
				{
					firebase 
						? <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth}/>
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
		<FullPageDiv>
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
		</FullPageDiv>
	)
}

Login.propTypes = {
	firebase: PropTypes.object,
	firebaseUIConfig: PropTypes.object,
	signedIn: PropTypes.bool,
}

export default withFirebaseAuthentication(Login)
