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
}

//let game = new Board()*/

//clase game

function Game(){
    let self = this
    this.board  = new Board()
    this.player = new Paddle()
    this.timerId = null;
    // this.enemy  = new Paddle()

    this.ball = new Ball()

    this.setUpBoard = function () {
        let world   =  document.querySelector('body')

        this.board.createBoard()
        this.player.createPaddle('player', this.board.width, this.board.height)

        //this.player.html.style.left = ((this.board.width / 2) - (this.player.width / 2)) + 'px'

       
        this.board.html.appendChild(this.ball.html)

        this.board.html.appendChild(this.player.html)
        //this.board.html.onmousemove = this.mouseHandler 
        this.board.html.addEventListener('mousemove', function(e) {
            self.mouseHandler(e)
        })

        
        //this.board.html.appendChild(this.enemy.html)

        world.appendChild(this.board.html)
    }
    

    this.mouseHandler = function (e) {
        let playerRight = e.clientX + (this.player.width / 2)
        let playerLeft  = e.clientX - (this.player.width / 2)

        let borderRight = (window.innerWidth / 2) + (this.board.width / 2) 
        let borderLeft  = (window.innerWidth / 2) - (this.board.width / 2) 

        if (playerRight < borderRight && playerLeft > borderLeft) {
            this.player.left = (e.clientX - (window.innerWidth / 2) + (this.board.width / 2) - (this.player.width / 2))
           // this.player.updateMove((e.clientX - (window.innerWidth / 2) + (this.board.width / 2) - (this.player.width / 2)) + 'px')
            this.player.html.style.left = this.player.left + 'px'

            /*
            playerRight = e.clientX + (250 / 2)
            playerLeft  = e.clientX - (250 / 2)
            */
        }
    }

    this.bounceHandler = function () {
        let borderRight = this.board.width
        let borderLeft  = 0
        let borderUp    = 0
        let borderDown  = this.board.height

        let paddleRight = this.player.left + this.player.width
        let paddleLeft  = this.player.left
        let paddleUp    = this.player.top
        let paddleDown  = this.player.top + this.player.height

       //console.log("paddle: ", paddleDown, paddleLeft, paddleRight, paddleUp)
       // console.log(this.player.html.style)

        let ballRight = this.ball.x + 30
        let ballLeft = this.ball.x
        let ballUp = this.ball.y
        let ballDown = this.ball.y + 30
         

        if (ballRight >= borderRight) { 
            if(this.ball.dir === 'UR'){
                this.ball.changeDir('UL')
            }else if (this.ball.dir === 'DR'){
                this.ball.changeDir('DL')
            }
        }

        if (ballLeft <= borderLeft) {
            if (this.ball.dir === 'UL') {
                this.ball.changeDir('UR')
            } else if (this.ball.dir === 'DL') {
                this.ball.changeDir('DR')
            }
        }

        if (ballUp <= borderUp) { 
            if (this.ball.dir === 'UR') {
                this.ball.changeDir('DR')
            } else if (this.ball.dir === 'UL') {
                this.ball.changeDir('DL')
            }
        }

        if (ballDown >= borderDown) { 
            if (this.ball.dir === 'DL') {
                this.ball.changeDir('UL')
            } else if (this.ball.dir === 'DR') {
                this.ball.changeDir('UR')
            }
        }

         if ((ballLeft  <= paddleRight) &&
             (ballRight >= paddleLeft) &&
             (ballUp    <= paddleDown) &&
             (ballDown  >= paddleUp)){
                console.log("hay colision")
                /*if(ballLeft <= paddleRight){
                    console.log("por la derecha")
                    if (this.ball.dir === `DL`) {
                        this.ball.dir = 'DR'
                    } else if (this.ball.dir === 'UL') {
                        this.ball.dir = 'UR'
                    }
                }*/

                if (this.ball.dir === `DL`){
                    if (ballLeft <= paddleRight){
                        this.ball.dir = 'DR'
                    } else if (ballDown >= paddleUp){
                        this.ball.dir = 'UL'
                    }
                }

                if (this.ball.dir === `DR`){
                    if (ballRight >= paddleLeft){
                        this.ball.dir = 'DL'
                    } else if (ballDown >= paddleUp){
                        this.ball.dir = 'UR'
                    }
                }

                if (this.ball.dir === 'UL') {
                    if (ballUp <= paddleDown) {
                        this.ball.dir = 'DL'
                    } else if (ballLeft <= paddleRight) {
                        this.ball.dir = 'UR'
                    }
                }

                if (this.ball.dir === 'UR') {
                    if (ballUp <= paddleDown) {
                        this.ball.dir = 'DR'
                    } else if (ballRight >= paddleLeft) {
                        this.ball.dir = 'UL'
                    }
                }




                /*if(ballRight >= paddleLeft){
                    console.log("por la izquierda")
                    if (this.ball.dir === `DR`) {
                        this.ball.dir = 'DL'
                    } else if (this.ball.dir === 'UR') {
                        this.ball.dir = 'UL'
                    }
                }

                if(ballDown >= paddleUp){
                    console.log("por arriba")
                    if(this.ball.dir === `DR`){
                        this.ball.dir = 'UR'
                    } else if(this.ball.dir === 'DL'){
                        this.ball.dir = 'UL'
                    }
                }

                if (ballUp <= paddleDown){
                    console.log("por abajo")
                    if (this.ball.dir === `UR`) {
                        this.ball.dir = 'DR'
                    } else if (this.ball.dir === 'UL') {
                        this.ball.dir = 'DL'
                    }
                }*/
            }

       /* if ((ballDown === paddleUp || ballUp === paddleDown ) && ballLeft <= paddleRight && ballRight >= paddleLeft) {
            console.log('hay colisión')
        }*/
    }

    this.startGame = function() {
        setInterval(function() {
            self.ball.move()
            self.bounceHandler()
        }, 35)
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
        this.html.style.height = this.height + 'px'    
        this.html.style.width  = this.width + 'px' 
    }
}

