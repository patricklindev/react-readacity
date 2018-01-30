import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import sortBy from 'sort-by';

import Layout from './containers/Layout/Layout';
import SearchPage from './containers/SearchPage/SearchPage';
import MainPage from './containers/MainPage/MainPage';
import * as BooksAPI from './BooksAPI';
import { BookIdentifier } from './constant/Identifiers';
import * as debounce from 'lodash.debounce'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      query: localStorage.getItem('query') ? localStorage.getItem('query') : '',
      searchResult: localStorage.getItem('searchResult') ? JSON.parse(localStorage.getItem('searchResult')).result : null,
      searchQuery: localStorage.getItem('searchResult') ? JSON.parse(localStorage.getItem('searchResult')).query : null,
      myBooks: localStorage.getItem('myBooks') ? JSON.parse(localStorage.getItem('myBooks')) : null,
    };
  }
  componentDidMount() {
    this.setState({ isLoading: true });
    BooksAPI.getAll()
      .catch(err => {
        console.log(err);
      })
      .then(books => {
        if (books instanceof Array) {
          localStorage.setItem('myBooks', JSON.stringify(books));
          this.setState({
            isLoading: false,
            myBooks: books
          })
        } else {
          console.error('error:can not get books from API');
          this.setState({
            isLoading: false
          })
        }

      });
  }

  /* debounce for input search*/
  debounceUpdateSubmit = debounce(() => {
    if (this.state.query) {
      this.setState({ isLoading: true })
      const query = this.state.query;
      BooksAPI.search(query)
        .catch(error => {
          console.log(error);
          this.setState({ isLoading: false })
        })
        .then(data => {
          if (data instanceof Array) {
            const mergedBooks = this.utilityMergeBooks(data, this.state.myBooks);
            localStorage.setItem('searchResult', JSON.stringify({ query, result: mergedBooks }));
            this.setState({
              isLoading: false,
              searchResult: mergedBooks,
              searchQuery: query
            });
          } else {
            localStorage.setItem('searchResult', JSON.stringify({ query, result: [] }));
            this.setState({
              isLoading: false,
              searchResult: [],
              searchQuery: query
            })
          }
          this.props.history.push('/search');
        });
    }

  }, 500);

  /**
   * Due to books from BooksAPI.search() do not have 'shelf' property and books from getAll() have 'shelf' property,
   * I built this merge function to keep the consistency of the application.
   * 
   * param1:array,
   * param2:array,
   * 
   * return array
   **/
  utilityMergeBooks = (searchBooks, myBooks) => {
    const myBooksId = myBooks.map(b => b.id)
    const mergedBooks = searchBooks.map(book => {
      if (!myBooksId.includes(book.id)) {
        book.shelf = 'none';
        return book;
      } else {
        // console.log(myBooks.filter(mybook=>book.id===mybook.id));
        return myBooks.filter(mybook => book.id === mybook.id)[0];
      }
    });
    return mergedBooks.sort(sortBy(BookIdentifier.A_TITLE));
  }

  /* handle for SearchPage > BookList > BookCard btnAddTo clicked */
  handleAddtoClick = (id, shelf) => {
    this.setState({
      isLoading: true,
    });
    const query = this.state.query;
    BooksAPI.update(id, shelf)
      .catch(err => {
        console.error(err);
        this.setState({
          isLoading: false,
        });
      })
      .then((data) => {
        BooksAPI.getAll()
          .catch(err => {
            console.log(err);
            this.setState({
              isLoading: false,
            });
          })
          .then(books => {

            if (books instanceof Array) {
              localStorage.setItem('myBooks', JSON.stringify(books));
              if (this.state.searchResult) {
                localStorage.setItem('searchResult', JSON.stringify({ query, result: this.utilityMergeBooks(this.state.searchResult, books) }));
                this.setState({
                  isLoading: false,
                  myBooks: books,
                  searchResult: this.utilityMergeBooks(this.state.searchResult, books)
                })
              }else{
                this.setState({
                  isLoading: false,
                  myBooks: books,
                })
              }
            } else {
              console.error('error:can not get books from API');
              this.setState({
                isLoading: false
              })
            }
          });
      })
  }

  /* handle for Layout > NavBar > Input onChange */
  handlerUpdateQuery = (value) => {
    localStorage.setItem('query', value);
    this.setState({
      query: value
    });

    this.debounceUpdateSubmit();


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
          const mergedBooks = this.utilityMergeBooks(data, this.state.myBooks);
          localStorage.setItem('searchResult', JSON.stringify({ query, result: mergedBooks }));
          this.setState({
            isLoading: false,
            searchResult: mergedBooks,
            searchQuery: query
          });
        } else {
          localStorage.setItem('searchResult', JSON.stringify({ query, result: [] }));
          this.setState({
            isLoading: false,
            searchResult: [],
            searchQuery: query
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

    const pageMain = (
      <MainPage
        isLoading={this.state.isLoading}
        btnClick={this.handleAddtoClick}
        myBooks={this.state.myBooks} />
    )

    return (
      <Layout
        isLoading={this.state.isLoading}
        searchForm={searchForm}>
        <Switch>
          <Route path='/search' render={() => pageSearch} />
          <Route path='/' render={() => pageMain} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
