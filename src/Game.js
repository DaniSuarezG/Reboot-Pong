import { Board } from './Board.js'
import { Paddle } from './Paddle.js'
import { Ball } from './Ball.js'
import { ScoreBoard } from './ScoreBoard.js'
import { BtnStart } from './BtnStart.js'
import { BtnReset } from './BtnReset.js'
import { BtnPause } from './BtnPause.js'
import {
    backgroundMusic,
    popSound
} from '../src/audio.js'

class Game {
    constructor() {
        let self = this

        this.board = new Board()

        this.btnStart = new BtnStart()
        this.btnReset = new BtnReset()
        this.btnPause = new BtnPause()

        this.player = new Paddle()
        this.enemy = new Paddle()

        this.scoreBoard = new ScoreBoard()

        this.ball = new Ball()

        this.timerId = null;
        this.timerIdSetUp = null;
        this.timerIdEnemy = null

        this.backgroundAudio = null;

        this.pause = false

        this.world = null;
    }

    setUpBoard() {
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
        
        this.btnStart.html.onclick = this.startGame.bind(this)
        // this.btnReset.html.onclick = this.resetGame.bind(this)

        this.backgroundAudio = new Audio('./assets/audio/background.mp3')

        this.world.appendChild(this.board.html)
    }

    mouseHandler(e) {
        let playerRight = e.clientX + (this.player.width / 2)
        let playerLeft = e.clientX - (this.player.width / 2)
        let playerTop = e.clientY - (this.player.height / 2)
        let playerDown = e.clientY + (this.player.height / 2)

        let borderRight = (window.innerWidth / 2) + (this.board.width / 2)
        let borderLeft = (window.innerWidth / 2) - (this.board.width / 2)
        let borderTop = (window.innerHeight / 2) - (this.board.height / 2)
        let borderDown = (window.innerHeight / 2) + (this.board.height / 2)
        if (playerRight < borderRight && playerLeft > borderLeft) {
            this.player.updateMove = (e.clientX - (window.innerWidth / 2) + (this.board.width / 2) - (this.player.width / 2))
        }
    }

    enemyHandler() {
        let enemyRight = this.enemy.left + this.enemy.width //this.ball.x + this.ball.width / 2 + (this.enemy.width / 2)
        let enemyLeft = this.enemy.left //this.ball.x + this.ball.width / 2 - (this.enemy.width / 2)

        let borderRight = this.board.width
        let borderLeft = 0

        if (enemyLeft < borderLeft || enemyRight > borderRight) {
            this.enemy.dir *= -1
        }
        this.enemy.updateMove = 20

    }

    bounceHandler() {
        if (this.ball.borderCollision(this.board, this.scoreBoard)) {
            this.pauseGame()
        }
        this.ball.playerCollision(this.player)
        this.ball.playerCollision(this.enemy)
    }

    startGame() {
        // console.log(this)
        this.timerIdSetUp = setTimeout(function (who) {
            // console.log(who)
            who.btnStart.html.style.top = '400px'
            who.btnStart.html.style.display = 'none'
            who.board.html.style.cursor = 'none'

            who.board.html.onmousemove = who.mouseHandler.bind(who)
            who.btnReset.html.onclick = who.resetGame.bind(who)
            who.btnPause.html.onclick = who.pauseGameBtn.bind(who)

            who.ball.html.style.display = ''
            who.player.html.style.display = ''
            who.enemy.html.style.display = ''


            who.scoreBoard.spanPlayer.classList.remove('noShowSB')
            who.scoreBoard.spanEnemy.classList.remove('noShowSB')
            who.scoreBoard.spanSeparator.classList.remove('noShowSB')

            who.timerIdFaster = setInterval(function (who) {
                who.ball.step++
                console.log(`MAS RAPIDO ${who.ball.step}`)
            }, 4000, who)

            popSound.play()
            backgroundMusic.play()

            who.timerId = setInterval(function (who) {
                // console.log(this)
                who.ball.move()
                who.bounceHandler()
                who.enemyHandler()
            }, 35, who)
        }, 0.4, this)
    }

    pauseGame() {
        clearInterval(this.timerId)
        clearInterval(this.timerIdEnemy)
        clearInterval(this.timerIdFaster)

        clearTimeout(this.timerIdSetUp)

        this.board.html.style.cursor = ''
        this.btnStart.html.style.display = ''

        this.btnStart.html.onclick = this.startGame.bind(this)

        this.board.html.onmousemove = null

        this.enemy.dir = 1

        this.player.resetPaddle(this.board.width, this.board.height)
        this.enemy.resetPaddle(this.board.width, this.board.height)
        this.ball.resetBall(this.board.width, this.board.height)

    }

    pauseGameBtn() {
        if (this.pause) {
            this.pause = false
            this.startGame().bind(this)
        } else {
            this.pause = true

            backgroundMusic.pause()

            clearInterval(this.timerId)
            clearInterval(this.timerIdEnemy)
            clearInterval(this.timerIdFaster)

            this.board.html.onmousemove = ''
        }

        popSound.play()

    }

    resetGame() {
        clearInterval(this.timerId)
        clearInterval(this.timerIdEnemy)
        clearInterval(this.timerIdFaster)

        this.pause = false

        this.world.removeChild(this.board.html)
        this.setUpBoard()

        backgroundMusic.load()

        this.btnReset.html.onclick = ''
        this.btnPause.html.onclick = ''

        popSound.play()

    }
}

export {Game}