import React, { Component } from 'react';

import { Menu, Image, Header, Input } from 'semantic-ui-react';
import logo from '../../assets/images/logo.svg';

class NavBar extends Component {
    render() {
        return (
            <Menu borderless color='teal' inverted>
                <Menu.Item>
                    {/* <Header color='white' as='h4'>
                        <Image size='mini' src={logo} />
                        Readacity
                    </Header> */}
                    <Image size='mini' src={logo} />
                    &nbsp;&nbsp;READACITY
                </Menu.Item>

                <Menu.Menu position='right' >
                    <Menu.Item>
                        <Input
                            icon='search'
                            placeholder='Search...' />
                    </Menu.Item>
                    <Menu.Item as='a' name=' My Read' />
                    <Menu.Item as='a' name=' My Search' />

                </Menu.Menu>

            </Menu>
        );
    }
}

export default NavBar;