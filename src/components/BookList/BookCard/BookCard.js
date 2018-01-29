import React from 'react';
import PropTypes from 'prop-types';

import { Card, Image, Dropdown } from 'semantic-ui-react';


const BookCard = (props) => {

    return (
        <Card>
            <Card.Content style={{ height: '9.9em', overflow: 'hidden' }}>
                <Image
                    style={{
                        width: '3rem',
                        height: '4rem'
                    }}
                    src={props.imageURL}
                    bordered floated='right' size='mini' />
                <Card.Header>
                    {props.title}
                </Card.Header>
                <Card.Meta>
                    <span className='date'>
                        {props.authors}
                        <br />
                        {props.publishedDate}
                    </span>
                </Card.Meta>
                <Card.Description>
                    {props.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>

                <Dropdown text='Add to' labeled button icon='add to cart' className='right floated icon teal'>
                    <Dropdown.Menu>
                        <Dropdown.Header icon='tags' content='SHELF' />
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={() => props.btnClick(props.id, 'currentlyReading')} text='Reading' />
                        <Dropdown.Item onClick={() => props.btnClick(props.id, 'wantToRead')} text='Wishlist' />
                        <Dropdown.Item onClick={() => props.btnClick(props.id, 'read')} text='Read' />
                    </Dropdown.Menu>
                </Dropdown>

            </Card.Content>
        </Card>
    )
}

BookCard.propTypes = {
    imageURL: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.string.isRequired,
    publishedDate: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
}

export default BookCard;