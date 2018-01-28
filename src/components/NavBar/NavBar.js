import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import { Menu, Image, Input, Responsive} from 'semantic-ui-react';
import logo from '../../assets/images/logo.svg';

class NavBar extends Component {
    render() {
        return (
            <React.Fragment>     
                <Menu   borderless color='teal' inverted>
                    <Menu.Item>
                        <Image size='mini' src={logo} />
                        &nbsp;&nbsp;READACITY
                </Menu.Item>
                    <Menu.Menu position='right' >
                        <Responsive
                            as={Menu.Item}
                            minWidth='601' >
                            <form onSubmit={this.props.searchForm.submit}>
                                <Input
                                    onChange={this.props.searchForm.updateQuery}
                                    value={this.props.searchForm.query}
                                    action={{
                                        icon:'search',
                                        loading:this.props.isLoading,
                                        inverted:true
                                        }}
                                    placeholder='Search...' />
                            </form>
                        </Responsive>
                        <Menu.Item as={Link} 
                            to='/'
                            name=' My Read' />
                        <Menu.Item as={Link}
                            to='/search'
                            name=' My Search' />
                    </Menu.Menu>
                </Menu>

                <Responsive
                    maxWidth='601'>
                    <form
                        onSubmit={this.props.searchForm.submit}
                        style={{ margin: '0 1rem 1rem 1rem' }}
                    >
                        <Input
                            fluid
                            onChange={this.props.searchForm.updateQuery}
                            value={this.props.searchForm.query}
                            icon='search'
                            placeholder='Search...' />
                    </form>
                </Responsive>

            </React.Fragment>

        );
    }
}



export default NavBar;