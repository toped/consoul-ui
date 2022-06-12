/**	
 * Returns graphql errors
 * @param {*} error 
 */
const extractGQLErrorMessage = (method, error) => {
	console.log(`${method} - ${JSON.stringify(error)}`)
	return error.message.split('[GraphQL error]: ')[0]
}

export default { extractGQLErrorMessage }