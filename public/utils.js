const mod = (a) => a < 0 ? -a : a
const rand = (minmax = [0, 1]) => (Math.random() * (minmax[1] - minmax[0])) + minmax[0]
const exp = (x, a = 1, b = 20, c = 0) => a * (b ** x) + c //https://www.desmos.com/calculator/3fisjexbvp
const randexp = (minmax = [0, 1]) => Math.floor((exp(rand([0, -2])) * (minmax[1] - minmax[0])) + minmax[0])
// const remap = (value, low1, high1, low2, high2) => low2 + (high2 - low2) * (value - low1) / (high1 - low1)

const randf = (minmax) => Math.floor(rand(minmax))
const randexpf = (minmax) => Math.floor(randexp(minmax))