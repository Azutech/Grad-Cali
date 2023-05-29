import express, { Request, Response } from 'express'
import log from '../src/logger/customLog'
import dotenv from 'dotenv'


dotenv.config()

const server = express()
const PORT = process.env.PORT

server.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        message: 'Welcome to Grand-Cali \n Best Movies to Watch '
    })

    log.info('YEEEAAHHH 🍿🍿')
})

server.get('*', (req: Request, res: Response) => {
    res.status(404).json({message: 'This route does not exist'})
})

server.listen(PORT, () => {
    log.info(`Express is listening at http://localhost:${PORT}`)
})