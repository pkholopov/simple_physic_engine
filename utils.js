export function toRad(angle) {
    return (angle * Math.PI) / 180
}

export function toDeg(angle) {
    return (angle * 180) / Math.PI
}

export function equal(a, b) {
    const delta = 0.000001
    return Math.abs(a - b) < delta
}