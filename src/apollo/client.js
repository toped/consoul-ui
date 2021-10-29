import { ApolloClient, InMemoryCache } from '@apollo/client'
import { split, HttpLink } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/client/link/ws'
import fetch from 'isomorphic-fetch'
import config from './config.js'

const httpLink = new HttpLink({
	uri: config[process.env.GATSBY_NODE_ENV],
	fetch
})

const wsLink = typeof window !== 'undefined' ? new WebSocketLink({
	uri: config['ws'][process.env.GATSBY_NODE_ENV],
	options: {
		reconnect: true
	},
}): null

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = typeof window !== 'undefined' ? split(
	({ query }) => {
		const definition = getMainDefinition(query)
		return (
			definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
		)
	},
	wsLink,
	httpLink,
) : httpLink

console.log('typeof window === \'undefined\':', typeof window !== 'undefined')
console.log('wsLink', wsLink)
console.log('splitLink', splitLink)

export const client = new ApolloClient({
	link: splitLink,
	cache: new InMemoryCache()
})