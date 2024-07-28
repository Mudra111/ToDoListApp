const ToDo = require("../models/ToDo");

// Create To-Do Item
const createToDo = async (req, res) => {
	const { title, description } = req.body;

	try {
		const newToDo = new ToDo({
			userId: req.user.id,
			title,
			description,
		});

		await newToDo.save();
		res.json({ todo: newToDo, success: true });
	} catch (err) {
		console.error("Error during login:", err);
		res.status(500).json({ error: "Internal server error" });
	}
};

module.exports = createToDo;
