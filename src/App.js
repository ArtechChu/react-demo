import React, { Component } from 'react';
import './App.css';
import Students from './Components/Students/Students';
import Grade from './Components/Grade/Grade';
import Title from './Components/Title/Title';
import { hot } from 'react-hot-loader'
// const utils = require('./utils.js');
// import utils from './utils.js';
class App extends Component {
  constructor(props){
    super(props);
    // console.log("[App.js]---->constructor() running.");
    // this.myRef = React.createRef();
    // console.log("App ref:%o",this.myRef);
  }

  // componentWillMount(){
  //   console.log("[App.js]---->componentWillMount() running.");
  // }
  // componentDidMount(){
  //   console.log("[App.js]---->componentDidMount() running.");
  // }

  state = {
    students: [
      { name: "学生A", grade:"Grade one", class: "class_1", id:"1"},
      { name: "学生B", grade:"Grade one", class: "class_4", id:"2"},
      { name: "学生C", grade:"Grade Two", class: "class_3", id:"3"}
    ],
    grade: "Grade One",
    showGradeInfo:true,
    teacher:{
      address:{
        zipcode:"201600",
        province:"Shanghai"
      },
      name:"Mr.Chu"
    }
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

  //对比 Component和PureComponent
  changeTeachersName=()=>{
    this.setState({
      teacher:{
        address:{
          zipcode:"201600",
          province:"6666Shanghai"
        },
        name:"Mr.Chu"
      }
    })

  }



  render() {
    // console.log("[App.js]---->render() running.");
    // utils.saySth();
    // utils.showSth();
    // m.saySth();
    // m.showSth();
    let gradeInfo = null;
    if(this.state.showGradeInfo){
      gradeInfo = <Grade gradeInfo={this.state.grade}/>;
    }

    return (
      <div className="App">
        <Title />
      {
        this.state.showGradeInfo?gradeInfo:null
      }
      <div>老师的邮编为：{this.state.teacher.address.zipcode}</div>
      <Students teacher={this.state.teacher} students = {this.state.students} sayHelloTo = {this.sayHelloTo} onStudentNameChanged = {this.onStudentNameChanged} showStudentInfo={this.showStudentInfo}/>

      <div><button onClick={()=>this.toggleGrade()} >button</button></div>
      <div><button onClick={()=>this.changeTeachersName()} >changeZipcode</button></div>
      </div>
    );
  }
}

export default hot(module)(App);


