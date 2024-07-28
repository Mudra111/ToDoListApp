import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import "./toDoList.css";

const ToDoList = () => {
	const [todos, setTodos] = useState([]);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");

	useEffect(() => {
		if (localStorage.getItem("uid")) {
			fetchTodos();
		}
	}, [localStorage.getItem("uid")]);

	const signOut = async () => {
		const token = localStorage.getItem("uid");
		const options = {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		};

		try {
			let p = await fetch("https://todolist-ls1g.onrender.com/logout", options);
			console.log(p);
			let response = await p.json();
			console.log(response);
			if (response.success) {
				alert("Logout Successfully..");
				localStorage.removeItem("uid");
				window.location.reload();
			} else {
				alert(response.msg);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const fetchTodos = async () => {
		const token = localStorage.getItem("uid");
		const options = {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		};

		try {
			let p = await fetch("https://todolist-ls1g.onrender.com/todos", options);
			console.log(p);
			let response = await p.json();
			console.log(response);
			if (response.success) {
				alert("ToDo Fetched Successfully..");
			} else {
				alert(response.msg);
			}
			setTodos(response.todos);
		} catch (err) {
			console.log(err);
		}
	};

	// const updateToDo = async (id) => {
	// 	const token = localStorage.getItem("uid");
	// 	const options = {
	// 		method: "PUT",
	// 		body: JSON.stringify({
	// 			title: title,
	// 			description: description,
	// 		}),
	// 		headers: {
	// 			Authorization: `Bearer ${token}`,
	// 			"Content-Type": "application/json",
	// 		},
	// 	};

	// 	try {
	// 		let p = await fetch(`http://localhost:3005/todos/${id}`, options);
	// 		console.log(p);
	// 		let response = await p.json();
	// 		console.log(response);
	// 		if (response.success) {
	// 			alert("ToDo Updated Successfully..");
	// 		} else {
	// 			alert(response.msg);
	// 		}
	// 	} catch (err) {
	// 		console.log(err);
	// 	}

	// 	setTitle("");
	// 	setDescription("");
	// 	setIsUpdateTodo(false);
	// 	fetchTodos();
	// };

	const addTodo = async (e) => {
		e.preventDefault();

		const token = localStorage.getItem("uid");
		console.log(token);
		const options = {
			method: "POST",
			body: JSON.stringify({
				title: title,
				description: description,
			}),
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		};

		try {
			let p = await fetch("https://todolist-ls1g.onrender.com/todos", options);
			console.log(p);
			let response = await p.json();
			console.log(response);
			if (response.success) {
				alert("ToDo Added Successfully..");
			} else {
				alert(response.msg);
			}
		} catch (err) {
			console.log(err);
		}

		setTitle("");
		setDescription("");
		fetchTodos();
	};

	const deleteTodo = async (id) => {
		const token = localStorage.getItem("uid");
		const options = {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		};

		try {
			let p = await fetch(
				`https://todolist-ls1g.onrender.com/todos/${id}`,
				options
			);
			console.log(p);
			let response = await p.json();
			console.log(response);
			if (response.success) {
				alert("ToDo Deleted Successfully..");
			} else {
				alert(response.msg);
			}
		} catch (err) {
			console.log(err);
		}

		fetchTodos();
	};

	return (
		<div className="toDoListMainDiv">
			<h1 className="todoH1">To-Do List</h1>
			{localStorage.getItem("uid") && (
				<div>
					<form onSubmit={addTodo} className="ToDoForm">
						<input
							type="text"
							placeholder="Title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							required
							className="toDoInputTitle"
						/>
						<input
							type="text"
							placeholder="Description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							required
							className="toDoInputDescription"
						/>
						<button type="submit" className="addToDoBtn">
							Add To-Do
						</button>
					</form>
					<div className="todoTableDiv">
						<table className="toDoTable">
							<thead>
								<th className="toDoTableHead">Title</th>
								<th className="toDoTableHead">Description</th>
								<th className="toDoTableHead">Delete Task</th>
								{/*<th className="toDoTableHead">Update Task</th>*/}
							</thead>
							<tbody className="toDoTableBody">
								{todos.map((todo) => (
									<tr key={todo._id}>
										<td>
											<p>{todo.title}</p>
										</td>
										<td>
											<p>{todo.description}</p>
										</td>
										<td>
											<button
												onClick={() => deleteTodo(todo._id)}
												className="ToDodeleteBtn"
											>
												Delete
											</button>
										</td>
										{/*<td>
											<button
												onClick={() => {
													updateToDo(todo._id);
												}}
												className="ToDoUpdateBtn"
											>
												Update
											</button>
										</td>*/}
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<button onClick={signOut} className="logOutBtnToDo">
						Logout
					</button>
				</div>
			)}
		</div>
	);
};

export default ToDoList;
