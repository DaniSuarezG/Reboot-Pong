let backgroundMusic = new Audio('./assets/audio/background.mp3')
let popSound = new Audio('https://www.epidemicsound.com/track/h7KUVVeWvh/')


// backgroundMusic.play()
/*
function Board() {
    let player = document.querySelector('#player-paddle')
    player.style.left = '120px'
    //let enemy = document.querySelector('#enemy-paddle')

    //console.log(player)
    let board = document.querySelector('#container')

    board.onmousemove = mouseHandler
    //board.addEventListener('mousemove', mouseHandler)

    //console.log((window.innerWidth / 2) - (board.clientLeft / 2))


    function mouseHandler(e) {
        
        //let variable = parseInt(player.style.left.slice(0, player.style.left.length - 2)) + 250
        let playerRight = e.clientX + (250 / 2)
        let playerLeft = e.clientX - (250 / 2)

        if (true) {
            player.style.left = (e.clientX - (window.innerWidth / 2) + (470 / 2) - (250 / 2)) + 'px'
            playerRight = e.clientX + (250 / 2)
            playerLeft = e.clientX - (250 / 2)
            
        }
        //console.log(wallLeft)
        //console.log("MOUSE: " + e.clientX)
        //console.log("PADDLE: " + parseInt(player.style.left.slice(0, player.style.left.length - 2)))
    }

//let game = new Board()*/

//clase game

