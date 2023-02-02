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
    // this.enemy  = new Paddle()

    this.ball = new Ball()

    this.setUpBoard = function () {
        let world   =  document.querySelector('body')

        this.board.createBoard()
        this.player.createPaddle('player', this.board.width)

        //this.player.html.style.left = ((this.board.width / 2) - (this.player.width / 2)) + 'px'

        this.ball.createBall()

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
            this.player.html.style.left = 
            (e.clientX - (window.innerWidth / 2) + (this.board.width / 2) - (this.player.width / 2)) + 'px'

            /*
            playerRight = e.clientX + (250 / 2)
            playerLeft  = e.clientX - (250 / 2)
            */
        }
    }

    this.timerId = setInterval(this.ball.update, 200)
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

    this.createPaddle = function(classP, width){
        this.html     = document.createElement('div')
        this.html.id  = `${classP}-paddle`
        this.html.classList.add('paddle')
        this.html.style.height = this.height + 'px'
        this.html.style.width  = this.width + 'px'
        this.html.style.left = ((width / 2) - (this.width / 2)) + 'px'

    }
}

//clase para la bola
function Ball(){
    this.x = 0
    this.y = 0
    this.html = null

    this.createBall = function () {
        this.html   = document.createElement('div')
        this.html.classList.add('ball')
    }

    this.update = function() {
        //console.log(this)
        this.html.style.transform = `translate(${this.x + 5} px, ${this.y + 5} px)` 
    }

}

let game = new Game()
game.setUpBoard()
console.log(game)