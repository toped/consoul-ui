import { ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/client/link/ws'
import fetch from 'isomorphic-fetch'
import config from './config.js'

const httpLink = new HttpLink({
	uri: config[process.env.GATSBY_NODE_ENV],
	cache: new InMemoryCache({
		addTypename: false
	}),
	fetch
})

const wsLink = process.env.browser ? new WebSocketLink({
	uri: config['ws'][process.env.GATSBY_NODE_ENV],
	options: {
		reconnect: true
	}
}): null


// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = process.env.browser ? split( //only create the split in the browser
	// split based on operation type
	({ query }) => {
		const { kind, operation } = getMainDefinition(query)
		return kind === 'OperationDefinition' && operation === 'subscription'
	},
	wsLink,
	httpLink,
) : httpLink

export const client = new ApolloClient({
	link: splitLink,
	cache: new InMemoryCache()
})