function Game(){
    let self = this

    this.board = new Board()

    this.btnStart = new BtnStart()
    this.btnReset = new BtnReset()
    this.btnPause = new BtnPause()

    this.player = new Paddle()
    this.enemy  = new Paddle()

    this.scoreBoard = new ScoreBoard()

    this.ball = new Ball()

    this.timerId = null;
    this.timerIdSetUp = null;
    this.timerIdEnemy = null

    this.backgroundAudio = null;

    this.pause = false

    this.world = null;

    this.setUpBoard = function () {
        this.world = document.querySelector('body')

        this.board.createBoard()
        this.btnStart.createStart(this.board.width, this.board.height)
        this.btnReset.createReset(this.board.width, this.board.height)
        this.btnPause.createPause(this.board.width, this.board.height)

        this.player.createPaddle('player', this.board.width, this.board.height)
        this.enemy.createPaddle('enemy', this.board.width, this.board.height)

        this.ball.createBall(this.board.width, this.board.height)
        this.scoreBoard.createScoreBoard(this.board.width, this.board.height)
       
        this.board.html.appendChild(this.scoreBoard.html)
        this.board.html.appendChild(this.ball.html)
        this.board.html.appendChild(this.player.html)
        this.board.html.appendChild(this.enemy.html)
        this.board.html.appendChild(this.btnStart.html)
        this.board.html.appendChild(this.btnReset.html)
        this.board.html.appendChild(this.btnPause.html)

        // this.board.html.addEventListener('mousemove', function(e) {
            //     self.mouseHandler(e)
            // })
            
        this.btnStart.html.onclick = self.startGame
        /*function () {
            backgroundMusic.pause()
            self.pauseGame()
        }*/
        this.btnReset.html.onclick = self.resetGame

        this.backgroundAudio = new Audio('./assets/audio/background.mp3')

        this.world.appendChild(this.board.html)
    }
    
    this.mouseHandler = function (e) {
        let playerRight = e.clientX + (self.player.width / 2)
        let playerLeft  = e.clientX - (self.player.width / 2)
        let playerTop = e.clientY - (self.player.height / 2)
        let playerDown  = e.clientY + (self.player.height / 2)

        let borderRight = (window.innerWidth / 2) + (self.board.width / 2) 
        let borderLeft  = (window.innerWidth / 2) - (self.board.width / 2) 
        let borderTop = (window.innerHeight / 2) - (self.board.height / 2) 
        let borderDown  = (window.innerHeight / 2) + (self.board.height / 2) 

        if (playerRight < borderRight && playerLeft > borderLeft) {
            //this.player.left = (e.clientX - (window.innerWidth / 2) + (this.board.width / 2) - (this.player.width / 2))
            self.player.updateMove((e.clientX - (window.innerWidth / 2) + (self.board.width / 2) - (self.player.width / 2)))
            //this.player.html.style.left = this.player.left + 'px'
        }

        //if (playerTop > borderTop && playerDown < borderDown) {
            //this.player.top = (e.clientY - (window.innerHeight / 2) + (this.board.height / 2) - (this.player.height / 2))
           // this.player.updateMove((e.clientX - (window.innerWidth / 2) + (this.board.width / 2) - (this.player.width / 2)) + 'px')
            //this.player.html.style.top = this.player.top + 'px'

            /*
            playerRight = e.clientX + (250 / 2)
            playerLeft  = e.clientX - (250 / 2)
            */
        //}
    }

    this.enemyHandler = function() {
        let enemyRight = this.enemy.left + this.enemy.width //this.ball.x + this.ball.width / 2 + (this.enemy.width / 2)
        let enemyLeft  = this.enemy.left //this.ball.x + this.ball.width / 2 - (this.enemy.width / 2)
        
        let borderRight = this.board.width 
        let borderLeft  = 0 
        // if (enemyLeft > borderLeft && enemyRight < borderRight) {//} && enemyLeft > borderLeft) {
            if (enemyLeft < borderLeft || enemyRight > borderRight) {
                this.enemy.dir *= -1
            }
            this.enemy.updateMove(20)

            // this.enemy.updateMove(this.ball.x + this.ball.width / 2 - this.enemy.width / 2)
        // }
            // setInterval(this.enemy.updateMove(null), 40)
    }

    this.bounceHandler = function () {        
        if (this.ball.borderCollision(this.board, this.scoreBoard)) {
            this.pauseGame()
        }
        this.ball.playerCollision(this.player)
        this.ball.playerCollision(this.enemy)
        // if (this.ball.playerCollision(this.enemy)) {
        //     if (this.enemy.erratic) {
        //         this.enemy.erratic--
        //     } else {
        //         this.enemy.erratic = Math.round(Math.random() * 10)
        //     }
        // }
    }

    this.startGame = function() {
        self.timerIdSetUp = setTimeout(function () {
            self.btnStart.html.style.top = '400px'
            self.btnStart.html.style.display = 'none'
            self.board.html.style.cursor = 'none'

            self.board.html.onmousemove = self.mouseHandler
            self.btnReset.html.onclick = self.resetGame
            self.btnPause.html.onclick = self.pauseGameBtn

            self.ball.html.style.display = ''
            self.player.html.style.display = ''
            self.enemy.html.style.display = ''
            
            // self.board.html.appendChild(self.ball.html)

            // self.world.removeChild(self.board.html)
            // self.world.appendChild(self.board.html)

            self.scoreBoard.spanPlayer.classList.remove('noShowSB')
            self.scoreBoard.spanEnemy.classList.remove('noShowSB')
            self.scoreBoard.spanSeparator.classList.remove('noShowSB')

            self.timerIdFaster = setInterval(function() {
                self.ball.step++
                console.log(`MAS RAPIDO ${self.ball.step}`)
            }, 4000)
            // self.scoreBoard.spanPlayer.classList.add('showSB')
            // self.scoreBoard.spanEnemy.classList.add('showSB')
            // self.scoreBoard.spanSeparator.classList.add('showSB')
            
            // self.timerIdEnemy = setInterval(this.enemy.updateMove(), 40)

            popSound.play()
            backgroundMusic.play()

            self.timerId = setInterval(function() {
                self.ball.move()
                self.bounceHandler()
                self.enemyHandler()
            }, 35)
        }, 0.4)
    }

    this.pauseGame = function () {
        clearInterval(self.timerId)
        clearInterval(self.timerIdEnemy)
        clearInterval(self.timerIdFaster)

        clearTimeout(self.timerIdSetUp)

        self.board.html.style.cursor = ''
        self.btnStart.html.style.display = ''

        self.btnStart.html.onclick = self.startGame

        self.board.html.onmousemove = null

        self.enemy.dir = 1

        self.player.resetPaddle(self.board.width, self.board.height)
        self.enemy.resetPaddle(self.board.width, self.board.height)
        self.ball.resetBall(self.board.width, self.board.height)
    }

    this.pauseGameBtn = function () {
        if (self.pause) {
            self.pause = false
            self.startGame()
        } else {
            self.pause = true

            backgroundMusic.pause()

            clearInterval(self.timerId)
            clearInterval(self.timerIdEnemy)
            clearInterval(self.timerIdFaster)

            self.board.html.onmousemove = ''
        }

        // backgroundMusic.pause()

        // clearInterval(self.timerId)
        // clearInterval(self.timerIdEnemy)
        // clearInterval(self.timerIdFaster)

        // self.board.html.onmousemove = null
    }

    this.resetGame = function () {
        clearInterval(self.timerId)
        clearInterval(self.timerIdEnemy)
        clearInterval(self.timerIdFaster)

        self.pause = false

        self.world.removeChild(self.board.html)
        self.setUpBoard()

        backgroundMusic.load()

        self.btnReset.html.onclick = ''
        self.btnPause.html.onclick = ''

    }
}

//clase board
function Board(){
    this.height = 700
    this.ratio  = 4/7
    this.width  = this.height * this.ratio
    
    this.html   = null

    this.createBoard = function (){
        this.html    = document.createElement('div')

        this.html.id = 'board'

        this.html.classList.add('glowing')

        this.html.style.height = this.height + 'px'    
        this.html.style.width  = this.width + 'px' 
    }
}

