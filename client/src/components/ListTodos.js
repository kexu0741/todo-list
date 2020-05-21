import React, {Fragment, useEffect, useState} from "react";

const ListTodos = () => {

	const [todos, setTodos] = useState([]);

	const getTodos = async() => {
		try{
			const response = await fetch("http://localhost:5000/todos"); //by default, fetch makes GET
			const jsonData = await response.json();

			setTodos(jsonData);
		} catch(err){
			console.error(err.message);
		}
	}

	const deleteTodo = async(id) => {
		try {
			const deleteTodo = await fetch('http://localhost:5000/todos/' + id, {
				method: "DELETE"
			});
			setTodos(todos.filter(todo => todo.todo_id !== id)); // spits out every todo except the one that's deleted
		} catch(err) {
			console.error(err.message);
		}
	}

	useEffect(() => {
		getTodos();
	}, []); // this way, we make only one request

	console.log(todos);
	return <Fragment>
	<table class="table mt-5 text-center">
	   	<thead>
	      <tr>
	        <th>Description</th>
	        <th>Edit</th>
	        <th>Delete</th>
	      </tr>
	    </thead>
	    <tbody>
	      {todos.map(todo => (
	      	<tr key={todo.todo_id}>
	      		<td>{todo.description}</td>
	      		<td>Edit</td>
	      		<td>
	      			<button className="btn btn-danger" onClick={() => deleteTodo(todo.todo_id)}>
	      				Delete
	      			</button>
	      		</td>
	      	</tr>
	      	))}
	    </tbody>
	</table>
	</Fragment>;
};

export default ListTodos;