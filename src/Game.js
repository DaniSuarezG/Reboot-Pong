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

function Game() {
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

        this.btnStart.html.onclick = self.startGame
        this.btnReset.html.onclick = self.resetGame

        this.backgroundAudio = new Audio('./assets/audio/background.mp3')

        this.world.appendChild(this.board.html)
    }

    this.mouseHandler = function (e) {
        let playerRight = e.clientX + (self.player.width / 2)
        let playerLeft = e.clientX - (self.player.width / 2)
        let playerTop = e.clientY - (self.player.height / 2)
        let playerDown = e.clientY + (self.player.height / 2)

        let borderRight = (window.innerWidth / 2) + (self.board.width / 2)
        let borderLeft = (window.innerWidth / 2) - (self.board.width / 2)
        let borderTop = (window.innerHeight / 2) - (self.board.height / 2)
        let borderDown = (window.innerHeight / 2) + (self.board.height / 2)

        if (playerRight < borderRight && playerLeft > borderLeft) {
            self.player.updateMove((e.clientX - (window.innerWidth / 2) + (self.board.width / 2) - (self.player.width / 2)))
        }

    }

    this.enemyHandler = function () {
        let enemyRight = this.enemy.left + this.enemy.width //this.ball.x + this.ball.width / 2 + (this.enemy.width / 2)
        let enemyLeft = this.enemy.left //this.ball.x + this.ball.width / 2 - (this.enemy.width / 2)

        let borderRight = this.board.width
        let borderLeft = 0

        if (enemyLeft < borderLeft || enemyRight > borderRight) {
            this.enemy.dir *= -1
        }
        this.enemy.updateMove(20)

    }

    this.bounceHandler = function () {
        if (this.ball.borderCollision(this.board, this.scoreBoard)) {
            this.pauseGame()
        }
        this.ball.playerCollision(this.player)
        this.ball.playerCollision(this.enemy)
    }

    this.startGame = function () {
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


            self.scoreBoard.spanPlayer.classList.remove('noShowSB')
            self.scoreBoard.spanEnemy.classList.remove('noShowSB')
            self.scoreBoard.spanSeparator.classList.remove('noShowSB')

            self.timerIdFaster = setInterval(function () {
                self.ball.step++
                console.log(`MAS RAPIDO ${self.ball.step}`)
            }, 4000)

            popSound.play()
            backgroundMusic.play()

            self.timerId = setInterval(function () {
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

        popSound.play()

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

        popSound.play()

    }
}

export {Game}