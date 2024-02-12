import { Readable, Writable, Transform } from 'node:stream'


class OneToHundredStream extends Readable {
    index = 1
    _read() {
        const i = this.index++


        setTimeout(() => {
            if (i > 100) {
                this.push(null) // push : enviar informações
            } else {
                const buf = Buffer.from(String(i))
                this.push(buf)
            }

        }, 100)

    }
}

class TransformNegative extends Transform {
    _transform(chuck, encoding, callback) {
        const transformed = Number(chuck.toString()) * -1
        callback(null, Buffer.from(String(transformed)))
    }
}

class MultiplyByTenStream extends Writable {
    _write(chuck, encoding, callback) {
        console.log(Number(chuck.toString()) * 10)
        callback()
    }
}

new OneToHundredStream()
    .pipe(new TransformNegative())
    .pipe(new MultiplyByTenStream())