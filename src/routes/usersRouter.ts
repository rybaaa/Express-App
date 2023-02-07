import {Request, Response, Router} from "express";
import {v4 as uuidv4} from "uuid";

export const usersRouter = Router({})

const users = [{id: uuidv4(), name: 'Alex', location: 'France', age: 22}, {id: uuidv4(), name: 'Max', location: 'Netherlands', age:20}]

usersRouter.get('/', (req: Request, res: Response) => {
    if (req.query.name) {
        let search = req.query.name.toString()
        res.send(users.filter(u => u.name.indexOf(search) > -1))
    } else {
        res.send(users)
    }
})
usersRouter.get('/:id', (req: Request, res: Response) => {
    let user = users.find(u => u.id === req.params.id)
    if (user) {
        res.send(user)
    } else {
        res.send(404)
    }
})
usersRouter.delete('/:id', (req: Request, res: Response) => {
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === req.params.id) {
            users.splice(i, 1)
            res.send(204)
            return
        }
    }
    res.send(404)
})
usersRouter.post('/', (req: Request, res: Response) => {
    const newUser = {
        id: uuidv4(),
        name: req.body.name,
        location: req.body.location,
        age: +req.body.age
    }
    users.push(newUser)
    res.status(201).send(newUser)
})
usersRouter.put('/:id', (req: Request, res: Response) => {
    let user = users.find(u=>u.id===req.params.id)
    if (user){
        user.name = req.body.name
        res.send(user)
    } else{
        res.send(404)
    }
})