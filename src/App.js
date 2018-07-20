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

  sayHelloTo=(name)=>{
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
      {
        this.state.showGradeInfo?gradeInfo:null
      }

      {
         this.state.students.map(student=>{
           return <Student sayHelloTo ={this.sayHelloTo} onGradeChanged={this.onGradeChanged} name={student.name} class={student.class} key={student.name}/>
         })
      }
      <div><button onClick={()=>this.toggleGrade()} >button</button></div>
      </div>
    );
  }
}

export default hot(module)(App);


