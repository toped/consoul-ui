/**	
 * Returns graphql errors
 * @param {*} error 
 */
const extractGQLErrorMessage = (error) => {
	return error.message.split('[GraphQL error]: ')[0]
}

export default { extractGQLErrorMessage }