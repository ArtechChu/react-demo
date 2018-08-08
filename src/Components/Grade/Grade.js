import React, { Component, } from 'react';

class Grade extends Component {
    // constructor(props) {
    //     super(props);
    //     console.log("[Grade.js]---->constructor() running.");
    // }
    // componentWillMount() {
    //     console.log("[Grade.js]---->componentWillMount() running.");
    // }
    // componentDidMount() {
    //     console.log("[Grade.js]---->componentDidMount() running.");
    // }
    render() {
        console.log("[Grade.js]---->render() running.");
        return (<h2>Grade: {this.props.gradeInfo}</h2>)
    }
}

export default Grade;


//以下为无状态组件
// import React from 'react';

// let grade = props=>{
//     return <h2>Grade:{props.gradeInfo}</h2>
// }

// export default grade;