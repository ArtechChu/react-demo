import React from 'react';
import Student from '../Student/Student';
let students = props=>{
    return props.students.map(student=>{
        return <Student 
                    sayHelloTo ={props.sayHelloTo} 
                    onStudentNameChanged={props.onStudentNameChanged}
                    showStudentInfo = {props.showStudentInfo}
                    id={student.id} 
                    name={student.name}
                    class={student.class} 
                    grade = {student.grade}
                    key={student.name}/>
    })
}

export default students;
