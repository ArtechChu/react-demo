import React, { Component } from 'react';
import './App.css';
import Student from './Components/Student/Student';
import { hot } from 'react-hot-loader'
class App extends Component {
  
  render() {
    return (
      
      <div className="App">
      <h1>demo</h1>
         <Student name="A" class="classaABCDEFG"/>
         <Student name="B" class="AAA"/>
         <Student name="C" class="BBBB"/>
      </div>
    );
  }
}

export default hot(module)(App);
