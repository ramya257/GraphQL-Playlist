const mongoose=require('mongoose'); //required to created schema model
const Schema=mongoose.Schema;


//creating the mongo db schema for books
const bookSchema=new Schema({ //object inside this will describe the properties required for a book

  name:String,
  genre:String,
  authorId:String,

})
//model refers to a collection in db which will contain the objects of the type schemea bookSchema we defined
module.exports=mongoose.model('Book',bookSchema);
