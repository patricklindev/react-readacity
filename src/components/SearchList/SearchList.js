import React from 'react';

import BookList from '../BookList/BookList';

const SearchList = (props) => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1
    };
    return (
            <BookList 
                books={props.history[0].result} />
    );
}

export default SearchList;