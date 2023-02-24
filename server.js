const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

const { MongoClient } = require('mongodb')

const uri = "mongodb+srv://admin:admin@cluster0.aqmkc3t.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);
client.connect();

// // registration form data
// const db = client.db("s16");
// const col = db.collection("user");


var db = client.db("Rental");
var col = db.collection("Registration");
var col1=db.collection("stu_data");

///registration form data
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
          response.send("pass");
        }
        else {
          response.send("fail");
        }
      }
      else {
        response.send("fail");
      }
    }
    finally {
    
    }
  }
  run().catch(console.dir);
})

// Ex5 form data
app.post('/insert_stu',(req,res)=>{
  col1 =db.collection("Ex5")
  console.log(req.body)
  col1.insertOne(req.body)
  res.send(req.body)

})
app.get('/show_one_stu',(req,res)=>{
  async function find(){
    try{
      const result=await col1.findOne()
      if(result==null)
      {
        res.send({"Data_retrieval":"Fail"})
      }else{
          res.send(result);
        }
      }
      finally{}
    }
    find().catch(console.dir)
  })
app.listen(8081)
//localhost:8081
console.log("server started")