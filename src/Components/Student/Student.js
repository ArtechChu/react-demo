import React from  'react'
function Student(props){
    return <div>
            <p onClick={props.onChangeGrade}>大家好，我是{props.name}，班级：{props.class}。{props.children}</p>            
            </div>
}
export default Student;