function Board() {
    this.height = 700
    this.ratio = 4 / 7
    this.width = this.height * this.ratio

    this.html = null

    this.createBoard = function () {
        this.html = document.createElement('div')

        this.html.id = 'board'

        this.html.classList.add('glowing')

        this.html.style.height = this.height + 'px'
        this.html.style.width = this.width + 'px'
    }
}

export {Board}