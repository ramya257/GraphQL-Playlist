import React, { Component } from 'react';
import {gql} from 'apollo-boost';
import {graphql} from 'react-apollo';

//declaring query
const getBooksQuery=gql`{
  books{
    name
    id
  }
}
`
//react compont is loaded at first so one props object contains loading:true as at this point of time we dont receive anuthing from server, query is still loading
//after we receieved data from the server using the query we binded it to the BookList component so now loading:false and inside data we have the list of all the data
//component

//data inside props is used to render in component
//books are attached to data property in props
class BookList extends Component {
  displayBooks(){
    var data=this.props.data;

//loading is a property inside data of props
    if(data.loading){
      return (<div>Loading Books...</div>);
    }else{
      //creating a interation to display each book name
      return data.books.map(book=>{ //{} outputting dynamically the data into UI in react
      return(
        <li key={book.id}>{book.name}</li>
      )

      })
    }
  }
  render() {
    
    return (

      <div>
      <ul id="book-list">
      {this.displayBooks()}
      </ul>

      </div>
    );
  }
}

//graphql from react-apollo helps us bind the query with the component

//this line says that-- use graphql to bind the query getBooksQuery to BookList component
export default graphql(getBooksQuery)(BookList);
