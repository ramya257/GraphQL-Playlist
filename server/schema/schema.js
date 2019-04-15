const graphql= require('graphql');
const _=require('lodash');

//importing the Book schema
const Book=require('../models/book')
const Author=require('../models/author');


//this scehma witll define the type of data in the graph..ie object types, the relation between those object
//types and how to reach data in the graph

//We can grab the properties or functions inside one package using--
const {GraphQLObjectType,GraphQLString,GraphQLSchema,GraphQLID,GraphQLInt,GraphQLList,GraphQLNonNull}= graphql;


//dummy data

var books=[
  {name:'C By Dennis Ritchie',genre:'Programming',id:'1',authorId:'1'},
  {name:'C++ By Bala Guruswamy',genre:'Programming',id:'2',authorId:'2'},
  {name:'Data Structures and Algorithms',genre:'Programming',id:'3',authorId:'1'}


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
    genre:{type:GraphQLString},
    author:{type:AuthorType,
      //looking at actual data and return what is needed
      //when graphql recieves author query inside the book then this funtion tells qraphql which author corresponds to this book
      //parent data is useful in nested queries
      resolve(parent,args){

          //return _.find(authors,{id:parent.authorId});

//one book can have one author associated to it so we can use findById-- it returns only 0 or 1 record
          return Author.findById(parent.authorId);


      }


         }

    })


});


const AuthorType=new GraphQLObjectType({
  name:'Author',
  fields:()=>({
    id:{type:GraphQLID},
    name:{type:GraphQLString},
    age:{type:GraphQLInt},
    book:{
      type:new GraphQLList(BookType),// each author may have multiple book so we need list
      resolve(parent,args){
        //return _.filter(books,{authorId:parent.id});// filter returns multiple results

        //one author may be associated to multiple books so we have to use
        return Book.find({authorId:parent.id});//find method will return the books for the author based on some criteria

      }


    }
  })
});
//how we initially jump into the graph and we can have different root queries
const RootQuery=new GraphQLObjectType({
  name:'RootQueryType',
    fields:{
      //when we try to query from the front end-- using this paramter only we will call
      book:{   // query for 1 book
        type:BookType, //type of data being queried
        //when we get the query for one book, args says that we expect some parameter with that query which is id of type GraphQLString
        args:{id:{type:GraphQLID}},
        //write code inside this resolve to get the data from the DB or other source, it is fired when we receive the query
        resolve(parent,args){
          //return  _.find(books,{id:args.id}); //finding the book by id in array books
          return Book.findById(args.id);
        }


      },
      author:{
        type:AuthorType,

        args:{id:{type:GraphQLID}},
        resolve(parent,args){

          //return _.find(authors,{id:args.id});
          return Author.findById(args.id);
        }

      },
      books:{
        type:new GraphQLList(BookType), //return all the records in Book collection
        resolve(parent,args){
        return Book.find({});
        }
      },
      authors:{
        type:new GraphQLList(AuthorType),  //return all the records in Author collection
        resolve(parent,args){
          //  return authors;
          return Author.find({});
        }

      }
    }
});

//creating mutations

const Mutation=new GraphQLObjectType({
  name:'Mutation',
  fields:{

    addAuthor:{
      type:AuthorType,
      args:{
        name:{type:GraphQLString},
        age:{type:GraphQLInt},
      },
      resolve(parent,args){
        let author=new Author({
          name:args.name,
          age:args.age
        }); //creating local variable and it will have some properties

        return author.save(); //moongose returns the data we want to receieve after the document is created
      }

    },
    addBook:{
      type:BookType,
      args:{name:{type:new GraphQLNonNull(GraphQLString)},
      genre:{type:new GraphQLNonNull(GraphQLString)},
      authorId:{type:GraphQLID}
    },
    resolve(parent,args){
      let book=new Book({
        name:args.name,
        genre:args.genre,
        authorId:args.authorId


      });

      return book.save();

    }

    }
  }
});


module.exports=new GraphQLSchema({
  //adding queries which allow the user to use these in the front-end( exporting the queries)
  query:RootQuery,
  mutation:Mutation
});
