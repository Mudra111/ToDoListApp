const { supabase } = require("../supabaseClientBackEnd");
const User = require("../models/User");

// Registration Route
const register = async (req, res) => {
	const { email, password } = req.body;
	try {
		const { user, error } = await supabase.auth.signUp({
			email,
			password,
		});

		if (error) {
			return res.status(400).json({ error: error.message });
		}

		const newUser = new User({ email });
		await newUser.save();
		console.log(user);
		res.json({ user, success: true });
	} catch (err) {
		console.log(err);
	}
};

module.exports = register;
