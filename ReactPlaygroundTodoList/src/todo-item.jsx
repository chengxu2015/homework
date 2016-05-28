'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

export default class TodoItem extends React.Component {
	constructor(props) {
		super(props);
	}

    childClick() {
        this.props.onClick(this.props.todo);
	}

    childDelete(){
        this.props.onDelete(this.props.todo);
    }

	render() {
        let liClassName = '';
        if(this.props.todo.isChecked){
            liClassName += 'completed';
        }
		return <li key={this.props.todo.id} className={liClassName}>
				<div className="view">
					<input className="toggle" type="checkbox"
						   checked={this.props.todo.isChecked}
						   onChange={this.childClick.bind(this)} />
					<label>{this.props.todo.title}</label>
					<button className="destroy" onClick={this.childDelete.bind(this)}/>
				</div>
		</li>;

	}
}