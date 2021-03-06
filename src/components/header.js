import React, { Component } from 'react';
import logo from '../images/logo.png'
import 'jplayer'
import $ from 'jquery';

class ComponenteHeader extends Component {
    render() {
        return (
            <div className="components-header row">
                <img src={logo} alt="logo" width="40" className="-col-auto"/>
                <h1 className="caption">React Music Player</h1>
            </div>
        );
    }
}

export default ComponenteHeader;