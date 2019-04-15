const mongoose=require('mongoose');
const Schema=mongoose.Schema;


//creating a template for the data to be stored in the author collection
const authorSchema=new Schema({
//defining object properties
name:String,
age:Number

})

module.exports=mongoose.model('Author',authorSchema);
