import React from  'react'
import './Student.css'
var inputStyle = {
    "fontSize": "20px",
    "border": "1px solid red"
}
function Student(props){
    return <div>
                <p onClick={()=>props.showStudentInfo(props)}>
                <span className={'showRed'}>大家好</span> ，我是{props.name}，班级：{props.class}。{props.children}
                </p>     
                <input style={inputStyle} type="text" onChange={event=>props.onStudentNameChanged(event, props.id)} defaultValue={props.name}/>       
            </div>
}
export default Student;