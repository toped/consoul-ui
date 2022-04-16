class GameCard {
	constructor({user, text}) {
    
		if (!user) {
			throw 'Game card must be initialized with a user id'
		}
    
		if (!text) {
			throw 'Game card must be initialized with caption text to display'
		}
    
		this.user = user
		this.text = text
		this.revealed = false
		this.highlighted = false
		this.selected = false
	}
  
	revealCard() {
		// TODO
	}

}
 
export default GameCard