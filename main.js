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
    this.board  = new Board()
    this.player = new Paddle()
    this.enemy  = new Paddle()
    
    this.world =  document.querySelector('body')

    let playerHtml = this.player.innerHTML
    let enemyHtml = this.enemy.innerHTML
    this.board.html.appendChild(this.player.html)
    this.world.appendChild(this.board.html)
}

//clase board
function Board(){
    this.createHTML = function (){
        this.html = document.createElement('div')
        this.html.id = 'board'
    }
    this.createHTML()
    this.height = 700
    this.html.style.height = this.height + 'px'   
    this.width = this.height * this.ratio
    this.html.style.width = this.width + 'px' 
}
Board.prototype.ratio = 4/7

//clase paddle con dos objetos
function Paddle(){
    
    this.createHTML = function(){
        this.html = document.createElement('div')
        this.html.id = 'player-paddle'
        this.html.classList.add('paddle')
    }
    this.createHTML()
    this.height = 30
    this.html.style.height = this.height + 'px'
    this.width = 250
    this.html.style.width = this.width + 'px'
}
//clase para la bola

let game = new Game()
console.log(game)