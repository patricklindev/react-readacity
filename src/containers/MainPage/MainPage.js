import React, { Component } from 'react';

import * as BooksAPI from '../../BooksAPI';
import BookList from '../../components/BookList/BookList';
import { BookIdentifier } from '../../constant/Identifiers';
import { Menu, Segment, Input, Dimmer, Loader } from 'semantic-ui-react';


class MainPage extends Component {

    state = {
        currentlyReading: null,
        wantToRead: null,
        read: null,
        activeItem: 'Reading',
        isLoading: false,
    }

    componentWillMount() {
        if (this.state.currentlyReading === null) {
            const myBook = localStorage.getItem('myBook')
            if (myBook) {
                this.setState({
                    ...this.filterBookShelf(JSON.parse(myBook))
                })
            }
        }
    }

    componentDidMount() {
        if (this.state.currentlyReading === null) {
            BooksAPI.getAll()
                .catch(err => {
                    console.log(err);
                })
                .then(books => {
                    if (books) {
                        localStorage.setItem('myBook', JSON.stringify(books));
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
            currentlyReading,
            wantToRead,
            read
        }
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

        let activeList;

        if (this.state.isLoading || !this.state.currentlyReading) {
            activeList = (
                <div style={{ minHeight: '50vh' }}>
                    <Dimmer active inverted >
                        <Loader inverted>Loading</Loader>
                    </Dimmer>
                </div>

            );
        } else {
            switch (activeItem) {
                case 'Reading':
                    activeList = <BookList books={this.state.currentlyReading} />
                    break;
                case 'Wishlist':
                    activeList = <BookList books={this.state.wantToRead} />
                    break;
                case 'Read':
                    activeList = <BookList books={this.state.read} />
                    break;

                default:
                    break;
            }
        }




        return (
            <div>
                <Menu attached='top' tabular>
                    <Menu.Item name='Reading' active={activeItem === 'Reading'} onClick={this.handleItemClick} />
                    <Menu.Item name='Wishlist' active={activeItem === 'Wishlist'} onClick={this.handleItemClick} />
                    <Menu.Item name='Read' active={activeItem === 'Read'} onClick={this.handleItemClick} />
                    <Menu.Menu position='right'>
                        <Menu.Item>
                            <Input transparent icon={{ name: 'search', link: true }} placeholder='Search users...' />
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>

                <Segment attached='bottom' >
                    {activeList}
                </Segment>
            </div>
        )
    }
}

export default MainPage;