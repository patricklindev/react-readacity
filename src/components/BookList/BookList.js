import React from 'react';
import PropTypes from 'prop-types';

import classes from './BookList.css';
import BookCard from './BookCard/BookCard';
import { Card, Responsive } from 'semantic-ui-react';


const BookList = (props) => {
    let books;
    if (props.books.length > 0) {
        books = props.books.map(book => {
            return <BookCard
                key={book.id}
                imageURL={book.imageLinks ? book.imageLinks.smallThumbnail : 'https://dummyimage.com/300x400/ddd/fff.png&text=x'}
                title={book.title ? book.title : ''}
                authors={book.authors ? book.authors.join(', ') : ''}
                publishedDate={book.publishedDate ? book.publishedDate : ''}
                description={book.description ? book.description : ''}
            />
        })
    }

    let showText;



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
        // <Card.Group className={classes.BookList} itemsPerRow='4' >
        //     {books}
        // </Card.Group>
    );
}

BookList.propTypes = {
    books: PropTypes.array.isRequired
}

export default BookList