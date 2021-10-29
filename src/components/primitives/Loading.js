import styled from 'styled-components'
import { Spinner } from 'evergreen-ui'


export const Loading = styled(Spinner)`
	&& {
		svg > circle {
			stroke: ${({theme}) => theme.white};
		}
	}
`