const ToDo = require("../models/ToDo");

// Get To-Do Items
const getToDo = async (req, res) => {
	try {
		const todos = await ToDo.find({ userId: req.user.id });
		res.json({ todos, success: true });
	} catch (err) {
		console.log(err);
	}
};

module.exports = getToDo;
