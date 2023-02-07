import express from 'express'
import bodyParser from 'body-parser'
import {usersRouter} from "./routes/usersRouter";

const app = express()
const port = process.env.PORT || 5000
const parserMiddleware = bodyParser({})
app.use(parserMiddleware)

app.use('/users', usersRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})