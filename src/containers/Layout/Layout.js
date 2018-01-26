import React, { Component } from 'react';

import { Container } from 'semantic-ui-react';
import NavBar from '../../components/NavBar/NavBar';

class Layout extends Component {
    render() {
        return (
            <React.Fragment>
                <NavBar />
                <Container>
                    MyApp
                </Container >
            </React.Fragment>

        );
    }
}

export default Layout;