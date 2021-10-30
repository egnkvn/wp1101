import React, { Component } from "react";
import Header from "../components/Header";
import Item from "../components/List";

class App extends Component {
    constructor() {
        super()
        this.state = {
            ALL: [],
        }
        this.addList = this.addList.bind(this);
        this.Done = this.Done.bind(this);
    }

    addList(x) {
        if (x.key === 'Enter' && x.target.value !== "") {
            if (this.state.ALL.some(temp => temp.text === x.target.value))
                alert("Already in list");
            else {
                this.setState({ ALL: this.state.ALL.concat({ text: x.target.value, DONE: 0 }) });
            }
            x.target.value = "";
        }
    }

    Done(STATE, id) {
        let temp = this.state.ALL;
        if (STATE == 1) {
            for (let i = 0; i < temp.length; i++) {
                if (temp[i].text == id)
                    temp[i].DONE = 1;
            }
        }
        else {
            for (let i = 0; i < temp.length; i++) {
                if (temp[i].text == id)
                    temp[i].DONE = 0;
            }
        }
        this.setState({ ALL: temp });
    }

    count = () => {
        let num = 0;
        for (let i = 0; i < this.state.ALL.length; i++) {
            if (this.state.ALL[i].DONE === 0)
                num++
        }
        return (<div className="todo-app__total">{num} left</div>)
    };

    show = () => {
        return (
            <ul className="todo-app__list" id="todo-list">
                {this.state.ALL.map(list => (<Item text={list.text} ID={list.text} key={list.text}
                    Done={this.Done} completed={list.DONE} />))}
            </ul>
        )
    };

    render() {
        return (
            <>
                <Header text="todos" />
                <section className="todo-app__main">
                    <input className="todo-app__input" placeholder="What needs to be done?" onKeyPress={this.addList} />
                    {this.show()}
                </section>
                <footer className="todo-app__footer" id="todo-footer">
                    {this.count()}
                    <ul className="todo-app__view-buttons">
                        <button>All</button>
                        <button>Active</button>
                        <button>Completed</button>
                    </ul>
                    <div className="todo-app__clean">
                        <button>Clear completed</button>
                    </div>
                </footer>
            </>
        )
    }
}

export default App;