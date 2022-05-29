class FlowField{
    t = 1
    vectors = []
    constructor({ scale = 100, method = 'noise', noiseScale = 1, width = windowWidth, height = windowHeight, magnitude=1, img=null, col=color(100), speed=0.1} = {}) { //cnvWidth, cnvHeight, scale, ns, mag, method='noise', img
        this.fieldScale = scale
        this.col = col
        this.speed = speed
        if (method == 'noise'){
            this.noiseScale = noiseScale            
            this.ConstructRandomFromNoise(width, height, magnitude)
        } else if (method == 'img'){
            this.ConstructFromImg(width, height, magnitude, img)
        }
        // console.log(width, height)
        // console.log(this.vectors)
    }

    Draw(){
        //strokeWeight(10)
        this.vectors.forEach(v=>{
            stroke(v.color)
            push()
            translate(v.x, v.y)
            rotate(v.angle.heading())
            line(0, 0, this.fieldScale, 0)
            pop()
        })
    }

    MoveByTime(dt=this.speed){
        this.t += dt
        this.vectors.forEach(v=>{
            v.angle = p5.Vector.fromAngle((noise(v.x * this.noiseScale, v.y*this.noiseScale, this.t)*2)*TWO_PI)
        })
    }

    ConstructRandomFromNoise(width, height, mag){
        for (let x = 0; x < width; x += this.fieldScale) {
            for (let y = 0; y < height; y += this.fieldScale) {
                const angle = p5.Vector.fromAngle(noise(x * this.noiseScale, y * this.noiseScale, this.t) * TWO_PI)
                angle.setMag(mag)
                this.vectors.push({ x: x, y: y, angle: angle, color: this.col })
            }
        }
    }

    ConstructFromImg(cnvWidth, cnvHeight, mag, img){
        for (let x = 0; x < cnvWidth; x += this.fieldScale) {
            for (let y = 0; y < cnvHeight; y += this.fieldScale) {
                const col = color(img.get(x, y))
                const angle = p5.Vector.fromAngle(hue(col))
                angle.setMag(mag)
                this.vectors.push({ x: x, y: y, angle: angle, color: this.col })
            }
        }

        // for (var x = 0; x < cnvWidth; x++) {
        //     for (var y = 0; y < cnvHeight; y++) {
        //         if (x % this.fieldScale == 0 && y % this.fieldScale == 0) {
        //             var col = color(img.get(x, y))
        //             var angle = p5.Vector.fromAngle(hue(col))
        //             angle.setMag(mag)
        //             this.vectors.push({ 'x': x, 'y': y, 'angle': angle, 'color': col })
        //         }
        //     }
        // }
    }

    SampleVector(x, y){
        //TODO optimization here, could use x and y to just index the array of vectors instead of .find()
        x = Math.floor(Math.floor(x) / this.fieldScale) * this.fieldScale
        y = Math.floor(Math.floor(y) / this.fieldScale) * this.fieldScale
        return this.vectors.find(v => v.x == x && v.y == y)
    }
}