import http from 'node:http';
import { Transform } from 'node:stream'



class TransformNegative extends Transform {
    _transform(chuck, encoding, callback) {
        const transformed = Number(chuck.toString()) * -1
        console.log(transformed)
        callback(null, Buffer.from(String(transformed)))
    }
}

// req=> ReadableStream
// res => WritableStream
const server = http.createServer(async (req, res) => {

    const buffers = []



    for await (const chuck of req) {
        buffers.push(chuck)
    }


    const fullStreamContente = Buffer.concat(buffers).toString()

    console.log(fullStreamContente)

    return res.end(fullStreamContente)

})


server.listen(3334)