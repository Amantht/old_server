const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

const { MongoClient } = require('mongodb')

const uri = "mongodb+srv://aman:Nepal123@cluster0.aqmkc3t.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);
client.connect();
const db = client.db("s16");
const col = db.collection("user");

app.post('/insert',(request,response) => {
  response.send(request.body);
  console.log(request.body)
  col.insertOne(request.body)
  console.log("Documents Inserted");
 
})
app.get('/',(request,response) => {
  response.send('This is a Server')
})
app.get('/check', (request,response)=> {

  async function run () {
    try {
      console.log(request.query.un);
      const result = await col.findOne({email:request.query.un})
      if (result != null) {
        console.log(result.email);
        if (result.password === request.query.pw) {
          response.send("Login Successful");
        }
        else {
          response.send("Password Does Not Matched");
        }
      }
      else {
        response.send("User Name Does Not Matched");
      }
    }
    finally {
    
    }
  }
  run().catch(console.dir);
})

app.listen(8081)
//localhost:8081
console.log("server started")