import React from 'react';
import PropTypes from 'prop-types';

import { Card, Image, Dropdown, Icon } from 'semantic-ui-react';


const BookCard = (props) => {
    let shelfMark = null;
    switch (props.shelf) {
        case 'currentlyReading':
            shelfMark = (<Icon name='bookmark' size='big' color='teal' />);
            break;
        case 'wantToRead':
            shelfMark = (<Icon name='empty heart' size='big' color='teal' />);
            break;
        case 'read':
            shelfMark = (<Icon name='remove bookmark' size='big' color='teal' />);
            break;
        default:
            break;
    }

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
                {shelfMark}
                <Dropdown text='Add to' labeled button icon='add to cart' className='right floated icon teal'>

                    <Dropdown.Menu>
                        <Dropdown.Header icon={{ name: 'tag', size: 'large', }} content='SHELF' />
                        <Dropdown.Divider />
                        <Dropdown.Item selected={props.shelf==='currentlyReading'} disabled={props.shelf==='currentlyReading'} onClick={() => props.btnClick(props.id, 'currentlyReading')} text='Reading' icon={{ name: 'bookmark', color: 'teal' }} />
                        <Dropdown.Item selected={props.shelf==='wantToRead'} disabled={props.shelf==='wantToRead'} onClick={() => props.btnClick(props.id, 'wantToRead')} text='Wishlist' icon={{ name: 'empty heart', color: 'teal' }} />
                        <Dropdown.Item selected={props.shelf==='read'} disabled={props.shelf==='read'} onClick={() => props.btnClick(props.id, 'read')} text='Read' icon={{ name: 'remove bookmark', color: 'teal' }} />
                        <Dropdown.Item disabled={props.shelf==='none'} onClick={() => props.btnClick(props.id, 'none')} text='Remove' icon={{ name: 'delete', color: 'red' }} />
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
    description: PropTypes.string.isRequired,
    btnClick: PropTypes.func.isRequired,
    shelf: PropTypes.string.isRequired
}

export default BookCard;