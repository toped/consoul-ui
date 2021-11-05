class Game {
	constructor({
		players,
		rounds,
		timeLimit,
		currentRound,
		currentTurn,
		countDownTime,
		roundTime,
		roundTimeElapsed,
		cards,
		gameOver
	}) {
    
		if (!rounds) {
			throw 'Game must be initialized with rounds'
		}
    
		if (!timeLimit) {
			throw 'Game must be initialized with a time limit per round'
		}

		this.players = players || []
		this.cards = cards || []

		this.rounds = rounds
		this.timeLimit = timeLimit
		this.gameOver = gameOver || false

		this.currentRound = currentRound || 1
		this.currentTurn = currentTurn || 1
		this.countDownTime = countDownTime || 0
		this.roundTime = roundTime || 0
		this.roundTimeElapsed = roundTimeElapsed || false
	}
  
	get currentPlayer() {
		return this.players[(this.currentTurn - 1) % this.players.length]
	}

	get lastRound() {
		return this.currentRound === this.rounds && this.currentTurn === this.players.length
	}

	get toGraphQLModel() {
		const object = {
			...this
		}
		delete object.players

		return object
	}

}
 
export default Game