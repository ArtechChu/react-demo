import React, { Component } from 'react';
import Student from '../Student/Student';

class Students extends Component {
    constructor(props) {
        super(props);
        // console.log("[Students.js]---->constructor() running.");
        this.state = {
            tempStudentsInfo :"temp students containerInfo"
        };
    }


    // componentDidUpdate(prevProps, prevState) {
    //     console.log("[Students.js]---->componentDidUpdate() running.",prevProps);
    // }
    // componentWillUpdate(nextProps, nextState){
    //     console.log("[Students.js]---->componentWillUpdate() running",nextProps, nextState);
    // }

    // static getDerivedStateFromProps(props, state) {
    //     console.log("[Students.js]---->getDerivedStateFromProps() running，state=%o", props);
    //     return state;
    // }


    // shouldComponentUpdate(nextProps, nextState){
    //     console.log("[Students.js]---->shouldComponentUpdate() running", nextProps, nextState,this.props.students);
    //     return true;
    // }

    changesStudentsInfo=()=>{
        this.setState({
            tempStudentsInfo :"666666666666666"
        })

    }

    render() {
        // console.log("studets receiveProps：%o",this.componentWillReceiveProps)
        // console.log("[Students.js]---->render() running.");
        let students = this.props.students.map(student => {
            return <Student
                sayHelloTo={this.props.sayHelloTo}
                onStudentNameChanged={this.props.onStudentNameChanged}
                showStudentInfo={this.props.showStudentInfo}
                id={student.id}
                name={student.name}
                class={student.class}
                grade={student.grade}
                teacher={this.props.teacher}
                key={student.id} />
        });
        return (
        <div>
            <div>这里是Students容器：{this.state.tempStudentsInfo}</div>
            <button onClick={()=>this.changesStudentsInfo()}>修改Students Info</button>
            {students}
        </div>
        );
    }
}
export default Students;
