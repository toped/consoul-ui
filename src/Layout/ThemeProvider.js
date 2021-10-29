import React, { createContext, useContext, useState } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import PropTypes from 'prop-types'

import { ThemedStyles } from '../../utils/themes/theme.js'

const Context = createContext({})

const useTheme = () => (useContext(Context))


const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState('dark')

	return (
		<Context.Provider value={[theme, setTheme]}>
			<StyledThemeProvider theme={ThemedStyles[theme]}>
				{children}
			</StyledThemeProvider>
		</Context.Provider>
	)
}
ThemeProvider.propTypes = {
	children: PropTypes.any
}

export { ThemeProvider, useTheme, ThemedStyles}
