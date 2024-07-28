import React, { useEffect, useState } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import ToDoList from "./components/ToDoList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { supabase } from "./supabaseClient";
import "./App.css";

function App() {
	const token = localStorage.getItem("uid");
	const getUser = async () => {
		const { data: user, error } = await supabase.auth.getUser(token);
		if (error) {
			localStorage.removeItem("uid");
		}
	};
	useEffect(() => {
		setTimeout(() => {
			getUser();
		}, 1000);
	});
	return (
		<div className="App">
			<Router>
				<h1 className="mainHeading">Welcome to My To-Do App</h1>
				{!localStorage.getItem("uid") ? (
					<Routes>
						<Route exact path="/register" element={<Register />} />
						<Route exact path="/" element={<Login />} />
					</Routes>
				) : (
					<Routes>
						<Route exact path="/" element={<ToDoList />} />
					</Routes>
				)}
			</Router>
		</div>
	);
}

export default App;
