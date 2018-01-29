import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import sortBy from 'sort-by';

import Layout from './containers/Layout/Layout';
import SearchPage from './containers/SearchPage/SearchPage';
import MainPage from './containers/MainPage/MainPage';
import * as BooksAPI from './BooksAPI';
import { BookIdentifier } from './constant/Identifiers';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      query: localStorage.getItem('query') ? localStorage.getItem('query') : '',
      searchResult: localStorage.getItem('searchResult') ? JSON.parse(localStorage.getItem('searchResult')) : null,
    };
  }

  /* handle for SearchPage > BookList > BookCard btnAddTo clicked */
  handleAddtoClick = (id, shelf) => {
    this.setState({
      isLoading: true,
    });
    BooksAPI.update(id, shelf)
      .catch(err => {
        console.error(err);
        this.setState({
          isLoading: false,
        });
      })
      .then((data) => {
        this.setState({
          isLoading: false,
        });
      })
  }

  /* handle for NavBar > Input onChange */
  handlerUpdateQuery = (value) => {
    localStorage.setItem('query', value);
    this.setState({
      query: value
    });
  };

  /* handle for NavBar > form onSubmit */
  handlerQuerySubmit = (event) => {
    event.preventDefault();
    this.setState({ isLoading: true })
    BooksAPI.search(this.state.query)
      .catch(error => {
        console.log(error);
        this.setState({ isLoading: false })
      })
      .then(data => {
        if (data instanceof Array) {
          data.sort(sortBy(BookIdentifier.A_TITLE));
          localStorage.setItem('searchResult', JSON.stringify(data));
          this.setState({
            isLoading: false,
            searchResult: data,
          });
        } else {
          localStorage.setItem('searchResult', '[]');
          this.setState({
            isLoading: false,
            searchResult: []
          })
        }
        this.props.history.push('/search');
      });
  }


  render() {
    const searchForm = {
      query: this.state.query,
      updateQuery: (event) => this.handlerUpdateQuery(event.target.value),
      submit: (event) => this.handlerQuerySubmit(event)
    }

    const pageSearch = (
      <SearchPage
        isLoading={this.state.isLoading}
        btnClick={this.handleAddtoClick}
        query={this.state.query}
        books={this.state.searchResult} />);

    return (
      <Layout
        isLoading={this.state.isLoading}
        searchForm={searchForm}>
        <Switch>
          <Route path='/search' render={() => pageSearch} />
          <Route path='/' component={MainPage} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
