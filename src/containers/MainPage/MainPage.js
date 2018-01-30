import React, { Component } from 'react';

import BookList from '../../components/BookList/BookList';
import { BookIdentifier } from '../../constant/Identifiers';
import { Menu, Segment, Dimmer, Loader } from 'semantic-ui-react';
import sortBy from 'sort-by';

class MainPage extends Component {

    state = {
        activeItem: 'Reading',
    }

    shouldComponentUpdate(nextProps, nextState) {

        if (this.props.myBooks !== nextProps.myBooks||
            this.props.btnClick !== nextProps.btnClick ||
            this.props.isLoading !== nextProps.isLoading ||
            this.state.activeItem !== nextState.activeItem ) {
            return true;
        } else {
            return false;
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

    handleShelfClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

        const myBooks = this.props.myBooks?this.filterBookShelf(this.props.myBooks):null;
    
        let activeList;

        if (this.props.isLoading || myBooks=== null) {
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
                            books={myBooks.currentlyReading}
                            btnClick={this.props.btnClick} />
                    break;
                case 'Wishlist':
                    activeList =
                        <BookList
                            books={myBooks.wantToRead}
                            btnClick={this.props.btnClick} />
                    break;
                case 'Read':
                    activeList =
                        <BookList
                            books={myBooks.read}
                            btnClick={this.props.btnClick} />
                    break;
                default:
                    break;
            }
        }


        return (
            <div>
                <Menu attached='top' tabular>
                    <Menu.Item icon={{name:'bookmark',color:'teal'}} name='Reading'  active={activeItem === 'Reading'} onClick={this.handleShelfClick} />
                    <Menu.Item icon={{name:'empty heart',color:'teal'}} name='Wishlist' active={activeItem === 'Wishlist'} onClick={this.handleShelfClick} />
                    <Menu.Item icon={{name:'remove bookmark',color:'teal'}} name='Read' active={activeItem === 'Read'} onClick={this.handleShelfClick} />
                </Menu>

                <Segment attached='bottom' style={{ minHeight: '16rem' }}>
                    {activeList}
                </Segment>
            </div>
        )
    }
}

export default MainPage;