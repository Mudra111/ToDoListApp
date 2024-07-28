const ToDo = require("../models/ToDo");

// Delete To-Do Item
const deleteToDo = async (req, res) => {
	const { id } = req.params;

	const deletedToDo = await ToDo.findOneAndDelete({
		_id: id,
		userId: req.user.id,
	});

	if (!deletedToDo) {
		return res.status(404).json({ error: "To-Do item not found" });
	}

	res.json({ message: "To-Do item deleted", success: true });
};

module.exports = deleteToDo;