//clase paddle con dos objetos
function Paddle(){
    let self  = this

    this.height = 20 //DEFAULT: 20
    this.width  = 150 //DEFAULT: 150

    this.left = 0
    this.top  = 0
    this.pos  = 0

    this.roll = ""

    this.html   = null

    this.createPaddle = function(classP, width, height){
        switch (classP) {
            case 'player': this.pos = 0.9; break
            case 'enemy': this.pos = 0.1; this.dir = 1; break
        }

        this.roll = classP
        
        this.html = document.createElement('div')
        
        this.html.id = `${classP}-paddle`
        this.html.classList.add('paddle')
        
        this.html.style.height = this.height + 'px'
        this.html.style.width  = this.width + 'px'
        
        this.left = ((width / 2) - (this.width / 2)) // width
        this.top  = height * this.pos
        this.html.style.left = this.left + 'px'
        this.html.style.top  = this.top + 'px'

        this.html.style.display = 'none'

        // console.log(this)
    }

    this.updateMove = function (left){
        switch (this.roll) {
            case 'player': self.left = left; break
            case 'enemy': 
                // let left2 = 5
                // let borderRight = board.width
                // let borderLeft = 0 

                // let enemyRight = ball.x + ball.width / 2 + (this.width / 2)
                // let enemyLeft  = ball.x + ball.width / 2 - (this.width / 2)

                // if (enemyLeft > borderLeft && enemyRight < borderRight) {//} && enemyLeft > borderLeft) {
                //     console.log("ENTRA")
                //     if (enemyLeft <= borderLeft || enemyRight > borderRight) {
                //         left2 *= -1
                //     }
                    self.left += left * self.dir
                // }
                //     if (this.erratic) {
                //         self.left = left; break 
                //     } else {
                //         self.left = width - left//IMPLEMENTAR MOVIMIENTO ERRÁTICO
                //     }
                // }
        }
        //self.left = left
        self.html.style.left = self.left + 'px'
        //console.log(Math.round(Math.random() * 10))
    }

    this.resetPaddle = function(width, height) {
        this.left = ((width / 2) - (this.width / 2))
        this.top  = height * this.pos
        this.html.style.left = this.left + 'px'
        this.html.style.top  = this.top + 'px'
        this.html.style.display = 'none'
        // if (this.roll == 'enemy') {
        //     this.erratic = Math.round(Math.random() * 10);
        // }
    }
}

