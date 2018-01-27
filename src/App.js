import React, { Component } from 'react';

import Layout from './containers/Layout/Layout';
import * as BooksAPI from './BooksAPI';
import BookList from './components/BookList/BookList';
class App extends Component {
  state = {
    query: '',
    searchResult:[],
  }

  updateQuery = (value) => {
    this.setState({
      query: value
    });
  };

  querySubmit = (event) => {
    event.preventDefault();
    BooksAPI.search(this.state.query)
      .catch(error => {
        console.log('error');
      })
      .then(data => {
        this.setState({
          searchResult: data
        });
      });
  }


  render() {
    const searchForm = {
      query: this.state.query,
      updateQuery: (event) => this.updateQuery(event.target.value),
      submit: (event) => this.querySubmit(event)
    }

    return (
      <Layout
        searchForm={searchForm}>
        <BookList books={this.state.searchResult}/>
      </Layout>
    );
  }
}

export default App;
