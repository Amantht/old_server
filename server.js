const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

app.post('/insert',(request,response) => {
    console.log("The client values are:");
  console.log(request.body);
  response.send(request.body);

})



app.listen(8081)
//localhost:8081
console.log("server started")