import React, { Component } from 'react';
import logo from '../img/logo.png'
import {Layout} from 'antd';

const {Header}=Layout;
class ComponenteHeader extends Component {
    render() {
        return (
            <Layout>
            <Header style={{width:'100%'}} className="header">
                <div className="logo">
                    <img src={logo} alt="logo" width="40px"/>   
                </div>
                <h1 className="caption">React Music Player</h1>
            </Header>

            </Layout>
        );
    }
}

export default ComponenteHeader;