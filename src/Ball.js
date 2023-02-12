import {
    popSound,
    metalSmallBellSound,
    zippoSound,
    powerUpSound,
    metalHardDropSound
} from '../src/audio.js'

class Ball {
    constructor() {
        let self = this

        this.width = 30
        this.height = 30

        this.x = 200
        this.y = 350

        this.ballTop = this.y
        this.ballBottom = this.y + this.height
        this.ballLeft = this.x
        this.ballRight = this.x + this.width

        this.dir = '' // direccion
        this.step = 5    // velocidad
        this.html = null;
    }

    createBall(width, height) {
        this.html = document.createElement('div')

        this.html.classList.add('ball')
        this.html.classList.add('glowing')

        this.x = width / 2
        this.y = height / 2

        this.html.style.left = `${this.x - this.height / 2}px`
        this.html.style.top = `${this.y - this.width / 2}px`

        this.html.style.height = `${this.height}px`
        this.html.style.width = `${this.width}px`

        this.html.style.display = 'none'

        switch (Math.ceil(Math.random() * 4)) {
            case 1: this.dir = 'UL'; break
            case 2: this.dir = 'UR'; break
            case 3: this.dir = 'DL'; break
            case 4: this.dir = 'DR'; break
        }
    }

    resetBall(width, height) {
        this.x = width / 2 //200
        this.y = height / 2 //350
        this.html.style.left = `${this.x - this.height / 2}px`
        this.html.style.top = `${this.y - this.width / 2}px`
        this.html.style.display = 'none'

        this.step = 5

        switch (Math.ceil(Math.random() * 4)) {
            case 1: this.dir = 'UL'; break
            case 2: this.dir = 'UR'; break
            case 3: this.dir = 'DL'; break
            case 4: this.dir = 'DR'; break
        }
    }

    move() {
        switch (this.dir) {
            case 'UR':
                this.x += this.step
                this.y -= this.step
                this.html.classList.add('glowingUR')
                this.html.classList.remove('glowingDL')
                this.html.classList.remove('glowingDR')
                this.html.classList.remove('glowingUL')
                break

            case 'UL':
                this.x -= this.step
                this.y -= this.step
                this.html.classList.add('glowingUL')
                this.html.classList.remove('glowingDL')
                this.html.classList.remove('glowingDR')
                this.html.classList.remove('glowingUR')
                break

            case 'DR':
                this.x += this.step
                this.y += this.step
                this.html.classList.add('glowingDR')
                this.html.classList.remove('glowingDL')
                this.html.classList.remove('glowingUL')
                this.html.classList.remove('glowingUR')
                break

            case 'DL':
                this.x -= this.step
                this.y += this.step
                this.html.classList.add('glowingDL')
                this.html.classList.remove('glowingDR')
                this.html.classList.remove('glowingUL')
                this.html.classList.remove('glowingUR')
                break

        }
        this.html.style.left = `${this.x - this.width / 2}px`
        this.html.style.top = `${this.y - this.height / 2}px`

        this.ballRight = this.x + this.width / 2
        this.ballLeft = this.x - this.width / 2
        this.ballTop = this.y - this.height / 2
        this.ballBottom = this.y + this.height / 2
    }

    set speed(speed) {
        this.step = speed
    }

    set changeDir(dir) {
        this.dir = dir
    }

    borderCollision(board, scoreBoard) {
        let borderRight = board.width
        let borderLeft = 0
        let borderTop = 0
        let borderBottom = board.height
        
// console.log(scoreBoard)

        if (this.ballRight >= borderRight) {
            this.sound()
            if (this.dir === 'UR') {
                this.changeDir = 'UL'
            } else if (this.dir === 'DR') {
                this.changeDir = 'DL'
            }
        }

        if (this.ballLeft <= borderLeft) {
            this.sound()
            if (this.dir === 'UL') {
                this.changeDir = 'UR'
            } else if (this.dir === 'DL') {
                this.changeDir = 'DR'
            }
        }

        if (this.ballTop <= borderTop) {
            scoreBoard.updateScores = 'player'
            powerUpSound.play()
            console.log("COLISION BORDE SUPERIOR")
            /******** Future Feature? ********/
            if (this.dir === 'UR') {
                this.changeDir = 'DR'
            } else if (this.dir === 'UL') {
                this.changeDir = 'DL'
            }
            /*********************************/
            return true
        }

        if (this.ballBottom >= borderBottom) {
            scoreBoard.updateScores = 'enemy'
            metalHardDropSound.play()
            console.log("COLISION BORDE INFERIOR")
            /******** Future Feature? ********/
            if (this.dir === 'DL') {
                this.changeDir = 'UL'
            } else if (this.dir === 'DR') {
                this.changeDir = 'UR'
            }
            /*********************************/
            return true
        }
    }

    playerCollision(player) {

        let paddleRight = player.left + player.width
        let paddleLeft = player.left
        let paddleTop = player.top
        let paddleBottom = player.top + player.height
// console.log(player)
        switch (player.roll) {
            case 'player':
                if (this.ballBottom >= paddleTop &&
                    this.ballRight >= paddleLeft &&
                    this.ballLeft < paddleRight &&
                    this.ballTop < paddleTop) {
                    console.log("COLISION PLAYER")
                    popSound.play()
                    switch (this.dir) {
                        case 'DL':
                            this.dir = 'UL'
                            break
                        case 'DR':
                            this.dir = 'UR'
                            break
                    }
                };
                break

            case 'enemy':
                if (this.ballBottom >= paddleTop &&
                    this.ballRight >= paddleLeft &&
                    this.ballLeft < paddleRight &&
                    this.ballTop < paddleBottom) {
                    console.log("COLISION ENEMY")
                    popSound.play()

                    switch (this.dir) {
                        case 'UL':
                            this.dir = 'DL'
                            break
                        case 'UR':
                            this.dir = 'DR'
                            break
                    }
                };
                break
        }
    }

    sound() {
        let rand = Math.ceil(Math.random() * 2)

        switch (rand) {
            case 1: zippoSound.play(); break
            case 2: metalSmallBellSound.play(); break
        }

    }

}

export {Ball}