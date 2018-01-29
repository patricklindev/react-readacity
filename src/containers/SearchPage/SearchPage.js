import React, { Component } from 'react';

import BookList from '../../components/BookList/BookList';
import { Menu, Segment, Dimmer, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class SearchPage extends Component {

    render() {
        let searchContent = null;
        if (this.props.isLoading) {
            searchContent = (
                <div>
                    <Menu attached='top' tabular>
                        <Menu.Item name='Searching...' active />
                    </Menu>
                    <Segment attached='bottom' style={{ minHeight: '16rem' }}>
                        <Dimmer active inverted >
                            <Loader inverted>Loading</Loader>
                        </Dimmer>
                    </Segment>
                </div>
            );
        } else if (this.props.books === null) {
            searchContent = (
                <div>
                    <Menu attached='top' tabular>
                        <Menu.Item name='Search books:' active />
                    </Menu>

                    <Segment attached='bottom' style={{ minHeight: '16rem' }}>
                    </Segment>
                </div>
            );
        } else if (this.props.books instanceof Array) {
            searchContent = (
                <div>
                    <Menu attached='top' tabular>
                        <Menu.Item name='Search result:' active >
                            {`${this.props.books.length} results for "${this.props.query}"`}
                        </Menu.Item>
                    </Menu>
                    <Segment attached='bottom' style={{ minHeight: '16rem' }}>
                        <BookList
                            books={this.props.books}
                            btnClick={this.props.btnClick} />
                    </Segment>
                </div>
            );
        }


        return searchContent;
    }
}

SearchPage.propTypes = {
    books: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.oneOf([null])
    ]),
    btnClick: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired
}

export default SearchPage;