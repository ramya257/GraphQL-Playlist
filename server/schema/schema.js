const graphql= require('graphql');
const _=require('lodash');
//this scehma witll define the type of data in the graph..ie object types, the relation between those object
//types and how to reach data in the graph

//We can grab the properties or functions inside one package using--
const {GraphQLObjectType,GraphQLString,GraphQLSchema,GraphQLID,GraphQLInt}= graphql;


//dummy data

var books=[
  {name:'C By Dennis Ritchie',genre:'Programming',id:'1'},
  {name:'C++ By Bala Guruswamy',genre:'Programming',id:'2'},
  {name:'Data Structures and Algorithms',genre:'Programming',id:'3'}


];
var authors=[
{name:'Jennie',age:56,id:'1'},
{name:'George',age:19,id:'2'}


];


//created first object  type of Graphql--BookType whose name is Book and it contains
//the properties listed inside fields function all of type GraphQLString
const BookType=new GraphQLObjectType({ //define the book type( object)

  name:'Book',
  //properties..it is a function because later when we have multiple types having dependencies
  //then unless we wrap all of them into a single funtion, one type may not know other type
  fields:()=>({
    id:{type:GraphQLID},
    name:{type:GraphQLString},
    genre:{type:GraphQLString}

    })


});


const AuthorType=new GraphQLObjectType({
  name:'Author',
  fields:()=>({
    id:{type:GraphQLID},
    name:{
      type:GraphQLString
    },
    age:{type:GraphQLInt}
  })
});
//how we initially jump into the graph and we can have different root queries
const RootQuery=new GraphQLObjectType({
  name:'RootQueryType',
    fields:{
      //when we try to query from the front end-- using this paramter only we will call
      book:{ // query for 1 book
        type:BookType, //type of data being queried
        //when we get the query for one book, args says that we expect some parameter with that query which is id of type GraphQLString
        args:{id:{type:GraphQLID}},
        //write code inside this resolve to get the data from the DB or other source, it is fired when we receive the query
        resolve(parent,args){
          return  _.find(books,{id:args.id}); //finding the book by id in array books
        }


      },
      author:{
        type:AuthorType,

        args:{id:{type:GraphQLID}},
        resolve(parent,args){
          console.log("Reached Author");
          return _.find(authors,{id:args.id});
        }

      }
    }
});




module.exports=new GraphQLSchema({
  //adding queries which allow the user to use these in the front-end( exporting the queries)
  query:RootQuery
});
