/// Buffer foi criado pela incapacidade de trablhar com dados binarios de forma nativa (typedArray é uma alternativa  )

const buf = Buffer.from("ok")

console.log(buf) // representando de forma binaria , assim tendo uma perfomance melhor
console.log(buf.toJSON()) 