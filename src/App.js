import React, { Component } from 'react';
import './App.css';
import Students from './Components/Students/Students';
import Grade from './Components/Grade/Grade';
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
      gradeInfo = <Grade gradeInfo={this.state.grade}/>;
    }

    return (
      <div className="App">
        <h1>demo</h1>
      {
        this.state.showGradeInfo?gradeInfo:null
      }

      <Students students = {this.state.students} sayHelloTo = {this.sayHelloTo} onGradeChanged = {this.onGradeChanged}/>

      <div><button onClick={()=>this.toggleGrade()} >button</button></div>
      </div>
    );
  }
}

export default hot(module)(App);


