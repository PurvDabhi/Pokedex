const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./User')
const { ObjectId } = require('mongodb');


const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://Purv:bgqTWkhVnzwT6BE@gigacluster.eqifwat.mongodb.net/?retryWrites=true&w=majority&appName=GigaCluster");

app.get("/getUsers", (req,res)=> {
    UserModel.find()
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.post("/Login", (req, res) => {
    const{username, password} = req.body;
    UserModel.findOne({username: username})
    .then(user => {
        if(user) {
        if(user.password === password) {
            res.json("Success")
        } else {
            res.json("the password is incorrect")
        } 
    }
        else {
            res.json("No record existed")
        }
    })
})

app.post('/signup', (req, res)=> {
  UserModel.create(req.body)
  console.log("Signup Details:", req.body)
  //.then(users => res.json(users))
 //.catch(err => res.json(err))
})



 app.put("/update",async(req,res)=>{
  console.log(req.body)
   const {_id,...rest} = req.body
  console.log(rest)
const data = await UserModel.updateOne({_id: _id},rest)
   res.send({success : true,message : "Data Updated successfully" , data :data})
 })

 app.delete("/delete/:id",async(req,res)=>{
    const id = req.params.id
     console.log(id)
    const data = await UserModel.deleteOne({_id: id})
   res.send({success : true,message : "Data Deleted successfully" , data :data})
})

       

app.listen(3001, () => {
    console.log("server is running")
})
