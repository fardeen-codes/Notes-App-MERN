const authService = require("../services/authService");

exports.signup = async (req, res) => {
  try {
    const user = await authService.signupService(req.body);

    res.status(201).json({
      message: "User registered successfully",
      user
    });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const data = await authService.loginService(req.body);

    res.status(200).json({
      message: "Login successful",
      ...data
    });

  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};