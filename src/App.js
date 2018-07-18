import React, { Component } from 'react';
import './App.css';
import Student from './Components/Student/Student';
import { hot } from 'react-hot-loader'
class App extends Component {

  state = {
    students: [
      { name: "学生A", class: "class_1" },
      { name: "学生B", class: "class_4" },
      { name: "学生C", class: "class_3" }
    ],
    grade: "Grade One"
  }

  changeGrade= ()=>{
    this.setState({
      grade: "Grade Two"
    })
  }

  sayHello() {
    console.log("hello");
  }

  sayHelloTo(name) {
    console.log("hello  " + name);
  }

  render() {
    return (
      <div className="App">
        <h1>demo</h1>
        <h2>Grade:{this.state.grade}</h2>
        <Student name={this.state.students[0].name} class={this.state.students[0].class} />
        <Student name={this.state.students[1].name} class={this.state.students[1].class} />
        <Student name={this.state.students[2].name} class={this.state.students[2].class}>
          <span style={{ color: "red" }}>目前是打酱油的。</span>
        </Student>
        <div><button onClick={this.changeGrade} >button</button></div>
      </div>
    );
  }
}

export default hot(module)(App);


