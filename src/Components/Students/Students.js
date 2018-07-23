import React from 'react';
import Student from '../Student/Student';
let students = props=>{
    return props.students.map(student=>{
        return <Student sayHelloTo ={props.sayHelloTo} onGradeChanged={props.onGradeChanged} name={student.name} class={student.class} key={student.name}/>
    })
}

export default students;
