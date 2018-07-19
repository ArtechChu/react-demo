import React, { Component } from 'react';
import './App.css';
import Student from './Components/Student/Student';
import { hot } from 'react-hot-loader'
import { PassThrough } from 'stream';
class App extends Component {

  state = {
    students: [
      { name: "学生A", class: "class_1" },
      { name: "学生B", class: "class_4" },
      { name: "学生C", class: "class_3" }
    ],
    grade: "Grade One",
    showGradeInfo:true
  }

  changeGrade= ()=>{
    this.setState({
      grade: "Grade Two"
    })
  }

  sayHello() {
    console.log("hello");
  }

  sayHelloTo(name){
    console.log("hello  " + name);
  }

  onGradeChanged= (event)=>{
    this.setState({
      grade:event.target.value
    })
  }
  toggleGrade=()=>{
    this.setState({
      showGradeInfo: !this.state.showGradeInfo
    })
  }
  render() {
    let gradeInfo = null;
    if(this.state.showGradeInfo){
      gradeInfo = <h2>Grade:{this.state.grade}</h2>;
    }
    return (
      <div className="App">
        <h1>demo</h1>
      {/* 
      {if(this.state.showGradeInfo){
          <h2>Grade:{this.state.grade}</h2>
        }else{

        }} 
      */}

      {
        this.state.showGradeInfo? <h2>Grade:{this.state.grade}</h2>:null
      }

        {/* {
          gradeInfo
        } */}
        
      
        <Student onGradeChanged={this.onGradeChanged} name={this.state.students[0].name} class={this.state.students[0].class} />
        <Student onGradeChanged={this.onGradeChanged} name={this.state.students[1].name} class={this.state.students[1].class} />
        <Student onGradeChanged={this.onGradeChanged} name={this.state.students[2].name} class={this.state.students[2].class}>
          <span style={{ color: "red" }}>目前是打酱油的。</span>
        </Student>
        <div><button onClick={()=>this.toggleGrade()} >button</button></div>
      </div>
    );
  }
}

export default hot(module)(App);


