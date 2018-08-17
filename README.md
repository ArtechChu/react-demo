[TOC]
# 1. React 基础使用demo，based on React.16.4.1
> react 官网：https://reactjs.org/
>
> 本次教程从上到下贯穿，如果发现代码有跳跃的，请对照上下文
> 
> 本次教程基于环境、使用工具以及版本：
> - *nodejs：8.11.3*
> - *react：16.4.2*
> - *npm：6.2.0*
> - *SPA（单页应用）*

# 2. 创建项目

## 2.1. 安装脚手架：create-react-app

```shell
npm install -g create-react-app@2.0.0-next.3e165448
```

## 2.2. 创建react项目

```shell
create-react-app react-demo
```

# 3. 项目结构说明

创建好之后的项目结构

![react 项目结构](https://images2018.cnblogs.com/blog/1101407/201807/1101407-20180713113305145-1617706627.png)

其中：

- /public/index.html是整个项目的入口文件，我们可以在该文件中添加一些CDN资源，如jQuery等。

  - index.html文件内容

    ![index.html内容](https://images2018.cnblogs.com/blog/1101407/201807/1101407-20180716143525133-52651282.png)

    >P.S.：在index.html中，有一个根容器：<div id="root"></div> ，这个是整个项目的总容器，创建的组件最终都生成在该容器中。
    >
    >对于该文件，一般情况下，我们不会在这个html文件中增加我们的业务代码

  - *额外说明：在对项目进行解包后，在webpack的配置中，脚手架将src/index.js作为了整个项目的入口文件，如下图：*

    ![解包后入口文件配置](https://images2018.cnblogs.com/blog/1101407/201807/1101407-20180716143041900-1455397530.png)

> 运行eject解包命令后，会删除一些已经安装的包，此时需要重新运行npm install 进行安装

- src文件夹：

  - src/index.js：跟index.html相关联，会将该js中声明的组件渲染到public/index.html中 "id=root" 的容器内

  ![index.js](https://images2018.cnblogs.com/blog/1101407/201807/1101407-20180713144814373-1366441329.png)

  >ReactDOM.render是react最基本的方法，用于将模板转换为HTML语言，并插入到指定的DOM节点。
  >像上面的代码的意思就是把App这个组件转换成html后插入到root节点中
  >在这里，可以将 \<App /> 认为是整个项目的根组件，要使用App组件，需要引入该组件，见L4（第四行）：通过  ***import App from './App'***  进行引用，默认情况下，webpack自动将文件作为js文件进行处理，所以这里在引入App.js的时候，不用显示指明 "./App.js"

  

# 4. JSX语法

脚手架创建的react项目中的App.js，默认使用了JSX语法

JSX语法与非JSX语法对比：

![JSX语法与非JSX语法对比](https://images2018.cnblogs.com/blog/1101407/201807/1101407-20180716141903506-640158671.png)

> 以上两个文件，最终编译后的效果是一样的，但右边的JSX语法提供了语法糖，可以让我们更加直观的书写代码，层次结构更为清晰。

JSX语法的一些简单说明：

1. 在JSX中，通过花括号 {} ，可以使用javascript表达式，如：

   ```JS
     render() {
       return (
         <div className="App">
            <span>hello react.</span>
            <div id="demo">
             1+1={1+1}   //最终结果:1+1=2
            </div>
         </div>
       );
     }
   ```

2. JSX中无法使用 if-else，但可以使用三元表达式来代替，如

   ```javascript
     render() {
       let isDisplayOne = true;
       let one="i am One";
       let two="i am Two";
       return (
         <div className="App">
            <span>hello react.</span>
            <div id="demo">
            {isDisplayOne?one:two} //通过三元表达式代替if-else，如果?号后面的内容过多，建议抽取后通过变量赋值
            </div>
         </div>
       );
     }
   ```
3. JSX中，html标签内部的注释需要用花括号括起来，如：
    ``` javascript
    render() {
      return (
        <div className="App">
          <span>hello react.</span>
          <div id="demo">
            {/* <span>test annotation</span> */}
          </div>
        </div>
      );
    }
    ```
4. JSX中，使用数组，会将数组中的内容自动按照顺序填充到html标签中，如：
    ``` js
    render() {
      let arr = [
        <span style={{color:'blue'}}>1.hello</span>,
        <span style={{color:'yellow'}}>2.world</span>
      ];
      return (
        <div className="App">
          <span>hello react.</span>
          <div id="demo">
            <div>{arr}</div>
          </div>
        </div>
      );
    }
    ```
    >如果要在jsx中使用内联属性元素，则属性值在赋值的时候需要用双花括号括起来。
5. 在JSX中，html中的一些元素属性：如class，for，需要使用 className 和 htmlFor 来做代替，如：
    ``` js
    render() {
      return (
        <div className="App">
          /*以下内容最终生成的html为：<span class="testClass" for="using htmlFor">hello react.</span> */
          <span className="testClass" htmlFor="using htmlFor">hello react.</span>        
        </div>
      );
    }
    ```

6.jsx中，属性事件
- 命名上，类似于camel命名，如：
``` html
<button onClick="XXXXX">button</button>
这里在定义点击事件的时候，不再是全小写的“onclick”，而是“onClick”--- C 大写
```
- 事件使用
``` js
假设在声明了如下方法：
  //无参方法
  sayHello(){
    console.log("say hello");
  }
  //带参方法
  sayHelloTo(name) {
    console.log("hello  " + name);
  }
通过按钮点击事件使用 sayHello方法
  <div><button onClick={this.sayHello} >button</button></div>
```
>在调用方法的时候，需要注意以下几点：
>  1. 若调用的方法不带参数，如 sayHello：
>     - 若调用时方法上带上了圆括号，如 onClick={this.sayHello()}，则在页面加载的时候，该方法会自动执行一遍。
>     - 若调用时没有带圆括号，如 onClick={this.sayHello}，则页面加载的时候，该方法不会自动执行，需要点击该按钮后才会被执行。
>  2. 若调用的方法带参数，如 sayHelloTo：
>     - 若调用方式为：onClick={this.sayHelloTo('Lucy')}，则页面加载的时候，该方法就自动执行，且之后按钮再怎么点击也无效
>     - 若想让带参方法不自动执行，方法有两种：
>       1.通过箭头函数：onClick={()=>this.sayHelloTo("Lucy")}
>       2.使用bind：onClick={this.sayHelloTo.bind(this,"Lucy")} //第一个参数表示当前指向的对象，这里传的this表示的当前js中定义的class(因为该this是JSX中的this)，第二个参数开始就是调用方法的入参

# 5. Component：组件
最简单的一个组件例子：
在项目src文件夹中，创建如下目录和文件：
![Students组件](https://images2018.cnblogs.com/blog/1101407/201807/1101407-20180716181108312-525461363.png)

## 5.1 创建自定义组件：Student.js
```js
  import React from  'react' //如果要用到JSX语法，就需要导入react
  function Student(){
      return <p>大家好，我是学生A</p> //JSX
  }
  export default Student;
```
## 5.2 在App.js中使用自定义组件
```js
import React, { Component } from 'react';
import './App.css';
import Student from './Components/Student/Student'; //引入组件
class App extends Component {
  
  render() {
    return (
      <div className="App">
         <Student /> //使用组件
      </div>
    );
  }
}

export default App;
```
>1.约定：为了区分自定义组件和原生html标签，建议在导入组件命名时，使用Pascal命名法。
>2.在引入自定义组件的时候，必须使用相对路径，否则会被认为是通过npm/yarn等安装的包。

在本例中，页面文件、组件的加载顺序为：
``` sequence
Title:页面加载时序图
Note over index.html:页面开始加载
index.html->index.js: 加载index.js
Note over index.js:开始执行
index.js->App.js: 加载App组件
Note over App.js:开始执行
App.js->Student.js: 加载Student组件
Note over Student.js:执行js代码
Student.js--> App.js:Student组件渲染完成
Note over App.js:继续执行App组件其他代码
App.js--> index.js:Student组件渲染完成
Note over index.js:继续执行其他代码
index.js--> index.html:index.js加载完成
Note over index.html:继续执行其他代码
```
## 5.3 props
props是react内置的，可以直接在组件中作为入参来进行使用。
>props用于数据的单向传递，主要是用来在组件间传值的。

Student.js
```js
import React from  'react'
function Student(props){
    return <div>
            <p>大家好，我是{props.name}，班级：{props.class}。{props.children}</p>            
            </div>
}
export default Student;
```
使用
```js
App.js
    import Student from './Components/Student/Student'; //1.引入组件
    class App extends Component {
      render() {
        return (      
          <div className="App">
          <h1>demo</h1>
            <Student name="学生A" class="Class_1"/>   //2.使用
            <Student name="学生B" class="Class_4"/>
            <Student name="学生C" class="Class_3">
              <span style={{color:"red"}}>目前是打酱油的</span>
            </Student>
          </div>
        );
      }
    }
```
在Student.js中通过props使用的属性，在调用方需要以"属性元素"的形式来使用，如这里的：
```html
<!--这里的name对应props.name，class对应props.class-->
<Student name="学生A" class="Class_1"/>  
<Student name="学生B" class="Class_4"/>
<Student name="学生C" class="Class_3">
  <!--这里的span在Student标签内声明，对应props.children-->
  <span style={{color:"red"}}>目前是打酱油的</span>  
</Student>
```
效果图：
![props使用效果图](https://images2018.cnblogs.com/blog/1101407/201807/1101407-20180718172739719-612768523.png)

通过属性传递事件

```js
给Student.js中的 p 标签增加点击事件 onClick
Student.js
import React from  'react'
function Student(props){
    return <div>
            <p onClick={props.onChangeGrade}>大家好，我是{props.name}，班级：{props.class}。{props.children}</p>            
            </div>
}
export default Student;

在父组件App.js中，增加onChangeGrade的传入
App.js
class App extends Component {
  ...
  changeGrade= ()=>{
    this.setState({
      grade: "Grade Two"
    })
  }
  ...
  render() {
    return (
      <div className="App">
        <h1>demo</h1>
        <h2>Grade:{this.state.grade}</h2>
        <Student name={this.state.students[0].name} class={this.state.students[0].class} />
        <Student name={this.state.students[1].name} class={this.state.students[1].class} />
        {/*增加 onChangeGrade 属性，传入 changeGrade方法 给Student组件*/}
        <Student onChangeGrade={this.changeGrade} name={this.state.students[2].name} class={this.state.students[2].class}>
          <span style={{ color: "red" }}>目前是打酱油的。</span>
        </Student>
        <div><button onClick={this.sayHelloTo.bind(this,"Lucy")} >button</button></div>
      </div>
    );
  }
}
```

## 5.4 state
state：主要用来动态改变组件内容的值。一般通过一些事件（如点击事件）来对现有的值进行改变。
***state是定义在Component中的一个属性，所以只能在class中使用，且该类必须要继承 Component,定义如下***
![state在Component中的定义](https://images2018.cnblogs.com/blog/1101407/201807/1101407-20180718164253360-1956049745.png)
### 定义state
App.js
```js
import React, { Component } from 'react';

class App extends Component {
  state = {
    students: [
      { name: "学生A", class: "class_1" },
      { name: "学生B", class: "class_4" },
      { name: "学生C", class: "class_3" }
    ],
    grade: "Grade One"
  }
  ...
}

```

### 使用state
```js
class App extends Component {
  ...
  state = {
    students: [
      { name: "A", class: "class_1" },
      { name: "B", class: "class_4" },
      { name: "C", class: "class_3" }
    ],
    grade: "Grade One"
  }
  ...
  render() {
    return (
      <div className="App">
        <h1>demo</h1>
        <h2>Grade:{this.state.grade}</h2>
        <Student name={this.state.students[0].name} class={this.state.students[0].class} />
        <Student name={this.state.students[1].name} class={this.state.students[1].class} />
        <Student name={this.state.students[2].name} class={this.state.students[2].class}>
          <span style={{ color: "red" }}>目前是打酱油的。</span>
        </Student>
        <div><button onClick={this.changeName} >button</button></div>
      </div>
    );
  }
  ...
}
```
>这里的 this 指向的是当前 class
### 修改state
对于state中的内容，没有办法直接修改，如：this.state.students[0].name="haha";编译器会给出错误提示，如下：
![直接修改state内容错误提示](https://images2018.cnblogs.com/blog/1101407/201807/1101407-20180718170833727-783273299.png)
根据提示，无法直接修改state，需使用 setState()进行更改（该方法同样是定义在Component中）
App.js
```js
  changeGrade=()=> {
    this.state.grade="Grade Two";
  }
  调整为：
  changeGrade=()=> {
    this.setState({
      grade: "Grade Two"
    })
  }
```
>注意，**这里的方法定义使用的是ES6语法**，所以this指向的是当前类，如果用非ES6语法，如：
![非ES6语法，this指代的是window对象](https://images2018.cnblogs.com/blog/1101407/201807/1101407-20180718174705322-60008040.png)
>这样是会报错的，提示setState方法未定义，此时的this指代的是window
>*建议：个人建议使用ES6语法，减少不必要的错误概率*

### 通过state实现数据的双向绑定
一般使用input，select，checkbox等拥有输入功能的标签来实现，本次demo使用input输入框；
调整组件Student.js，增加一个输入框，用来调整当前行的数据内容
```js
Student.js
    import React from  'react'
    function Student(props){
        return <div>
                    <p onClick={props.onChangeGrade}>大家好，我是{props.name}，班级：{props.class}。{props.children}</p>     
                    {/*增加输入框，增加外层传入的事件*/}
                    <input type="text" onChange={props.onGradeChanged}/>       
                </div>
    }
    export default Student;

App.js
  {/*新增方法*/}
  onGradeChanged= (event)=>{ //在react中，这里的event是SyntheticEvent的实例
    this.setState({
      grade:event.target.value
    })
  }
  render() {
    return (
      <div className="App">
        ...
        {/*在子组件中增加属性 onGradeChanged，传入声明的事件*/}
        <Student onGradeChanged={this.onGradeChanged} ... />
        ...
      </div>
    );
  }
```
>SyntheticEvent介绍：https://reactjs.org/docs/events.html

这样就可以实现数据的双向绑定，此时在 输入框 中输入的内容就会同步更新在 grade 上。效果如下：

#### ???????????????这里用动图代替??????????????????????????????

## 5.5 有状态组件和无状态组件
>区别：有状态组件中可以实用state，无状态组件无法使用state
>有状态组件拥有生命周期函数，而无状态组件没有

### 5.5.1 无状态组件
>实际上就是个函数
>使用：通过属性(入参)来实现数据传递：props.YY
>使用场景：仅仅只是传递数据，那么就用无状态组件----仅渲染
```javascript
Grade.js
    import React from 'react';

    let grade = props=>{
        return <h2>Grade:{props.gradeInfo}</h2>
    }

    export default grade;
```

### 5.5.2 有状态组件
> 继承Component，且是一个class的js文件，这样的，称之为有状态组件
> state是在Component中定义的。
> 状态通过父级传递。
> 使用：通过 this.state.XXX 或者 this.props.YY 来接收状态和属性
> 使用场景：需要管理状态，或者用到声明周期函数的时候使用。----操作数据
```javascript
将 Grade.js改成有状态组件
    import React, { Component } from 'react';

    class Grade extends Component {
        render() {
            return (<h2>Grade: {this.props.gradeInfo}</h2>)
        }
    }

    export default Grade;
```

> React.Component 和 React.PureComponent
## 5.6 生命周期函数
>- 每一个组件都有好几个生命周期函数。
>- ***只有有状态组件才有生命周期函数。***
>- 生命周期函数有的只运行依次，有的是持续运行的。

![生命周期流程图，见onedrive.KD.VISIOS文件夹](https://images2018.cnblogs.com/blog/1101407/201808/1101407-20180806155629520-909648410.jpg)


### 创建流程：
- constructor：ES6方法
    - 在mount之前被触发；
    - 不是React提供的方法，而是ES6提供的方法；
    - 如果实现了构造函数，则必须要调用super(props)，否则props在构造函数中会是undefined（这是个bug）
        - 不能再构造函数中调用 this.setState()，而是直接给this.state赋值（也仅有再构造函数中可以给this.state直接赋值）
    - 一般在构造函数中进行方法的绑定和state的初始化（换句话说如果不绑定方法，也不初始化state，那么这个方法可以不用实现。）
        ```javascript
        constructor(props) {
              super(props);
              // Don't call this.setState() here!
              this.state = { counter: 0 };
              this.handleClick = this.handleClick.bind(this);
        }
        ```
        - 不要在构造函数中进行订阅事件操作（订阅相关的可以放到componentDidUpdate()方法中）。
        - 不能将props中的值赋值给state，如以下是错误的：
            ```javascript
            constructor(props) {
                 super(props);
                 // 不要这么做，另外也没有意义，可以直接使用this.state和this.props
                 this.state = { color: props.color };
            }
            ```
    

- componentWillMount：React方法
    - 组件即将要开始生成的时候；
    - eg：移动端的一些启动页：可以在这个钩子函数中设计一些逻辑，修改一些状态，让启动页启动起来。

- render：React方法
    - 创建虚拟DOM，将JSX解析成ES5等浏览器识别的代码。
    - 同时也会加载所有子组件。

- componentDidMount：React方法
    - 组件渲染完毕后执行
    - 一般的，如果你要从远端获取加载数据，那么这个方法中适合进行网络请求。
    - 同样，这个方法同样适合进行一些订阅。（当然，不要忘记在componentWillMount中进行"取消订阅"的操作。）
    - P.S.在这个方法中，不要setState()，这个有可能会触发一次额外的渲染（在浏览器更新屏幕前渲染--由此确保虽然更新了两次，但对于用户来说是无缝的，不会让用户看到中间状态）。
        - 在这里设置setState()会导致性能问题
        - 设置状态一般放到构造函数中进行处理。

### 更新流程
- static getDerivedStateFromProps(props, state)：
    - 在调用render()之前调用（无论是第一次加载还是后续的更新中）。
    - 应当返回一个 object以更新 state，或者返回null表示不更新。
    - 该方法在每次被渲染时就会被执行（同componentWillReceiveProps不同--componentWillReceiveProps只在父级更新时才会被触发（即本地state更新不会触发该方法））
    - 该方法没有权限访问Component实例，所以如果要使用这个方法的话，自定义组件需要继承自PureComponent，而非Component
- componentWillReceiveProps(nextProps)：【弃用】组件发生改变触发
- getSnapshotBeforeUpdate(prevProps, prevState)：在最近的更改被提交到DOM元素之前被触发，组件可以通过该方法在更改之前获得当前值，此函数返回的值都会传给componentDidUpdate()
    - 该方法返回null或者一个对象
    - 通过该方法可以实现类似于延迟加载的功能（当X/Y轴滚动到某一位置的时候，可能会触发一些业务代码，从而可以在该方法中返回一个对象供componentDidUpdate调用）
- shouldComponentUpdate(nextProps, nextState)：控制组件是否重新渲染
    - 默认为true：只要state更新，就会重新渲染。大多数情况下，保持默认即可。
    - 初始渲染时，该方法不会被执行。
    - 如果使用了forceUpdate()，则该方法也将无效。
    - 该方法主要用于性能优化，不要将此方法用于阻断渲染，可能会出现异常。
    - 如果返回false，则不会阻碍该组件的子组件在它们(子组件)的state发生更新时进行重新渲染(子组件重新渲染)。
    - 目前(16.4.2)，如果返回false，则UNSAFE_componentWillUpdate()，render()以及componentDidUpdate()都将不会被触发。【未来，React可能会调整该方法：无论是否返回false，都可以更新组件】
    - 如果要自定义这个方法，一般比较this.props和nextProps，this.state和nextState，以此来告诉React跳过更新。
    - 不推荐深层次比较或者使用JSON.stringify来进行比较，会相当影响性能。（可以使用PureComponet）
- componentWillUpdate(nextProp, nextState)：【弃用】，存在安全隐患
    - 不能再该方法中调用 this.setState()。
    - 在该方法返回之前，你也不能调用Redux等操作进行组件的更新。
    - 此方法可以被componentDidUpdate替换，如果在这个方法中进行了诸如保存滚动位置的操作，则这些操作的逻辑可以移动到getSnapshotBeforeUpdate()中
    - 如果shouldComponentUpdate()返沪ifalse，则该方法不会被触发
- render()
- 更新与当前相关的子组件
- componentDidUpdate(prevProps, prevState, snapshot)：组件更新后将会触发该方法的执行
    - 一般在这个方法中通过比较相应的值，来判断是否需要进行一次网络请求。
    - 在这个方法中可以进行 setState，但是要注意，务必外层是if条件判断，否则会引起死循环和性能问题。
    - 如果要获取第三个入参snapshot的值，则需要实现 getSnapshotBeforeUpdate()，否则该值为undefined。
    - 如果shouldComponentUpdate()方法返回的是false，则componentDidUpdate将不会被触发。


### 卸载流程
- componentWillUnmount：
    - 在组件卸载或销毁前进行触发
    - 在这个方法中，一般进行一些清理操作，诸如：清理timer，取消网络请求，清除在componentDidMount()中进行的订阅
    - 不应调用setState()方法，因为此时组件将再也不可能再次渲染。
    - 一旦组件被卸载，那么该组件再也不可能再加载。
    
### 其他生命周期函数
- componentDidCatch(error, info)：捕获子组件任何地方的js错误
    - 捕获的是constructor()、rendering()期间，生命周期函数中的异常错误。
    - 如果class组件定义了这个方法，那么组件自身将成为"错误边界"，在该方法中调用setState方法将能够让你捕获其下树种未处理的js错误并且显示一个回调UI。
    - 仅使用错误边界来从异常中恢复，不要用于控制流。
- setState()：设置方法
    - 通过该方法来更新state，以此来告诉React需要将该组件以及该组件的子组件们进行重新渲染。
    - 这是用来更新用户界面以响应事件处理程序的和服务器响应的主要方法。
    - 应将该方法视为“request” 而不是立即更新组件的"命令"。为了获得更好的性能，React可能会延迟该方法的执行，然后再一次更新中同时更新几个组件
    - React不保证立即更改应用的state。
        - 所以在调用setState()之后立即调用this.state会是一个潜在的问题。
            - 但可以通过componetDidUpdate或者setState的回调函数
            setState(updaterFun, fallback)来保证APP在setState之后，state的值被更新。
                - updaterFun的签名：(prefState, props)=>stateChange，eg：
                ```javascript
                this.setState((prevState,props)=>{
                    return {counter:prevState.counter+props.step};
                })
                ```
                - fallback：在设置后被执行"一"次
                - 一般情况下，不要这么干，用componentDidUpdate来代替实现。
    - 只要调用setState，就必然会导致重新渲染（除非shouldComponentUpdate返回false），不管setState的对象是否有变动，都会重新渲染，所以需要结合shouldComponentUpdate方法一起调用。
    
- forceUpdate(callback)：如果一些数据(非state和props)更新也需要让页面渲染，那么可以执行这个方法
    - 将无视 shouldComponentUpdate()方法。包括子组件的shouldComponentUpdate()方法。
    - 一般情况下，不调用这个方法来重新渲染，而是依赖this.state和this.props

### class属性
- defaultProps：可以给class自己定义一个默认属性，如：
    ```javascript
    class CustomButton extends React.Component {
      // ...
    }
    
    CustomButton.defaultProps = {
      color: 'blue'
    };
    ```
    - 如果此时props.color没有定义/传值赋予，那么默认将为 blue

- displayName
    - 用于debug，一般情况下不用设置，忽略即可

### 实例属性
- props：由调用者声明。
- state：用户定义的state，包含特定于此组件的数据，该数据可能会随时间而变化，应该是一个简单对象
    - 如果一些属性不是用来渲染数据流的，那么就不应该将这些属性放到state中，而是直接以字段(fields)存放在组件中。

    
### 生命周期函数demo
``` javascript
App.js （需要确保是有状态组件）
constructor(){
    super();
}

或者

constructor(props){ //构造函数会自动接收props属性，所以可以直接这么些
    super(props);//必须要写，否则胡i爆粗o
}

componentWillMount(){ //可以在这个方法中修改state
    console.log("[App.js]---->componentWillMount() running.");
}
render(){//渲染页面（加载JSX语法）
    console.log("[App.js]---->render() running.");
}
componentDidMount(){
    console.log("[App.js]---->componentDidMount() running.");
}
```
单个组件生命周期函数执行顺序:
![生命周期函数执行顺序](https://images2018.cnblogs.com/blog/1101407/201808/1101407-20180806140806914-2008224126.png)

多个组件嵌套情况下函数执行顺序：
```js
Students.js
class Students extends Component{
    constructor(props){
      super(props);
      console.log("[Students.js]---->constructor() running.");
    }
    
    componentWillMount(){
      console.log("[Students.js]---->componentWillMount() running.");
    }
    componentDidMount(){
      console.log("[Students.js]---->componentDidMount() running.");
    }

    render(){
        console.log("[Students.js]---->render() running.");
		...
    }
}
```
```js
Student.js
    class Student extends Component {
        constructor(props){
          super(props);
          console.log("[单Student.js]---->constructor() running.");
        }
        
        componentWillMount(){
          console.log("[单Student.js]---->componentWillMount() running.");
        }
        componentDidMount(){
          console.log("[单Student.js]---->componentDidMount() running.");
        }
    
        render() {
            console.log("[单Student.js]---->render() running.");
            ...
        }
    }
```
![多个组件嵌套情况下函数执行顺序](https://images2018.cnblogs.com/blog/1101407/201808/1101407-20180806142442476-376313379.png)

只要有任一组件更新，那么都会从父级开始，依次重新渲染每一个组件
> 当props更改时，需要响应一个操作，如获取数据或者进行动画，建议使用componentDidUpdate
> 当props更改时，需要重新计算一些数据，建议使用memoize-one
> 当props更改时，需要重置一些state，建议使用完全可控/完全不可控--通过key的组件

### 可控组件 和 不可控组件
- 可控组件：组件中的state遵守了“单一数据源原则”，那么就可以认为组件是可控的。
    - 所谓可控就是说state中定义的属性，其数据来源只有一个地方【如某一个输入元素(input)】。
    - 符合上面这条的组件，就认为是可控组件。
    - 对于受控组件而言，每一次state的更新都会伴有相关联的处理函数
- 不可控组件：通过props从外部传入的值，被组件内部的state管理着(即数据由DOM自己处理)，这样的组件成为不可控组件，如下面例子
```javascript
class EmailInput extends Component {
  state = { email: this.props.defaultEmail };//组件内部的state管理通过props从外部传入的defaultEmail属性

  handleChange = event => {
    this.setState({ email: event.target.value });
  };

  render() {
    //使用this.state.email而非this.props.defaultEmail
    return <input onChange={this.handleChange} value={this.state.email} />;
  }
}
//对于这样的代码，当第一次渲染完成后，将会忽略后续props的更新
//为了解决这个问题，需要引入 “key”这个属性，这个时候只要key的值更新了，那么对应的组件就会重新渲染。方法：
<EmailInput
  defaultEmail={this.props.user.email}
  key={this.props.user.id}
/>
//只要id的值变了，EmailInput这个组件就会被重新渲染（此时state也会被重置成最新的defaultEmail这个属性所拥有的值。）
//这里可以再改进下：将key放在外层的form上更好，这样不用form内的每个组件都添加key属性，只要key更新了，那么form内的组件都会重新创建。
```


# 6.改变元素样式
方法有2种：
  1. 通过 import 导入样式
  2. 在组件中定义样式
## 6.1 通过import导入样式：
在Student.js同级目录创建Student.css
```css
.showRed {
    color:red;
}
```
在Student.js中使用该样式
```js
Student.js
  import React from  'react'
  import './Student.css' //1.引入样式，之后就可以直接使用了，如使用 .showRed
  function Student(props){
      return <div>
                  <p onClick={props.onChangeGrade}>
                  {/*2.直接使用样式名即可*/}
                  <span className='showRed'>大家好</span> ，我是{props.name}，班级：{props.class}。{props.children}
                  </p>     
                  <input type="text" onChange={props.onGradeChanged} value={props.name}/>       
              </div>
  }
  export default Student;
```
## 6.2 在组件中定义样式
```js
Student.js
    import React from  'react'
    ...
    //自定义样式
    var inputStyle = {
        "fontSize": "20px", //注意对于带"-"的样式，均已camel命名法来代替
        "border": "1px solid red"
    }
    function Student(props){
        return <div>
                    ...   
                    {/*直接使用变量*/}
                    <input style={inputStyle} type="text" onChange={props.onGradeChanged} value={props.name}/>       
                </div>
    }
    export default Student;
```
6.1，6.2 效果图：
![6.1，6.2效果图](https://images2018.cnblogs.com/blog/1101407/201807/1101407-20180719161658883-1256147739.png)
>对于一些CDN样式资源，则可以直接在index.html中引入


# 7. 流程控制语句
## 7.1 条件语句
demo：通过按钮来隐藏/显示  grade年级信息：
调整App.js代码，增加方法 toggleGradeInfo
```js
class App extends Component {

  state = {
    students: [
      { name: "学生A", class: "class_1" },
      { name: "学生B", class: "class_4" },
      { name: "学生C", class: "class_3" }
    ],
    grade: "Grade One",
    showGradeInfo:true
  }
  ...
  toggleGrade=()=>{
    this.setState({
      showGradeInfo: !this.state.showGradeInfo
    })
  }
  
  render() {
    var gradeInfo = null;
    if(this.state.showGradeInfo){
      gradeInfo = <h2>Grade:{this.state.grade}</h2>
    }
    return (
      <div className="App">
        <h1>demo</h1>
        {
          gradeInfo
        }
        ...
        <div><button onClick={()=>this.toggleGrade()} >button</button></div>
      </div>
    );
  }
}
```
# ????????这里放gif动图?????????
>注意：
> 1. 在JSX中，如果要使用表达式，则需要用花括号括起来，如这里的    {gradeInfo}
> 2. 在JSX中，无法在花括号中使用 if-else 条件语句，，但可以使用三元表达式代替，具体方法为：
>   {  this.state.showGradeInfo? \<h2>Grade:{this.state.grade}\</h2>:null  }
>   当然这里可以直接用上面定义的gradeInfo变量。
> Tips：个人建议在JSX中尽量少业务逻辑，只放结果，将判断逻辑都抽取到JSX外层，也便于后期提取方法

## 7.2 循环语句：本次演示两种方式
调整App.js对于Student组件的使用，使之可以根据state.students循环输出Student组件。
调整Student.js
```js
Student.js
      import React from  'react'
      import './Student.css'
      var inputStyle = {
          "fontSize": "20px",
          "border": "1px solid red"
      }
      function Student(props){
          return <div>
                      <p onClick={()=>props.sayHelloTo(props.name)}>
                      <span className={'showRed'}>大家好</span> ，我是{props.name}，班级：{props.class}。{props.children}
                      </p>     
                      <input style={inputStyle} type="text" onChange={props.onGradeChanged} defaultValue={props.name}/>       
                  </div>
      }
      export default Student;
```
### 7.2.1 方法一：通过for/foreach
```js
class App extends Component {
  state = {
    students: [
      { name: "学生A", class: "class_1" },
      { name: "学生B", class: "class_4" },
      { name: "学生C", class: "class_3" }
    ],
    grade: "Grade One",
    showGradeInfo:true
  }

  sayHelloTo=(name)=>{    
    console.log("hello  " + name);
  }

  ...
  
  render() {
    {/*定义一个数组，用来存放Student组件，之后直接渲染*/}
    let students = [];
    this.state.students.forEach((student,index)=>{ {/*这个地方亦可以使用for循环*/}
      students.push(<Student sayHelloTo ={this.sayHelloTo} onGradeChanged={this.onGradeChanged} name={student.name} class={student.class} key={index}/>)
    })

    return (
      <div className="App">
      ...
      {
        students    {/*直接渲染*/}
      }
      ...
      </div>
    );
  }
}
```
### 7.2.2 方法二：使用map方法遍历输出
直接在JSX中通过花括号写表达式
```js
class App extends Component {
  state = {
    students: [
      { name: "学生A", class: "class_1" },
      { name: "学生B", class: "class_4" },
      { name: "学生C", class: "class_3" }
    ],
    grade: "Grade One",
    showGradeInfo:true
  }

  sayHelloTo=(name)=>{    
    console.log("hello  " + name);
  }

  ...
  
  render() {
    ...
    return (
      <div className="App">
      ...
      {
        {/*直接通过map函数进行渲染*/}
         this.state.students.map(student=>{
           return <Student sayHelloTo ={this.sayHelloTo} onGradeChanged={this.onGradeChanged} name={student.name} class={student.class} key={student.name}/>
         })
      }
      ...
      </div>
    );
  }
}
```
# 8.重构项目：将页面通过组件进行渲染
> 1. 新增Students作为学生列表组件，其内包含Student组件
> 2. 抽离grade信息到独立的组件中
> 3. 调整输入框功能为输入的内容替换"学生姓名"
```javascript
Student.js
  function Student(props){
    return <div>
                <p onClick={()=>props.sayHelloTo(props.name)}>
                <span className={'showRed'}>大家好</span> ，我是{props.name}，班级：{props.class}。{props.children}
                </p>  
                {/*注意这边传入事件的写法*/}   
                <input style={inputStyle} type="text" onChange={event=>props.onStudentNameChanged(event, props.id)} defaultValue={props.name}/>       
            </div>
  }

Students.js
  let students = props=>{
      return props.students.map(student=>{
          return <Student sayHelloTo ={props.sayHelloTo} onStudentNameChanged={props.onStudentNameChanged} id={student.id} name={student.name} class={student.class} key={student.name}/>
      })
  }
App.js
    state = {
      students: [//增加grade和id属性
        { name: "学生A", grade:"Grade one", class: "class_1", id:"1"},
        { name: "学生B", grade:"Grade one", class: "class_4", id:"2"},
        { name: "学生C", grade:"Grade Two", class: "class_3", id:"3"}
      ],
      grade: "Grade One",
      showGradeInfo:true
    }
    //新增方法
    onStudentNameChanged = (event, id)=>{
      let students = this.state.students;
      let student = students.find(ent=>ent.id===id);
      if(!student) return;
      student.name = event.target.value;
      this.setState({
        students:students
      });
    }
    render() {
    ...
    return (
        ...
        <Students students = {this.state.students} sayHelloTo = {this.sayHelloTo} onStudentNameChanged = {this.onStudentNameChanged}/>
        ...
        </div>
      );
    }
```
## 8.1 demo：两个子组件之间的通信：Grade.js和Student.js
>本次demo功能：点击 学生信息的时候，更新 年级信息
```javascript
Grade.js
    let grade = props=>{
        return <h2>Grade:{props.gradeInfo}</h2>
    }

Student.js
    function Student(props){
        return <div>
                    <p onClick={()=>props.showStudentInfo(props)}>
                    <span className={'showRed'}>大家好</span> ，我是{props.name}，班级：{props.class}。{props.children}
                    </p>     
                    <input 
                      style={inputStyle} 
                      type="text" 
                      onChange={event=>props.onStudentNameChanged(event, props.id)} 
                      defaultValue={props.name}/>       
                </div>
    }

Students.js
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
```
> Students.js中还有其他子组件，并且需要赋值，这传值复杂度就啧啧了，怎么办？--------> Redux


??????????????演示的时候可以再增加一个功能：删除当前学生信息?????????????????
??????????????演示的时候可以说明下，传值的时候，可以不用把student的属性都一个一个剥离出来，直接传入整个student对象?????????????????















# 其他
## 在create-react-app项目中使用HMR
通过react-hot-loader实现HMR，本文演示时版本为 4.0.0
安装
```js
npm install -D react-hot-loader@next
```
官方文档存在问题，根据npm/git文档是无法实现HMR效果的，至于百度出来的结果，不谈了，方式如下：
直接在项目根组件App.js中引入安装的 react-hot-loader，并调整导出组件的方式即可，如：
```js
App.js
        import { hot } from 'react-hot-loader' //1.引入模块
        class App extends Component {
          
          render() {
            return (
              
              <div className="App">
              <h1>demo</h1>
                <Student name="A" class="classaABCDEFG"/>
                <Student name="B" class="AAA"/>
                <Student name="C" class="BBBB"/>
              </div>
            );
          }
        }

        export default hot(module)(App);  //2.调整导出方式
```
运行npm start，查看效果
>注意，因为是在App.js引入HMR，所以HMR只对App.js中的代码以及内嵌的组件'们'有效。

***测试下state是否有状态保持***

## refs
> 一般情况下，props是父组件和子组件交互的唯一方式。但是在某些情况下，需要强制修改子项，这个时候就可以用refs。
- React提供的ref属性，表示为对组件真正实例的引用，实质就是ReactDOM.render()返回的组件实例。需要注意的是：
    - ReactDOM.render() 渲染组件时返回的是组件实例对象；
    - ReactDOM.render() 渲染DOM元素时，返回的是具体的DOM节点。
- 什么时候使用refs？
    - 管理focus，text-selection，或者媒体回放的时候；
    - 触发某些一定会执行的动画；
    - 与第三方DOM库集成的死后。
- 不要过度使用Refs：
- 使用说明：
    - **创建：** Refs通过React.createRef()创建，并通过ref属性附加到React元素。在构造组件时，通常将Refs分配给实例属性，以便可以在整个组件中引用它们，如下：
    ```javascript
    class MyComponent extends React.Component {
          constructor(props) {
            super(props);
            //创建
            this.myRef = React.createRef();
          }
          render() {
            //使用
            return <div ref={this.myRef} />;
          }
    }
    ```
    - **访问Refs：** ：当在render方法中使用ref属性之后，可以通过 ref.current属性进行访问，如
    ```javascript
    const node = this.myRef.current;
    ```
        - 如果ref属性被用于HTML元素，则在构造函数中通过React.createRef()创建的ref对象的current属性为该HTML元素
        - 如果ref属性被用于自定义的class组件，则ref对象的current属性为加载的组件自身
        - ref属性不能被用于函数组件（因为函数组件没有实例）
- 其他说明：
    - 当组件被加载的时候，DOM元素将被React分配给current属性。
    - 当组件被卸载的时候，current属性将被赋值为null。
    - ref的更新在 componentDidMount 或 componentDidUpdate之前。
        