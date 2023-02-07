import {
    popSound,
    metalSmallBellSound,
    zippoSound,
    powerUpSound,
    metalHardDropSound
} from '../src/audio.js'

function Ball() {
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

    this.createBall = function (width, height) {
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

    this.resetBall = function (width, height) {
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

    this.move = function () {

        switch (self.dir) {
            case 'UR':
                self.x += self.step
                self.y -= self.step
                this.html.classList.add('glowingUR')
                this.html.classList.remove('glowingDL')
                this.html.classList.remove('glowingDR')
                this.html.classList.remove('glowingUL')
                break

            case 'UL':
                self.x -= self.step
                self.y -= self.step
                this.html.classList.add('glowingUL')
                this.html.classList.remove('glowingDL')
                this.html.classList.remove('glowingDR')
                this.html.classList.remove('glowingUR')
                break

            case 'DR':
                self.x += self.step
                self.y += self.step
                this.html.classList.add('glowingDR')
                this.html.classList.remove('glowingDL')
                this.html.classList.remove('glowingUL')
                this.html.classList.remove('glowingUR')
                break

            case 'DL':
                self.x -= self.step
                self.y += self.step
                this.html.classList.add('glowingDL')
                this.html.classList.remove('glowingDR')
                this.html.classList.remove('glowingUL')
                this.html.classList.remove('glowingUR')
                break

        }
        self.html.style.left = `${self.x - self.width / 2}px`
        self.html.style.top = `${self.y - self.height / 2}px`

        self.ballRight = self.x + self.width / 2
        self.ballLeft = self.x - self.width / 2
        self.ballTop = self.y - self.height / 2
        self.ballBottom = self.y + self.height / 2
    }

    this.speed = function (speed) {
        this.step = speed
    }

    this.changeDir = function (dir) {
        this.dir = dir
    }

    this.borderCollision = function (board, scoreBoard) {
        let borderRight = board.width
        let borderLeft = 0
        let borderTop = 0
        let borderBottom = board.height

        if (self.ballRight >= borderRight) {
            self.sound()
            if (self.dir === 'UR') {
                self.changeDir('UL')
            } else if (self.dir === 'DR') {
                self.changeDir('DL')
            }
        }

        if (self.ballLeft <= borderLeft) {
            self.sound()
            if (self.dir === 'UL') {
                self.changeDir('UR')
            } else if (self.dir === 'DL') {
                self.changeDir('DR')
            }
        }

        if (self.ballTop <= borderTop) {
            scoreBoard.updateScores('player')
            powerUpSound.play()
            return true
            /******** Future Feature? ********/
            if (self.dir === 'UR') {
                self.changeDir('DR')
            } else if (self.dir === 'UL') {
                self.changeDir('DL')
            }
            /*********************************/
        }

        if (self.ballBottom >= borderBottom) {
            scoreBoard.updateScores('enemy')
            metalHardDropSound.play()
            return true
            /******** Future Feature? ********/
            if (self.dir === 'DL') {
                self.changeDir('UL')
            } else if (self.dir === 'DR') {
                self.changeDir('UR')
            }
            /*********************************/
        }
    }

    this.playerCollision = function (player) {

        let paddleRight = player.left + player.width
        let paddleLeft = player.left
        let paddleTop = player.top
        let paddleBottom = player.top + player.height

        switch (player.roll) {
            case 'player':
                if (self.ballBottom >= paddleTop &&
                    self.ballRight >= paddleLeft &&
                    self.ballLeft < paddleRight &&
                    self.ballTop < paddleTop) {
                    console.log("COLISION PLAYER")
                    popSound.play()
                    switch (self.dir) {
                        case 'DL':
                            self.dir = 'UL'
                            break
                        case 'DR':
                            self.dir = 'UR'
                            break
                    }
                };
                break

            case 'enemy':
                if (self.ballBottom >= paddleTop &&
                    self.ballRight >= paddleLeft &&
                    self.ballLeft < paddleRight &&
                    self.ballTop < paddleBottom) {
                    console.log("COLISION ENEMY")
                    popSound.play()

                    switch (self.dir) {
                        case 'UL':
                            self.dir = 'DL'
                            break
                        case 'UR':
                            self.dir = 'DR'
                            break
                    }
                };
                break
        }
    }

    this.sound = function () {
        let rand = Math.ceil(Math.random() * 2)

        console.log(rand)

        switch (rand) {
            case 1: zippoSound.play(); break
            case 2: metalSmallBellSound.play(); break
        }

    }

}

export {Ball}