import React,{ Component,PureComponent } from 'react';
import Student from '../Student/Student';
// let students = props=>{
//     return props.students.map(student=>{
//         return <Student 
//                     sayHelloTo ={props.sayHelloTo} 
//                     onStudentNameChanged={props.onStudentNameChanged}
//                     showStudentInfo = {props.showStudentInfo}
//                     id={student.id} 
//                     name={student.name}
//                     class={student.class} 
//                     grade = {student.grade}
//                     key={student.id}/>
//     })
// }
class Students extends PureComponent{
    render(){
        return  this.props.students.map(student=>{
            return <Student 
                        sayHelloTo ={this.props.sayHelloTo} 
                        onStudentNameChanged={this.props.onStudentNameChanged}
                        showStudentInfo = {this.props.showStudentInfo}
                        id={student.id} 
                        name={student.name}
                        class={student.class} 
                        grade = {student.grade}
                        teacher = {this.props.teacher}
                        key={student.id}/>
        })
    }
}
export default Students;
