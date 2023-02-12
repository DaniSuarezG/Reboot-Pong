class BtnStart {
    constructor() {
        let self = this

        this.width = 130
        this.height = 30

        this.left = 0
        this.top = 0

        let html = null
    }

    createStart(width, height) {
        this.html = document.createElement('div')

        this.html.id = 'start'

        this.html.innerText = 'Start'

        this.left = width / 2 - this.width / 2
        this.top = height / 2 - this.height / 2

        // this.html.style.height = `${this.height}px`
        // this.html.style.width  = `${this.width}px` 
        // this.html.style.left   = `${this.left}px`
        // this.html.style.top    = `${this.top}px`
    }
}

export {BtnStart}