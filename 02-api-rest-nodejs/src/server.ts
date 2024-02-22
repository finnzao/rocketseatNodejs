import fastify from 'fastify'

const app = fastify()

app.get('/hello', () => {
  return 'Hello ABC'
})
app
  .listen({
    port: 4444,
  })
  .then(() => {
    console.log('HTTP Server Running')
  })
