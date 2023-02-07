function BtnPause() {
    let self = this

    this.width = 140
    this.height = 70

    this.left = 0
    this.top = 0

    this.html = null

    this.createPause = function (width, height) {
        this.html = document.createElement('div')

        this.html.onmousemove = ''

        this.html.id = 'btnPause'

        this.html.innerText = 'Pause'

        this.left = width / 4 * 3 - this.width / 2
        this.top = height + height / 10

        // this.html.style.left = this.left + 'px'
        // this.html.style.top = this.top + 'px'
        // this.html.style.width = this.width + 'px'
        // this.html.style.height = this.height + 'px'
    }
}

export {BtnPause}