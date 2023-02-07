function Paddle() {
    let self = this

    this.height = 20 //DEFAULT: 20
    this.width = 150 //DEFAULT: 150

    this.left = 0
    this.top = 0
    this.pos = 0

    this.roll = ""

    this.html = null

    this.createPaddle = function (classP, width, height) {
        switch (classP) {
            case 'player': this.pos = 0.9; break
            case 'enemy': this.pos = 0.1; this.dir = 1; break
        }

        this.roll = classP

        this.html = document.createElement('div')

        this.html.id = `${classP}-paddle`
        this.html.classList.add('paddle')

        this.html.style.height = this.height + 'px'
        this.html.style.width = this.width + 'px'

        this.left = ((width / 2) - (this.width / 2)) // width
        this.top = height * this.pos
        this.html.style.left = this.left + 'px'
        this.html.style.top = this.top + 'px'

        this.html.style.display = 'none'
    }

    this.updateMove = function (left) {
        switch (this.roll) {
            case 'player': self.left = left; break
            case 'enemy':
                self.left += left * self.dir
        }

        self.html.style.left = self.left + 'px'
    }

    this.resetPaddle = function (width, height) {
        this.left = ((width / 2) - (this.width / 2))
        this.top = height * this.pos
        this.html.style.left = this.left + 'px'
        this.html.style.top = this.top + 'px'
        this.html.style.display = 'none'
    }
}

export {Paddle}