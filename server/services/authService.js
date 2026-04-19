const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signupService = async ({ name, email, password }) => {

  if (!name || !email || !password) {
    throw new Error("All fields are required");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword
  });

  return {
    id: user._id,
    name: user.name,
    email: user.email
  };
};


exports.loginService = async ({ email, password }) => {

  if (!email || !password) {
    throw new Error("All fields are required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  };
};