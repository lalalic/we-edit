const rechk = /^([<>])?(([1-9]\d*)?([xcbB?hHiIfdsp]))*$/
const refmt = /([1-9]\d*)?([xcbB?hHiIfdsp])/g
const str = (v,o,c) => String.fromCharCode(...new Uint8Array(v.buffer, v.byteOffset + o, c))
const rts = (v,o,c,s) => new Uint8Array(v.buffer, v.byteOffset + o, c)
    .set(s.split('').map(str => str.charCodeAt(0)))

const pst = (v,o,c) => str(v, o + 1, Math.min(v.getUint8(o), c - 1))

const tsp = (v,o,c,s) => { v.setUint8(o, s.length); rts(v, o + 1, c - 1, s) }

const lut = le => ({
    x: c=>[1,c,0],
    c: c=>[c,1,o=>({u:v=>str(v, o, 1)      , p:(v,c)=>rts(v, o, 1, c)     })],
    '?': c=>[c,1,o=>({u:v=>Boolean(v.getUint8(o)),p:(v,B)=>v.setUint8(o,B)})],
    b: c=>[c,1,o=>({u:v=>v.getInt8(   o   ), p:(v,b)=>v.setInt8(   o,b   )})],
    B: c=>[c,1,o=>({u:v=>v.getUint8(  o   ), p:(v,B)=>v.setUint8(  o,B   )})],
    h: c=>[c,2,o=>({u:v=>v.getInt16(  o,le), p:(v,h)=>v.setInt16(  o,h,le)})],
    H: c=>[c,2,o=>({u:v=>v.getUint16( o,le), p:(v,H)=>v.setUint16( o,H,le)})],
    i: c=>[c,4,o=>({u:v=>v.getInt32(  o,le), p:(v,i)=>v.setInt32(  o,i,le)})],
    I: c=>[c,4,o=>({u:v=>v.getUint32( o,le), p:(v,I)=>v.setUint32( o,I,le)})],
    f: c=>[c,4,o=>({u:v=>v.getFloat32(o,le), p:(v,f)=>v.setFloat32(o,f,le)})],
    d: c=>[c,8,o=>({u:v=>v.getFloat64(o,le), p:(v,d)=>v.setFloat64(o,d,le)})],
    s: c=>[1,c,o=>({u:v=>str(v,o,c), p:(v,s)=>rts(v,o,c,s.slice(0,c    ) )})],
    p: c=>[1,c,o=>({u:v=>pst(v,o,c), p:(v,s)=>tsp(v,o,c,s.slice(0,c - 1) )})]
})
const errbuf = new RangeError("Structure larger than remaining buffer")
const errval = new RangeError("Not enough values for structure")
function struct(format) {
    let fns = [], size = 0, m = rechk.exec(format)
    if (!m) { throw new RangeError("Invalid format string") }
    const t = lut('<' === m[1]), lu = (n, c) => t[c](n ? parseInt(n, 10) : 1)
    while ((m = refmt.exec(format))) { ((r, s, f) => {
        for (let i = 0; i < r; ++i, size += s) { 
            if (f) {
                fns.push(f(size))
            }
        }
    })(...lu(...m.slice(1)))}
    const unpack_from = (arrb, offs) => {
        if (arrb.byteLength < (offs|0) + size) { throw errbuf }
        let v = new DataView(arrb, offs|0)
        return fns.map(f => f.u(v))
    }

    const pack_into = (arrb, offs, ...values) => {
        if (values.length < fns.length) { throw errval }
        if (arrb.byteLength < offs + size) { throw errbuf }
        const v = new DataView(arrb, offs)
        new Uint8Array(arrb, offs, size).fill(0)
        fns.forEach((f, i) => f.p(v, values[i]))
    }
    const pack_into_with_array = (arrb, offs, values) => {
        const v = new DataView(arrb, offs)
        new Uint8Array(arrb, offs, size).fill(0)
        fns.forEach((f, i) => f.p(v, values[i]))
    }

    const pack = (...values) => {
        let b = new ArrayBuffer(size)
        pack_into(b, 0, ...values)
        return b
    }
    const unpack = arrb => unpack_from(arrb, 0)
    function* iter_unpack(arrb) { 
        for (let offs = 0; offs + size <= arrb.byteLength; offs += size) {
            yield unpack_from(arrb, offs);
        }
    }
    return Object.freeze({
        unpack, pack, unpack_from, pack_into, pack_into_with_array, iter_unpack, format, size})
}

function byteArray(length) {
	return new Uint8Array(new ArrayBuffer(length)).buffer
}

function ceil4(n) {
	return (n + 3) & ~3
}

export default function ttc2ttf(buf) {
    buf=buf.buffer||buf
    const type = struct('4c').unpack_from(buf, 0).join('')
    if(type!=="ttcf")
        return [buf]

    const ttfCount = struct('I').unpack_from(buf, 0x08)[0]
    return Array.from(new Array(ttfCount)).map((_, i) => {
        const tableHeaderOffset = struct('I').unpack_from(buf, 0x0C + 0x04 * i)[0]
        const tableCount = struct('H').unpack_from(buf, tableHeaderOffset + 0x04)[0]
        const headerLength = 0x0C + tableCount * 0x10

        let tableLength = 0
        for (let j = 0; j < tableCount; j++) {
            const length = struct('I').unpack_from(buf, tableHeaderOffset + +0x0C + 0x0C + j * 0x10)[0]
            tableLength += ceil4(length)
        }

        const totalLength = headerLength + tableLength
        const newBuf = byteArray(totalLength)

        const header = struct(headerLength + 'b').unpack_from(buf, tableHeaderOffset)
        struct(headerLength + "b").pack_into(newBuf, 0, ...header)
        let currentOffset = headerLength

        for (let j = 0; j < tableCount; j++) {
            const offset = struct('I').unpack_from(buf, tableHeaderOffset + 0x0C + 0x08 + j * 0x10)[0]
            const length = struct('I').unpack_from(buf, tableHeaderOffset + 0x0C + 0x0C + j * 0x10)[0]
            struct('I').pack_into(newBuf, 0x0C + 0x08 + j * 0x10, currentOffset)

            const CHUCK_LENGTH = 1024 * 1024
            const lastLength = length % CHUCK_LENGTH
            
            let steps = parseInt((length / CHUCK_LENGTH).toString())

            if (lastLength > 0) steps++
            
            Array.from(Array(steps)).forEach((_, i) => {
                const chuckOffset = offset + i * CHUCK_LENGTH
                const chunckLength = (steps != i + 1) ? CHUCK_LENGTH : lastLength
                
                const currentTable = struct(chunckLength + 'b').unpack_from(buf, chuckOffset)
                struct(chunckLength + 'b').pack_into_with_array(newBuf, currentOffset, currentTable)
                currentOffset += ceil4(chunckLength)
            })
        }
        
        return newBuf
    })
}
