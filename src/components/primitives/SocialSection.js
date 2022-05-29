import React from 'react'
import styled from 'styled-components'
import { AiFillLinkedin, AiFillGithub, AiFillInstagram, AiFillFacebook, AiFillCalendar } from 'react-icons/ai'

const SocialSectionWrapper = styled.div`
  display: inline-flex;
  text-align: center;

  a {
    color: ${({theme}) => theme.text};
    padding: 5px 20px 0 0;
    font-size: 1.5rem !important;
  }
`

function SocialSection() {
	return (
		<SocialSectionWrapper>
			<a
				href="https://github.com/toped"
				target="_blank"
				rel="noopener noreferrer"
			>
				<AiFillGithub/>
			</a>
			<a
				href="https://www.linkedin.com/in/tope-daramola-0002375b/"
				target="_blank"
				rel="noopener noreferrer"
			>
				<AiFillLinkedin/>
			</a>
			{/* <a
				href="https://www.instagram.com/_toped/"
				target="_blank"
				rel="noopener noreferrer"
			>
				<AiFillInstagram/>
			</a>
			<a
				href="https://www.facebook.com/tope.d19?ref=bookmarks"
				target="_blank"
				rel="noopener noreferrer"
			>
				<AiFillFacebook/>
			</a> */}
		</SocialSectionWrapper>
	)
}

export default SocialSection