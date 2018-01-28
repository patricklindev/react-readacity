import React from 'react';
import PropTypes from 'prop-types';

import classes from './BookCard.css';
import { Card, Image, Icon } from 'semantic-ui-react';


const BookCard = (props) => {

    return (
        <Card>
            <Card.Content style={{height:'9.9rem',overflow:'hidden'}}>
                <Image className={classes.Img} bordered floated='right' size='mini' inline src={props.imageURL} />
                <Card.Header>
                    {props.title}
                </Card.Header>
                <Card.Meta>
                    <span className='date'>
                        {props.authors}
                        <br/>
                        {props.publishedDate}
                    </span>
                </Card.Meta>
                <Card.Description>
                    {props.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <a>
                    <Icon name='user' />
                    22 Friends
                </a>
            </Card.Content>
        </Card>
    )
}

BookCard.propTypes = {
    imageURL: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.string.isRequired,
    publishedDate:PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
}

export default BookCard;