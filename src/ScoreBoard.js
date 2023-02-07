function ScoreBoard() {
    let self = this

    this.width = 250
    this.height = 250

    this.left = 0
    this.top = 0

    this.playerPoints = 0
    this.enemyPoints = 0

    this.html = null

    this.createScoreBoard = function (width, height) {
        this.html = document.createElement('div')

        this.spanPlayer = document.createElement('div')
        this.spanEnemy = document.createElement('div')
        this.spanSeparator = document.createElement('div')

        this.spanPlayer.innerText = `${this.playerPoints}`
        this.spanEnemy.innerText = `${this.enemyPoints}`
        this.spanSeparator.innerText = `:`

        this.spanPlayer.classList.add('noShowSB')
        this.spanEnemy.classList.add('noShowSB')
        this.spanSeparator.classList.add('noShowSB')

        this.html.id = 'scoreBoard'
        this.html.classList.add('glowing')


        this.html.appendChild(this.spanPlayer)
        this.html.appendChild(this.spanSeparator)
        this.html.appendChild(this.spanEnemy)

        this.top = height * 0.5 - this.height / 2
        this.left = width * 0.5 - this.width / 2
        this.html.style.left = this.left + 'px'
        this.html.style.top = this.top + 'px'
        this.html.style.width = this.width + 'px'
        this.html.style.height = this.height + 'px'

    }

    this.updateScores = function (who) {
        switch (who) {
            case 'player': self.playerPoints++; break
            case 'enemy': self.enemyPoints++; break
        }
        self.spanPlayer.innerText = `${self.playerPoints}`
        self.spanEnemy.innerText = `${self.enemyPoints}`
    }
}

export {ScoreBoard}