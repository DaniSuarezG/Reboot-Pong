class BtnReset {
    constructor() {
        let self = this

        this.width = 140
        this.height = 70

        this.top = 0
        this.left = 0

        this.html = null
    }

    createReset(width, height) {
        this.html = document.createElement('div')

        this.html.onmousemove = ''

        this.html.id = 'btnReset'

        this.html.innerText = 'Reset'

        this.left = width / 4 - this.width / 2
        this.top = height + height / 10

        // this.html.style.left = this.left + 'px'
        // this.html.style.top = this.top + 'px'
        // this.html.style.width = this.width + 'px'
        // this.html.style.height = this.height + 'px'
    }
}

export {BtnReset}