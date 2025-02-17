import app from './app'

const port = process.env.PORT || 4646

app.listen(port, () => {
  console.log(`Server started listening on PORT: ${port}`)
})

export default app
