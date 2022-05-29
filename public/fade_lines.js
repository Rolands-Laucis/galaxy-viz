function windowResized() { resizeCanvas(windowWidth, windowHeight); setup() }
function keyPressed() { 
    if (keyCode === UP_ARROW) render = !render
    else if (keyCode === RIGHT_ARROW) setup()
    else if (keyCode === DOWN_ARROW) console.log(ffopt)
}


//general
const iters = [150, 1000]
let field, ffopt, lines
var render = false

//line
const lumin = [30, 100]
let hue = [225, 360]//[0, 365]
const sat = [50, 100]
const min_movement_speed = [0.05, 0.5]
const max_movement_speed = [0, 80]
const line_len_range = [1, 1000]
const line_count = [50, 500]
let line_thresh = 0.5, min_rand_line_length = 1, mrll_rand = [1, 1]

//flow field
const scale_rand = [100, 400]
const noiseScale_rand = [0.001,0.1]
const magnitude_rand = [0.0005, 0.1]
const speed_rand = [0.001, 0.05]

function setup() {
    setlog(5)
    createCanvas(windowWidth, windowHeight);
    frameRate(60)
    colorMode(HSB, 359, 100, 100, 255);

    blendMode(REMOVE)
    background(color(0, 0, 0, 255))
    blendMode(ADD)

    ffopt = { scale: randf(scale_rand), noiseScale: rand(noiseScale_rand), magnitude: rand(magnitude_rand), speed: rand(speed_rand) }
    field = new FlowField(ffopt)

    len = [randexp(line_len_range), randexp(line_len_range)]
    hue = [rand([0, 360]), rand([0, 360])]

    lines = Array.from(Array(randf(line_count)), line => new FadeLinePoint(
        {
            col: { h: randexpf(hue), s: randf(sat), l: randexpf(lumin) },
            len: randexpf(len),
            // speed: randexp(movement_speed)
            min_speed: rand(min_movement_speed),
            max_speed: randexp(max_movement_speed)
        }
    )
    )

    line_thresh = 0
    min_rand_line_length = randexpf(mrll_rand)

    for (let i = 0; i < randf(iters); i++){
        field.MoveByTime()
        lines.forEach(line => {
            DrawLine(line)
        })
    }
}

function draw(){
    if(!render) return

    field.MoveByTime()
    // field.Draw()

    lines.forEach(line => {
        DrawLine(line)
    })
}


function DrawLine(line){
    const vec = field.SampleVector(line.x, line.y)
    if (!vec) l(windowWidth, windowHeight, line.x, line.y)

    line.Move(vec.angle.x, vec.angle.y)
    line.Draw(randexp([0, 2]) > line_thresh ? rand([min_rand_line_length, line.length]) : min_rand_line_length)
}