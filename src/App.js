import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Layout from './containers/Layout/Layout';
import * as BooksAPI from './BooksAPI';
import BookList from './components/BookList/BookList';
import SearchList from './components/SearchList/SearchList';
import MainPage from './containers/MainPage/MainPage';
class App extends Component {
  state = {
    isLoading:false,
    query: '',
    searchResult: [],
    searchHistory: [],
    getAll:[]
  }

  // componentWillMount() {
  //   console.log('app will mount');
  //   BooksAPI.get('sJf1vQAACAAJ')
  //     .then(data=>{
  //       console.log(data);
  //     });

  //   this.setState({
  //     query: localStorage.getItem('query') ? localStorage.getItem('query') : '',
  //     searchResult: localStorage.getItem('searchResult') ? JSON.parse(localStorage.getItem('searchResult')) : [],
  //     searchHistory: localStorage.getItem('searchHistory') ? JSON.parse(localStorage.getItem('searchHistory')) : [],
  //   })
  // }

  updateQuery = (value) => {
    localStorage.setItem('query', value);
    this.setState({
      query: value
    });
  };

  querySubmit = (event) => {
    event.preventDefault();
    this.setState({isLoading:true})

    const submitQuery = this.state.query;
    const submitHistory = [...this.state.searchHistory];
    BooksAPI.search(this.state.query)
      .catch(error => {
        console.log(error);
        this.setState({isLoading:false})
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
            isLoading:false,
            searchResult: data,
            searchHistory: submitHistory
          });
        } else {
          this.setState({
            isLoading:false,
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
        isLoading={this.state.isLoading}
        searchForm={searchForm}>
        {/* <Route path='/search' exact render={() =>
          <BookList
            query={this.state.query}
            books={this.state.searchResult} />} /> */}
        <Route path='/' exact component={MainPage} />
      </Layout>
    );
  }
}

export default App;
