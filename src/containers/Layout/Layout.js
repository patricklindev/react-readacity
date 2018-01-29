import React, { Component } from 'react';

import { Container, Sticky } from 'semantic-ui-react';
import NavBar from '../../components/NavBar/NavBar';

class Layout extends Component {
    
    state = {}

    handleContextRef = (contextRef) => {
        this.setState({ contextRef });
    }

    render() {
        const { contextRef } = this.state
        return (
            <div ref={this.handleContextRef}>
                <Sticky 
                    context={contextRef} 
                    style={{
                        zIndex:'1000',
                        position:'relative'
                    }}
                    >
                    <NavBar
                        isLoading={this.props.isLoading}
                        searchForm={this.props.searchForm} />
                </Sticky>

                <Container style={{ paddingTop: '1em', minHeight:'60vh'}}>
                    {this.props.children}
                </Container >
            </div>

        );
    }
}


export default Layout;