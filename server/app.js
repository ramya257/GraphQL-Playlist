const express=require('express');
const graphQlHTTP=require('express-graphql');
const app=express();
const schema= require('./schema/schema');

// whenever a request comes to express app it tranfers it to graphQlHTTP module.
app.use('/graphql',graphQlHTTP({
schema       ,
graphiql:true // helps us to test queries in graphiql (UI for graphql)--http://localhost:4000/graphql?
}));
app.listen(4000,()=>{
  console.log('Now listening on port 4000');
});
