import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import { ChatModel } from "./chat.js"
import { config } from "dotenv"

config()

const mongoURL = process.env.MONGO_URL

const app = express()
app.use(cors())
app.use(express.json()) 
const PORT = process.env.PORT || 5555


// connects to the mongo db
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
})

app.post("/insert", async (req, res) => {
    const message = req.body.message
    const author = req.body.author
    const time = req.body.time
    const room = req.body.room

    const chat = new ChatModel({
        message: message,
        author: author,
        time: time,
        room: room,
    })

    try{
        await chat.save()
        console.log("saved!")
    } catch(err) {
        console.log(err)
    }
})

app.get("/get-message/:room", async (req, res) => {
    const room = req.params.room

    console.log(room)
    await ChatModel.find({room: room}, (err, result) => {
        if (err) {
            res.send(err)
        }
        res.send(result)
    })
})

app.listen(PORT, () => {
    console.log("listening on port: " + PORT)
}) 