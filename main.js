function Board() {
    let player = document.querySelector('#player-paddle')
    //let enemy = document.querySelector('#enemy-paddle')

    //console.log(player)
    let board = document.querySelector('#container')

    board.addEventListener('mousemove', mouseHandler)

    console.log(player)
}

let game = new Board()

function mouseHandler(e) {
    console.log(e.clientY + 'px')
}

