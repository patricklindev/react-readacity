import React from 'react';
import PropTypes from 'prop-types';

import BookCard from './BookCard/BookCard';
import { Card, Responsive } from 'semantic-ui-react';
import { BookIdentifier } from '../../constant/Identifiers';


const BookList = (props) => {
    let books;
    if (props.books instanceof Array) {
        books = props.books.map(book => {
            return (
                <BookCard
                    key={book[BookIdentifier.A_ID]}
                    id={book[BookIdentifier.A_ID]}
                    imageURL={book[BookIdentifier.A_IMGLINKS] ? book[BookIdentifier.A_IMGLINKS][BookIdentifier.B_THUMBNAIL] : 'https://dummyimage.com/300x400/ddd/fff.png&text=x'}
                    title={book[BookIdentifier.A_TITLE] ? book[BookIdentifier.A_TITLE] : ''}
                    authors={book[BookIdentifier.A_AUTHORS] ? book[BookIdentifier.A_AUTHORS].join(', ') : ''}
                    publishedDate={book[BookIdentifier.A_PUBLISHEDDATE] ? book[BookIdentifier.A_PUBLISHEDDATE] : ''}
                    description={book[BookIdentifier.A_DESCRIPTION] ? book[BookIdentifier.A_DESCRIPTION] : ''}
                    btnClick={props.btnClick}
                />
            );
        })
    } else {
        console.error('error:' + props.books)
    }

    return (
        <React.Fragment>
            <Responsive
                as={Card.Group}
                minWidth='1201'
                itemsPerRow='4'>
                {books}
            </Responsive>
            <Responsive
                as={Card.Group}
                maxWidth='1200'
                minWidth='993'
                itemsPerRow='3'>
                {books}
            </Responsive>
            <Responsive
                as={Card.Group}
                maxWidth='992'
                minWidth='601'
                itemsPerRow='2'>
                {books}
            </Responsive>
            <Responsive
                as={Card.Group}
                maxWidth='600'
                itemsPerRow='1'>
                {books}
            </Responsive>
        </React.Fragment>
    );
}

BookList.propTypes = {
    // books: PropTypes.oneOfType([
    //     PropTypes.array,
    //     PropTypes.object,
    // ]),
    books: PropTypes.array.isRequired,
    btnClick: PropTypes.func.isRequired
}

export default BookList