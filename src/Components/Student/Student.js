import React, { Component, PureComponent } from 'react'
import './Student.css'
var inputStyle = {
    "fontSize": "20px",
    "border": "1px solid red"
}
// function Student(props){
//     return <div>
//                 <p onClick={()=>props.showStudentInfo(props)}>
//                 <span className={'showRed'}>大家好</span> ，我是{props.name}，班级：{props.class}。{props.children}
//                 </p>     
//                 <input style={inputStyle} type="text" onChange={event=>props.onStudentNameChanged(event, props.id)} defaultValue={props.name}/>       
//             </div>
// }
class Student extends PureComponent {
    render() {
        return (<div>
            <p onClick={() => this.props.showStudentInfo(this.props)}>
                <span className={'showRed'}>大家好</span> ，我是{this.props.name}，班级：{this.props.class}。{this.props.children}，老师来自：{this.props.teacher.address.province}
            </p>
            <input style={inputStyle} type="text" onChange={event => this.props.onStudentNameChanged(event, this.props.id)} defaultValue={this.props.name} />
        </div>);
    }

    static getDerivedStateFromProps(props,state) {
        // This will erase any local state updates!
        // Do not do this!
        console.log(111);
      }

}
export default Student;