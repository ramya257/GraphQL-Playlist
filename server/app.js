const express=require('express');
const mongoose=require('mongoose');
const graphQlHTTP=require('express-graphql');
const app=express();
const schema= require('./schema/schema');
const cors=require('cors')

//allow cross origin requests
app.use(cors());

//connecting to db
mongoose.connect('mongodb://localhost/books_db', { useNewUrlParser: true });

//checking the connection and once it is open, we fire a callback funtion
mongoose.connection.once('open',()=>{
  console.log("connection is open now");
});


// whenever a request comes to express app it tranfers it to graphQlHTTP module.
app.use('/graphql',graphQlHTTP({
schema       ,
graphiql:true // helps us to test queries in graphiql (UI for graphql)--http://localhost:4000/graphql?
}));
app.listen(4000,()=>{
  console.log('Now listening on port 4000');
});
