import React from 'react'
import styled from 'styled-components'

import SocialSection from '../components/primitives/SocialSection'
import { ThemeToggle, Typography } from '../components/primitives'
import { useTheme } from './ThemeProvider'
import { Badge } from 'evergreen-ui'

const FooterWrapper = styled.div`
  font-size: .9rem;
  background-color: ${({ theme }) => theme.background};
	position: relative;
	bottom: 0;
	width: 100%;
`
function Footer() {
	const [,setTheme] = useTheme()

	return (
		<FooterWrapper className="text-left p-10">
			<div className="flex justify-between">
				<div>
					<div className="mb-4">
						<Typography>© 2020 Tope Daramola</Typography>
						<Badge className="ml-2">Alpha</Badge>
					</div>
					<SocialSection />
				</div>
			
				<div>
					<ThemeToggle className="m-0" onChange={() => setTheme(
						lastThemeType => (
							lastThemeType === 'light' ? 'dark' : 'light'
						)
					)} />
				</div>
			</div>
		</FooterWrapper>
	)
}

export default Footer