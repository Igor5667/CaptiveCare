const mongoose = require('mongoose')
const express = require("express")
const cors = require("cors")

const app = express()
const PORT = 8080

app.use(express.json())
app.use(cors())

const db = 'first01'
const url = `mongodb://localhost:27017/${db}`

mongoose.connect(url)
    .then(()=>console.log(`Connected to database ${db}`))
    .catch((err)=>console.log("Connection error: ", err.message))


const userSchema = new mongoose.Schema({
    name: String,
    surname: String,
    age: Number,
    reason: String,
    release_date: Date
  })
const User = mongoose.model("ts",userSchema)



app.get("/prisoners", async (req,res)=>{
    try{
        const users = await User.find()
        res.json(users)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})


app.listen(PORT, ()=>console.log(`Server express is running ${PORT}`))

process.on('SIGINT', ()=>{
    console.log("Closing MongoDB")
    mongoose.disconnect()
        .then(()=>console.log("Closed connection MongoDB"))
        .finally(()=>process.exit())
})

