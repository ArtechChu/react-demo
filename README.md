# 1. React 基础使用demo，based on React.16.4.1

> react 官网：https://reactjs.org/
>
> 先决条件：安装nodejs，[官网](https://nodejs.org/en/)
>
> 本次教程基于环境、使用工具以及版本：
>
> - *nodejs：8.11.3*
> - *react：16.4.1*
> - *npm：6.2.0*
> - *SPA（单页应用）*

# 2. 创建项目

## 2.1. 安装 create-react-app

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

    

- src文件夹：

  - src/index.js：跟index.html相关联，会将该js中声明的组件渲染到public/index.html中 "id=root" 的容器内

  ![index.js](https://images2018.cnblogs.com/blog/1101407/201807/1101407-20180713144814373-1366441329.png)

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

   ```js
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
    ```js
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
    ```js
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
    ```js
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
```html
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