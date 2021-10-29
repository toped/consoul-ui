import { toaster } from 'evergreen-ui'

/**	
 * Return true if value exists. Otherwise, returns false and
 * displays an evergreen toaster
 * @param {*} currentRoom 
 */
const valueNotEmpty = (value) => {
	value = value && value.trim()
	if(!value || value === '') {
		toaster.danger(
			'Sorry, but you have to give your budget a name.'
		)
		return false
	}
	return true
}

export default { valueNotEmpty }