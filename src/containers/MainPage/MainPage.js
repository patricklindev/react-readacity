import React, { Component } from 'react';

import * as BooksAPI from '../../BooksAPI';
import BookList from '../../components/BookList/BookList';
import { BookIdentifier } from '../../constant/Identifiers';
import { Menu, Segment, Dimmer, Loader } from 'semantic-ui-react';
import sortBy from 'sort-by';

class MainPage extends Component {

    state = {
        currentlyReading: null,
        wantToRead: null,
        read: null,
        activeItem: 'Reading',
        isLoading: false,
        isUpdating: false,
    }

    shouldComponentUpdate(nextProps, nextState) {

        if (this.state.currentlyReading !== nextState.currentlyReading ||
            this.state.wantToRead !== nextState.wantToRead ||
            this.state.read !== nextState.read ||
            this.state.activeItem !== nextState.activeItem ||
            this.state.isLoading !== nextState.isLoading ||
            this.state.isUpdating !== nextState.isUpdating) {
            return true;
        } else {
            return false;
        }

    }

    // componentWillUpdate() {
    //     console.log('[MainPage] will update');
    // }


    componentDidMount() {
        // console.log('[MainPage] didMount');
        if (this.state.currentlyReading === null) {
            this.setState({ isLoading: true });
            BooksAPI.getAll()
                .catch(err => {
                    console.log(err);
                })
                .then(books => {
                    if (books instanceof Array) {
                        // localStorage.setItem('myBook', JSON.stringify(books));
                        this.setState({
                            isLoading: false,
                            ...this.filterBookShelf(books)
                        })
                    } else {
                        console.error('error:can not get books from API');
                        this.setState({
                            isLoading: false
                        })
                    }

                });
        }
    }


    filterBookShelf = (books) => {
        const currentlyReading = books.filter(book => book[BookIdentifier.A_SHELF] === 'currentlyReading');
        const wantToRead = books.filter(book => book[BookIdentifier.A_SHELF] === 'wantToRead');
        const read = books.filter(book => book[BookIdentifier.A_SHELF] === 'read');

        return {
            currentlyReading: currentlyReading.sort(sortBy(BookIdentifier.A_TITLE)),
            wantToRead: wantToRead.sort(sortBy(BookIdentifier.A_TITLE)),
            read: read.sort(sortBy(BookIdentifier.A_TITLE))
        }
    }

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
                // console.log(data);
                BooksAPI.getAll()
                    .catch(err => {
                        console.error(err);
                        this.setState({
                            isLoading: false,
                        });
                    })
                    .then(books => {
                        if (books) {
                            // localStorage.setItem('myBook', JSON.stringify(books));
                            this.setState({
                                isLoading: false,
                                ...this.filterBookShelf(books)
                            })
                        } else {
                            console.error('error:can not get books from API');
                            this.setState({
                                isLoading: false,
                            })
                        }
                    });
            })
    }

    handleShelfClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        // console.log('[MainPage] render')

        const { activeItem } = this.state

        let activeList;

        if (this.state.isLoading || this.state.currentlyReading === null) {
            activeList = (
                <Dimmer active inverted >
                    <Loader inverted>Loading</Loader>
                </Dimmer>
            );
        } else {
            switch (activeItem) {
                case 'Reading':
                    activeList =
                        <BookList
                            books={this.state.currentlyReading}
                            btnClick={this.handleAddtoClick} />
                    break;
                case 'Wishlist':
                    activeList =
                        <BookList
                            books={this.state.wantToRead}
                            btnClick={this.handleAddtoClick} />
                    break;
                case 'Read':
                    activeList =
                        <BookList
                            books={this.state.read}
                            btnClick={this.handleAddtoClick} />
                    break;
                default:
                    break;
            }
        }




        return (
            <div>
                <Menu attached='top' tabular>
                    <Menu.Item name='Reading' active={activeItem === 'Reading'} onClick={this.handleShelfClick} />
                    <Menu.Item name='Wishlist' active={activeItem === 'Wishlist'} onClick={this.handleShelfClick} />
                    <Menu.Item name='Read' active={activeItem === 'Read'} onClick={this.handleShelfClick} />
                </Menu>

                <Segment attached='bottom' style={{ minHeight: '16rem' }}>
                    {activeList}
                </Segment>
            </div>
        )
    }
}

export default MainPage;