//clase paddle con dos objetos
function Paddle(){
    this.height = 20
    this.width  = 150
    this.html   = null
    this.left = 0
    this.top = 0

    this.createPaddle = function(classP, width, height){
        this.html     = document.createElement('div')
        this.html.id  = `${classP}-paddle`
        this.html.classList.add('paddle')
        this.html.style.height = this.height + 'px'
        this.html.style.width  = this.width + 'px'
        this.left = width
        this.html.style.left = ((width / 2) - (this.width / 2)) + 'px'
        this.top = height * 0.5
        this.html.style.top = this.top + 'px'
    }

    this.updateMove = function(left){
        this.left = left
        this.html.style.left = this.left + 'px'
    }
}

//clase para la bola
function Ball(){
    let self  = this
    this.x    = 200
    this.y    = 350
    this.dir  = 'UR' // direccion
    this.step = 5    // velocidad
    this.html = document.createElement('div')
    this.html.classList.add('ball')
    self.html.style.left = `${self.x}px`
    self.html.style.top  = `${self.y}px`
   
    /*this.update = function() {
        console.log('UODATE')
        self.html.style.transform = `translate(${this.x + 5} px, ${this.y + 5} px)` 
    }*/


    this.move = function(){
        
        switch(self.dir){
            case 'UR':
                self.x += self.step
                self.y -= self.step                   
                break;
            case 'UL':
                self.x -= self.step
                self.y -= self.step 
                break
            case 'DR':
                self.x += self.step
                self.y += self.step 
                break
            case 'DL': 
                self.x -= self.step
                self.y += self.step 
        }
        self.html.style.left = `${self.x}px`
        self.html.style.top = `${self.y}px`        
    }

    this.speed = function(speed) {
        this.step = speed
    } 

    this.changeDir = function(dir) {
        this.dir = dir
    }


}

let game = new Game()
game.setUpBoard()
game.startGame()
console.log(game)