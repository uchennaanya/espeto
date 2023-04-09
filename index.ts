import express from 'express'
import { Request, Response } from "express"

import dotenv from 'dotenv'
dotenv.config()


const app = express()

app.use(express.json())

import route from './routes/index'

app.use('/api/v1', route)

app.get('/', (_: Request, res: Response) => res.send("Welcome home page!"))

const port = process.env.PORT || 5000

app.listen(
    port, async () => {
        console.log("Server on " + port)
    }
)