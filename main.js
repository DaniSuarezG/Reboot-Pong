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

let game = new Board()

