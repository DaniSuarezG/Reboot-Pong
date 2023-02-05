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
    this.enemy  = new Paddle()
    this.timerId = null;

    this.ball = new Ball()

    this.setUpBoard = function () {
        let world   =  document.querySelector('body')

        this.board.createBoard()

        this.player.createPaddle('player', this.board.width, this.board.height)
        this.enemy.createPaddle('enemy', this.board.width, this.board.height)
       
        this.board.html.appendChild(this.ball.html)
        this.board.html.appendChild(this.player.html)
        this.board.html.appendChild(this.enemy.html)

        //this.board.html.onmousemove = this.mouseHandler 
        this.board.html.addEventListener('mousemove', function(e) {
            self.mouseHandler(e)
        })

        world.appendChild(this.board.html)
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
            self.player.updateMove((e.clientX - (window.innerWidth / 2) + (this.board.width / 2) - (this.player.width / 2)))
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
        let enemyRight = this.ball.x + this.ball.width / 2 + (this.enemy.width / 2)
        let enemyLeft  = this.ball.x + this.ball.width / 2 - (this.enemy.width / 2)
        
        let borderRight = this.board.width 
        let borderLeft  = 0 
        if (enemyLeft > borderLeft && enemyRight < borderRight) {//} && enemyLeft > borderLeft) {
            this.enemy.updateMove(this.ball.x + this.ball.width / 2 - this.enemy.width / 2)
        }
    }

    this.bounceHandler = function () {        
        this.ball.borderCollision(this.board)
        this.ball.playerCollision(this.player)
        this.ball.playerCollision(this.enemy)
    }

    this.startGame = function() {
        setInterval(function() {
            self.ball.move()
            self.bounceHandler()
            self.enemyHandler()
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
    let self  = this

    this.height = 20 //DEFAULT: 20
    this.width  = 150 //DEFAULT: 150
    this.left   = 0
    this.top    = 0

    this.roll = ""

    this.html   = null

    this.createPaddle = function(classP, width, height){
        let pos = 0
        switch (classP) {
            case 'player': pos = 0.9; break
            case 'enemy': pos = 0.1; break
        }

        this.roll = classP
        
        this.html = document.createElement('div')
        
        this.html.id = `${classP}-paddle`
        this.html.classList.add('paddle')
        
        this.html.style.height = this.height + 'px'
        this.html.style.width  = this.width + 'px'
        
        this.left = ((width / 2) - (this.width / 2)) // width
        this.top  = height * pos
        this.html.style.left = this.left + 'px'
        this.html.style.top  = this.top + 'px'
    }

    this.updateMove = function(left){
        switch (this.roll) {
            case 'player': self.left = left; break
            case 'enemy': self.left = left; break //IMPLEMENTAR MOVIMIENTO ERRÁTICO
        }
        //self.left = left
        self.html.style.left = self.left + 'px'
        //console.log(Math.round(Math.random() * 10))
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

    this.dir  = 'UR' // direccion
    this.step = 5    // velocidad

    this.html = document.createElement('div')

    this.html.classList.add('ball')

    this.html.style.left = `${this.x}px`
    this.html.style.top  = `${this.y}px`
    this.html.style.height = `${this.height}px`
    this.html.style.width  = `${this.width}px`
   
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

        self.ballRight = self.x + self.width
        self.ballLeft = self.x
        self.ballTop = self.y
        self.ballBottom = self.y + self.height
    }

    this.speed = function(speed) {
        this.step = speed
    } 

    this.changeDir = function(dir) {
        this.dir = dir
    }

    this.borderCollision = function(board) {
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
            if (self.dir === 'UR') {
                self.changeDir('DR')
            } else if (self.dir === 'UL') {
                self.changeDir('DL')
            }
        }

        if (self.ballBottom >= borderBottom) { 
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
                };
                break
        }
        //}
    }

}

let game = new Game()
game.setUpBoard()
game.startGame()
console.log(game)