import React, { Component } from "react";

class Todo extends Component {

    DONE = () => {
        const { text, completed, Done } = this.props;
        if (completed)
            Done(0, text);
        else
            Done(1, text);
    };

    LABEL = () => {
        const { ID, completed } = this.props;
        let Style = { background: '#26ca299b' };
        if (completed) {
            return (
                <div className='todo-app__checkbox'>
                    <input type='checkbox' id={ID} onClick={this.DONE} />
                    <label htmlFor={ID} style={Style} />
                </div>
            )
        }
        else {
            return (
                <div className='todo-app__checkbox'>
                    <input type='checkbox' id={ID} onClick={this.DONE} />
                    <label htmlFor={ID} />
                </div>
            )
        }
    };

    DETAIL = () => {
        const { text, completed } = this.props;
        let Style = { opacity: 0.5, textDecorationLine: ' line-through' };
        if (completed) {
            return (
                <h1 className='todo-app__item-detail' style={Style}>{text}</h1>
            )
        }
        else {
            return (
                <h1 className='todo-app__item-detail'>{text}</h1>
            )
        }
    };

    render() {
        return (
            <li className="todo-app__item">
                {this.LABEL()}
                {this.DETAIL()}
                <img src="./img/x.png" className='todo-app__item-x' />
            </li>
        );
    }
}

export default Todo;