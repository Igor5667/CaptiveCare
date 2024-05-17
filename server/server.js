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
    release_date: String,
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

app.delete("/prisoners/delete/:id", async (req, res)=>{
    const userId = req.params.id
    try{
        const deletedUser = await User.findByIdAndDelete(userId)
        if(!deletedUser){
            return res.status(404).json({message:"User not found"})
        }
        res.json({message:"User Deleted X"})
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

app.post("/prisoners/post/", async (req, res)=>{
    const prisoner = req.body
    try{
        await User.create(prisoner)
        res.json("added user")
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

