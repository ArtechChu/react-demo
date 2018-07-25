import React, { Component } from 'react';
import './App.css';
import Students from './Components/Students/Students';
import Grade from './Components/Grade/Grade';
import { hot } from 'react-hot-loader'

class App extends Component {

  state = {
    students: [
      { name: "学生A", grade:"Grade one", class: "class_1", id:"1"},
      { name: "学生B", grade:"Grade one", class: "class_4", id:"2"},
      { name: "学生C", grade:"Grade Two", class: "class_3", id:"3"}
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

  onStudentNameChanged = (event, id)=>{
    let students = this.state.students;
    let student = students.find(ent=>ent.id===id);
    if(!student) return;
    student.name = event.target.value;
    this.setState({
      students:students
    });
  }

  showStudentInfo= (student)=>{
    this.setState({
      grade:`${student.name}，来自${student.grade}，班级${student.class}`
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

      <Students students = {this.state.students} sayHelloTo = {this.sayHelloTo} onStudentNameChanged = {this.onStudentNameChanged} showStudentInfo={this.showStudentInfo}/>

      <div><button onClick={()=>this.toggleGrade()} >button</button></div>
      </div>
    );
  }
}

export default hot(module)(App);


