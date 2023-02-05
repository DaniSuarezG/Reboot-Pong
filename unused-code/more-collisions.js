        // let borderRight = this.board.width
        // let borderLeft  = 0
        // let borderUp    = 0
        // let borderDown  = this.board.height

        // let paddleRight = this.player.left + this.player.width
        // let paddleLeft  = this.player.left
        // let paddleUp    = this.player.top
        // let paddleDown  = this.player.top + this.player.height

        //console.log("paddle: ", paddleDown, paddleLeft, paddleRight, paddleUp)
        //console.log(this.player.html.style)

        // let ballRight = this.ball.x + 30
        // let ballLeft = this.ball.x
        // let ballUp = this.ball.y
        // let ballDown = this.ball.y + 30
         

        /*if (ballRight >= borderRight) { 
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
        }*/



        //this.ball.collision(this.player)
        //this.player.updateMove()
        /*if ((ballLeft  <= paddleRight) &&
            (ballRight >= paddleLeft) &&
            (ballUp    <= paddleDown) &&
            (ballDown  >= paddleUp)) {

            if (ballDown >= paddleUp && ballRight >= paddleLeft && ballLeft < paddleRight && ballUp < paddleUp) {
                console.log("COLISION SUPERIOR")
                switch(this.ball.dir) {
                    case 'DL':
                        this.ball.dir = 'UL'
                        break
                    case 'DR':
                        this.ball.dir = 'UR'
                        break
                }
            }
        }*/

       /* if ((ballDown === paddleUp || ballUp === paddleDown ) && ballLeft <= paddleRight && ballRight >= paddleLeft) {
            console.log('hay colisión')
        }*/