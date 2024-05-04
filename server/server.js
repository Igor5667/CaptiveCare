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
age: Number,
city: String
})
const User = mongoose.model("test1",userSchema)



app.get("/api/users", async (req,res)=>{
    try{
        const users = await User.find({name: 'Igor'})
        res.json(users)
        
    }catch(err){
        res.status(500).json({message: err.message})
    }
})


app.listen(PORT, ()=>console.log(`Server express is running ${PORT}`))

process.on('SIGINT', ()=>{
    console.log("Closing MongoDB")
    mongoose.disconnect()
        .then(()=>console.log("MongoDB connection closed"))
        .finally(()=>process.exit())
})

