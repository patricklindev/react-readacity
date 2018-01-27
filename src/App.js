import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Layout from './containers/Layout/Layout';
import * as BooksAPI from './BooksAPI';
import BookList from './components/BookList/BookList';
class App extends Component {
  state = {
    query: '',
    searchResult: [],
    searchHistory: []
  }

  componentWillMount() {
    console.log('app will mount');
    this.setState({
      query: localStorage.getItem('query') ? localStorage.getItem('query') : '',
      searchResult: localStorage.getItem('searchResult') ? JSON.parse(localStorage.getItem('searchResult')) : [],
      searchHistory: localStorage.getItem('searchHistory') ? JSON.parse(localStorage.getItem('searchHistory')) : [],
    })
  }

  updateQuery = (value) => {
    localStorage.setItem('query', value);
    this.setState({
      query: value
    });
  };

  querySubmit = (event) => {
    event.preventDefault();
    const submitQuery = this.state.query;
    const submitHistory = [...this.state.searchHistory];
    BooksAPI.search(this.state.query)
      .catch(error => {
        console.log(error);
      })
      .then(data => {
        localStorage.setItem('searchResult', JSON.stringify(data));

        if (data.length > 0) {

          if (submitHistory.length === 3) {
            submitHistory.shift()
          }
          submitHistory.push({
            query: submitQuery,
            result: data
          });

          localStorage.setItem('searchHistory', JSON.stringify(submitHistory));

          this.setState({
            searchResult: data,
            searchHistory: submitHistory
          });
        } else {
          this.setState({
            searchResult: data
          })
        }

        this.props.history.push('/search');

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
        <Route path='/search' exact render={() =>
          <BookList
            query={this.sta}
            books={this.state.searchResult} />} />
      </Layout>
    );
  }
}

export default App;
