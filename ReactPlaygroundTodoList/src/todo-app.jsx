'use strict';

import React from 'react';
import _ from 'lodash';
import TodoItem from './todo-item.jsx';

var ENTER_KEY = 13;

export default class TodoApp extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			todos: [],
			todo: {},
            isToggleAll: false
		};
        //bind once
        this.onCheck = this.onCheck.bind(this);
        this.onDelete = this.onDelete.bind(this);
	}

	onChange(event){
		this.setState({todo:{inputText:event.target.value}});
	}

	pressEnterKey(event){
        if(event.target.value === ''){
            return null;
        }
		if(event && event.keyCode === ENTER_KEY){
			event.preventDefault();
            var newTodo = {title:this.state.todo.inputText, id: Date.now(), isChecked: false};
			var newTodos = this.state.todos.concat(newTodo);
			var sortedNewTodos = _.sortBy(newTodos, ['title']);
			this.setState({todos: sortedNewTodos, todo: {}});
		}
	}
    //one setState() in one function
    onCheck(todo){
        var newTodo = _.update(todo, 'isChecked', () => {return !todo.isChecked});
        var newTodos = _.assign(this.state.todos, newTodo);
        var falseTodos = _.find(this.state.todos, {'isChecked': false});

        this.setState({todos: newTodos, isToggleAll: falseTodos === undefined})
	}

    onDelete(todo){
        var newTodos = _.pull(this.state.todos, todo);
        this.setState({todos: newTodos});
    }

    onToggleAll(event){
        var todosTemp = this.state.todos;
        var newTodos = todosTemp.map(function (todo) {
            todo.isChecked = event.target.checked;
            return todo;
        });

        this.setState({todos: newTodos, isToggleAll: event.target.checked});
    }

	render() {
		return (
			<div>
				<header className="header">
					<h1>TodoApp</h1>
					<input className="new-todo" 
						   placeholder="What needs to be done?" 
						   autoFocus={true}
						   onChange={this.onChange.bind(this)}
						   value={this.state.todo.inputText}
						   onKeyDown={this.pressEnterKey.bind(this)} />
				</header>
				<section className="main">
					<input className="toggle-all" type="checkbox" checked={this.state.isToggleAll}
                           onChange={this.onToggleAll.bind(this)} />
                        <ul  className="todo-list">
                            {
                                this.state.todos.map(todo => {
                                    return <TodoItem todo={todo}
                                                     onClick={this.onCheck}
                                                     onDelete={this.onDelete}
                                    />
                                })
                            }
                        </ul>
				</section>
			</div>
		);
	}
}
