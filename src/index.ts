import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'
import { v4 as uuidv4 } from 'uuid';

const app = express()
const port = process.env.PORT || 3000
const parserMiddleware = bodyParser({})
app.use(parserMiddleware)

const users = [{id: uuidv4(), name: 'Alex'}, {id: uuidv4(), name: 'Max'}]

app.get('/users/', (req: Request, res: Response) => {
    if (req.query.name) {
        let search = req.query.name.toString()
        res.send(users.filter(u => u.name.indexOf(search) > -1))
    } else {
        res.send(users)
    }
})
app.get('/users/:id', (req: Request, res: Response) => {
    let user = users.find(u => u.id === req.params.id)
    if (user) {
        res.send(user)
    } else {
        res.send(404)
    }
})
app.delete('/users/:id', (req: Request, res: Response) => {
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === req.params.id) {
            users.splice(i, 1)
            res.send(204)
            return
        }
    }
    res.send(404)
})
app.post('/users/', (req: Request, res: Response) => {
    const newUser = {
        id: uuidv4(),
        name: req.body.name
    }
    users.push(newUser)
    res.status(201).send(newUser)
})
app.put('/users/:id', (req: Request, res: Response) => {
    let user = users.find(u=>u.id===req.params.id)
    if (user){
        user.name = req.body.name
        res.send(user)
    } else{
        res.send(404)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})