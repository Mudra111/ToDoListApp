const ToDo = require("../models/ToDo");

// Update To-Do Item
const updateToDo = async (req, res) => {
	const { id } = req.params;
	const { title, description } = req.body;

	try {
		const updatedToDo = await ToDo.findOneAndUpdate(
			{ _id: id, userId: req.user.id },
			{ title, description },
			{ new: true }
		);

		if (!updatedToDo) {
			return res.status(404).json({ error: "To-Do item not found" });
		}

		res.json({ todo: updatedToDo, success: true });
	} catch (err) {
		console.log(err);
	}
};

module.exports = updateToDo;
