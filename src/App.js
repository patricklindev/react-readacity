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
      searchResult: localStorage.getItem('searchResult') ? JSON.parse(localStorage.getItem('searchResult')).result : null,
      searchQuery:localStorage.getItem('searchResult') ? JSON.parse(localStorage.getItem('searchResult')).query : null,
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

  /* handle for Layout > NavBar > Input onChange */
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
    const query = this.state.query;
    BooksAPI.search(query)
      .catch(error => {
        console.log(error);
        this.setState({ isLoading: false })
      })
      .then(data => {
        if (data instanceof Array) {
          data.sort(sortBy(BookIdentifier.A_TITLE));
          localStorage.setItem('searchResult', JSON.stringify({query,result:data}));
          this.setState({
            isLoading: false,
            searchResult: data,
            searchQuery:query
          });
        } else {
          localStorage.setItem('searchResult', JSON.stringify({query,result:[]}));
          this.setState({
            isLoading: false,
            searchResult: [],
            searchQuery:query
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
        searchQuery={this.state.searchQuery}
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
