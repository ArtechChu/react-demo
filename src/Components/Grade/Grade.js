import React, { Component,PureComponent } from 'react';

class Grade extends Component {
    render() {
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