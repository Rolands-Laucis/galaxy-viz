
class FadeLinePoint{
    constructor({ x = rand([0, windowWidth]), y = rand([0, windowHeight]), len = 0, col = { h: 0, s: 100, l: 100 }, speed = 1, max_speed = 1, min_speed=0} = {}){
        this.x = x
        this.y = y
        this.length = len
        this.col = col
        this.speed = speed
        this.min_speed = min_speed
        this.max_speed = max_speed
    }

    Draw(len=this.length){
        stroke(color(this.col.h, this.col.s, this.col.l, 255))
        line(this.x, this.y, this.x + len, this.y)
        // for(let i=0; i < len; i++){
        //     stroke(this.Color(i))
        //     point(this.x+i, this.y)
        // }
    }

    Color(a){
        return color(this.col.h, this.col.s, this.col.l, map(a, 0, this.length, 255, 0))
    }

    Move(dx,dy){
        this.x += dx * rand([this.min_speed, this.max_speed])
        this.y += dy * rand([this.min_speed, this.max_speed])
        // this.x += dx * this.speed
        // this.y += dy * this.speed

        if(this.x <= 0)
            this.x = windowWidth + this.x
        if (this.x >= windowWidth)
            this.x = this.x - windowWidth

        if (this.y <= 0)
            this.y = windowHeight + this.y
        if (this.y >= windowHeight)
            this.y = this.y - windowHeight
    }
}