import React, { Component } from 'react';
import './App.css';

class AppNoJSX extends Component {
  render() {
    return React.createElement('div',{className:'App'}, 
    React.createElement('span',null,'hello react by noJSX'))
  }
}

export default AppNoJSX;