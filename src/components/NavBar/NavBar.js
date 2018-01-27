import React, { Component } from 'react';

import { Menu, Image, Input, Responsive } from 'semantic-ui-react';
import logo from '../../assets/images/logo.svg';

class NavBar extends Component {
    render() {
        return (
            <React.Fragment>
                <Menu borderless color='teal' inverted>
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
                                    icon='search'
                                    placeholder='Search...' />
                            </form>
                        </Responsive>
                        <Menu.Item as='a' name=' My Read' />
                        <Menu.Item as='a' name=' My Search' />
                    </Menu.Menu>
                </Menu>
                {/* <Responsive
                    as={Menu}
                    maxWidth='601'
                    widths='1'
                    borderless
                    color='teal'
                    inverted>
                    <Menu.Item>
                        <form onSubmit={this.props.searchForm.submit}>
                            <Input
                                onChange={this.props.searchForm.updateQuery}
                                value={this.props.searchForm.query}
                                icon='search'
                                placeholder='Search...' />
                        </form>
                    </Menu.Item>
                </Responsive> */}
                <Responsive
                    maxWidth='601'>
                    <form 
                        onSubmit={this.props.searchForm.submit}
                        style={{margin:'0 1rem 1rem 1rem'}}
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