import React, { Component } from 'react';
class Title extends Component {
    constructor() {
        super();
        // console.log("[Title.js]---->constructor() running.");
        this.myRef = React.createRef();
        const node = this.myRef.current;
        console.log("title ref:%o",node);
    }
    // componentWillMount() {
    //     console.log("[Title.js]---->componentWillMount() running.");
    // }
    // componentDidMount() {
    //     console.log("[Title.js]---->componentDidMount() running.");
    // }
    // static getDerivedStateFromProps(props, state) {
    //     console.log("[Title.js]---->getDerivedStateFromProps() running，state=%o", props);
    //     return state;
    // }
    render() {
        // console.log("[Title.js]---->render() running.");
        return <h1 ref={this.myRef}>HELLO REACT DEMO</h1>;
    }
}
export default Title;