//clase para la bola
function Ball(){
    let self = this

    this.width = 30
    this.height = 30

    this.x = 200
    this.y = 350

    this.ballTop = this.y
    this.ballBottom = this.y + this.height
    this.ballLeft = this.x
    this.ballRight = this.x + this.width

    this.dir  = '' // direccion
    this.step = 5    // velocidad
    this.html = null;

    
    /*this.update = function() {
        console.log('UODATE')
        self.html.style.transform = `translate(${this.x + 5} px, ${this.y + 5} px)` 
    }*/
    
    this.createBall = function (width, height) {
        this.html = document.createElement('div')
    
        this.html.classList.add('ball')
        this.html.classList.add('glowing')
    
        this.x = width / 2
        this.y = height / 2

        this.html.style.left = `${this.x - this.height / 2}px`
        this.html.style.top  = `${this.y - this.width / 2}px`

        this.html.style.height = `${this.height}px`
        this.html.style.width  = `${this.width}px`

        this.html.style.display = 'none'

        switch (Math.ceil(Math.random() * 4)) {
            case 1: this.dir = 'UL'; break
            case 2: this.dir = 'UR'; break
            case 3: this.dir = 'DL'; break
            case 4: this.dir = 'DR'; break
        }
    }

    this.resetBall = function(width, height) {
        this.x = width / 2 //200
        this.y = height / 2 //350
        this.html.style.left = `${this.x - this.height / 2}px`
        this.html.style.top  = `${this.y - this.width / 2}px`
        this.html.style.display = 'none'

        this.step = 5

        switch (Math.ceil(Math.random() * 4)) {
            case 1: this.dir = 'UL'; break
            case 2: this.dir = 'UR'; break
            case 3: this.dir = 'DL'; break
            case 4: this.dir = 'DR'; break
        }
        // this.html.style.display = ''
    }

    this.move = function(){
        
        switch(self.dir){
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

    this.speed = function(speed) {
        this.step = speed
    } 

    this.changeDir = function(dir) {
        this.dir = dir
    }

    this.borderCollision = function(board, scoreBoard) {
        let borderRight = board.width
        let borderLeft = 0
        let borderTop = 0
        let borderBottom = board.height

        if (self.ballRight >= borderRight) { 
            if(self.dir === 'UR'){
                self.changeDir('UL')
            }else if (self.dir === 'DR'){
                self.changeDir('DL')
            }
        }

        if (self.ballLeft <= borderLeft) {
            if (self.dir === 'UL') {
                self.changeDir('UR')
            } else if (self.dir === 'DL') {
                self.changeDir('DR')
            }
        }

        if (self.ballTop <= borderTop) { 
            scoreBoard.updateScores('player')
            return true
            if (self.dir === 'UR') {
                self.changeDir('DR')
            } else if (self.dir === 'UL') {
                self.changeDir('DL')
            }
        }

        if (self.ballBottom >= borderBottom) { 
            scoreBoard.updateScores('enemy')
            return true
            if (self.dir === 'DL') {
                self.changeDir('UL')
            } else if (self.dir === 'DR') {
                self.changeDir('UR')
            }
        }
    }

    this.playerCollision = function (player) {
        //console.log(self.pixels.map(elem => elem.map(elem => obj.pixels.reduce(elem => elem.includes()).includes(elem))).reduce(elem => elem == true))
        //console.log(self.pixels[2].map(elem => obj.pixels[2].includes(elem)))
        //console.log(this.html.getBoundingClientRect())

        let paddleRight  = player.left + player.width
        let paddleLeft   = player.left
        let paddleTop    = player.top
        let paddleBottom = player.top + player.height

        /*if ((this.ballLeft  <= paddleRight) &&
            (this.ballRight >= paddleLeft) &&
            (this.ballTop    <= paddleDown) &&
            (this.ballBottom  >= paddleUp)) {*/

        switch (player.roll) {
            case 'player':
                if (self.ballBottom >= paddleTop &&
                    self.ballRight >= paddleLeft &&
                    self.ballLeft < paddleRight &&
                    self.ballTop < paddleTop) {
                    console.log("COLISION PLAYER")
                    switch(self.dir) {
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
                    switch(self.dir) {
                        case 'UL':
                            self.dir = 'DL'
                            break
                        case 'UR':
                            self.dir = 'DR'
                            break
                    }
                    // return true
                };
                break
        }
        //}
    }

}

function ScoreBoard(){
    let self = this

    this.width = 250
    this.height = 250

    this.left = 0
    this.top = 0

    this.playerPoints = 0
    this.enemyPoints = 0

    this.html = null
    
    this.createScoreBoard = function (width, height){
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

        // this.html.style.lineHeight = this.height + 'px'

    }

    this.updateScores = function(who) {
        switch(who) {
            case 'player': self.playerPoints++; break
            case 'enemy': self.enemyPoints++; break
        }
        self.spanPlayer.innerText = `${self.playerPoints}`
        self.spanEnemy.innerText = `${self.enemyPoints}`
    }
}

function BtnStart(){
    let self = this

    this.height = 50
    this.width  = 80

    this.left = 0
    this.top  = 0

    this.html = null

    this.createStart = function (width, height){
        this.html    = document.createElement('div')

        this.html.id = 'start'

        this.html.innerText = 'Start'

        this.left = width / 2 - this.width / 2
        this.top  = height / 2 - this.height / 2

        // this.html.style.height = `${this.height}px`
        // this.html.style.width  = `${this.width}px` 
        // this.html.style.left   = `${this.left}px`
        // this.html.style.top    = `${this.top}px`
    }
}

function BtnReset() {
    let self = this
    this.height = 70
    this.width = 139
    this.left = 0
    this.top = 0

    this.html = null

    this.createReset = function (width, height) {
        this.html = document.createElement('div')

        this.html.onmousemove = ''

        this.html.id = 'btnReset'        

        this.html.innerText = 'Reset'

        this.left = width / 4 - this.width / 2
        this.top = height + height / 10

        this.html.style.left = this.left + 'px'
        this.html.style.top = this.top + 'px'
        this.html.style.width = this.width + 'px'
        this.html.style.height = this.height + 'px'
    }
}

function BtnPause() {
    let self = this
    this.height = 70
    this.width = 139
    this.left = 0
    this.top = 0

    this.html = null

    this.createPause = function (width, height) {
        this.html = document.createElement('div')

        this.html.onmousemove = ''

        this.html.id = 'btnPause'

        this.html.innerText = 'Pause'

        this.left = width / 4 * 3 - this.width / 2
        this.top = height + height / 10

        this.html.style.left = this.left + 'px'
        this.html.style.top = this.top + 'px'
        this.html.style.width = this.width + 'px'
        this.html.style.height = this.height + 'px'
    }
}
let game = new Game()
game.setUpBoard()
// game.startGame()
console.log(game)