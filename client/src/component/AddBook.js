import React, { Component } from 'react';
import {graphql,compose} from 'react-apollo';
import {getAuthorsQuery,addBookMutation} from '../query/queries';

//declaring query

class AddBook extends Component{


  constructor(props){
    super(props);
    this.state={
      name:'',
      genre:'',
      authorId:''
    };
  }
displayAuthors(){
  var data=this.props.getAuthorsQuery;

  if(data.loading){
    return(<option disabled>Loading Authors...</option>);
  }else{
    return data.authors.map (author=>{
      return(<option key={author.id} value={author.id}>{author.name}</option>)
    })
  }
}
//when we used to type and submit form in the UI it just refresh the page to prevent that we use preventDefault
//this refers to the component
submitForm(e){
  e.preventDefault();
  this.props.addBookMutation({
    variables:{
      name:this.state.name,
      genre:this.state.genre,
      authorId:this.state.authorId
    }
  });

}

//The target event property returns the element that triggered the event
//updating the state of component in onChange method by firing the event
render(){
  return(
    <form id="add-book" onSubmit={this.submitForm.bind(this)}>

    <div className="field">
    <label>Book Name:</label>
    <input type="text" onChange={(e)=>this.setState({name:e.target.value})}/>
    </div>

    <div className="field">
    <label>Genre:</label>
    <input type="text" onChange={(e)=>this.setState({genre:e.target.value})}/>
    </div>

    <div className="field">
    <label>Author:</label>
    <select onChange={(e)=>this.setState({authorId:e.target.value})}>
    <option>Select Author</option>
    {this.displayAuthors()}
    </select>
    </div>
    <button>+</button>
    </form>



  );
}


}


export default compose(
    graphql(getAuthorsQuery,{name:"getAuthorsQuery"}),
    graphql(addBookMutation,{name:"addBookMutation"})
)(AddBook);
