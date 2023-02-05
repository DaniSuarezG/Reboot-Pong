//Trying collisions
        /*
            if (ballLeft <= paddleRight && ballDown >= paddleUp && ballRight > paddleRight && ballUp < paddleDown) {
                console.log("COLISION DERECHA")
                switch(this.ball.dir) {
                    case 'DL':
                        this.ball.dir = 'DR'
                        break
                    case 'UL':
                        this.ball.dir = 'UR'
                        break
                }
            } else if (ballRight >= paddleLeft && ballDown >= paddleUp && ballLeft < paddleLeft && ballUp < paddleUp) {
                console.log("COLISION IZQUIERDA")
                switch(this.ball.dir) {
                    case 'DR':
                        this.ball.dir = 'DL'
                        break
                    case 'UR':
                        this.ball.dir = 'UL'
                        break
                }
            } else if (ballUp <= paddleDown && ballRight >= paddleLeft && ballLeft < paddleRight && ballDown > paddleDown) {
                console.log("COLISION INFERIOR")
                switch(this.ball.dir) {
                    case 'UL':
                        this.ball.dir = 'DL'
                        break
                    case 'UR':
                        this.ball.dir = 'DR'
                        break
                }
            }*/
        //}

        /*
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

                /*if (this.ball.dir === 'DL'){
                    console.log("AQUI1 DE", this.ball.dir)
                    if (ballLeft < paddleRight){
                        this.ball.dir = 'DR'
                        console.log("A", this.ball.dir)
                    } else if (ballDown > paddleUp){
                        this.ball.dir = 'UL'
                        console.log("A", this.ball.dir)
                    }
                }

                if (this.ball.dir === 'DR'){
                    console.log("AQUI2 DE", this.ball.dir)
                    if (ballRight >= paddleLeft){
                        this.ball.dir = 'DL'
                        console.log("A", this.ball.dir)
                    } else if (ballDown > paddleUp){
                        this.ball.dir = 'UR'
                        console.log("A", this.ball.dir)
                    }
                }

                if (this.ball.dir === 'UL') {
                    console.log("AQUI3 DE", this.ball.dir)
                    if (ballUp < paddleDown) {
                        this.ball.dir = 'DL'
                        console.log("A", this.ball.dir)
                    } else if (ballLeft < paddleRight) {
                        this.ball.dir = 'UR'
                        console.log("A", this.ball.dir)
                    }
                }

                if (this.ball.dir === 'UR') {
                    console.log("AQUI4 DE", this.ball.dir)
                    if (ballUp < paddleDown) {
                        this.ball.dir = 'DR'
                        console.log("A", this.ball.dir)
                    } else if (ballRight > paddleLeft) {
                        this.ball.dir = 'UL'
                        console.log("A", this.ball.dir)
                    }
                }*/




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
                }
            }*/