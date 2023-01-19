const express = require('express')
const cors = require('cors')
const { MongoClient } = require('mongodb')

const app = express()
app.use(express.json())
app.use(cors())


const uri = "mongodb+srv://aman:Nepal123@cluster0.aqmkc3t.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);
client.connect();
const db = client.db("Aman");
const sdp = db.collection("user");

app.post('/insert',(request,response) => {
  response.send('YOUR EXPRESS BACKEND IS CONNECTED TO REACT');
  console.log(request.body)
  sdp.insertOne(request.body)
  console.log("Documents Inserted");
 
})


app.listen(8081)
//localhost:8081
console.log("server started")