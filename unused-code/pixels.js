//On Ball constructor
this.pixels = []
//, move function:
self.pixels = []
        let myArray = []
        for (let i = 0; i < 30; i++) {
            myArray.push({x: self.x + i, y: self.y})
        }
        self.pixels.push(myArray)
        myArray = []
        for (let j = 1; j < 30; j++) {
            myArray.push({x: self.x + 29, y: self.y + j})
        }
        self.pixels.push(myArray)
        myArray = []
        for (let i = 29; i >= 0; i--) {
            myArray.push({x: self.x + i, y: self.y + 29})
        }
        self.pixels.push(myArray)
        myArray = []
        for (let j = 29; j > 0; j--) {
            myArray.push({x: self.x, y: self.y + j})
        }
        self.pixels.push(myArray)


/*********************************/
//On Paddle constructor
this.pixels = []
//, updateMove function:
self.pixels = []
        let myArray = []
        for (let i = 0; i < self.width; i++) {
            myArray.push({x: self.left + i, y: self.top})
        }
        self.pixels.push(myArray)
        myArray = []
        for (let j = 0; j < self.height; j++) {
            myArray.push({x: self.left + 29, y: self.top + j})
        }
        self.pixels.push(myArray)
        myArray = []
        for (let i = self.width; i >= 0; i--) {
            myArray.push({x: self.left + i, y: self.top + 29})
        }
        self.pixels.push(myArray)
        myArray = []
        for (let j = self.height; j >= 0; j--) {
            myArray.push({x: self.left, y: self.top + j})
        }
        self.pixels.push(myArray)


