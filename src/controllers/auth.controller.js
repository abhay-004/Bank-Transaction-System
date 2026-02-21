const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

//register a user

const registerUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    const isExist = await User.findOne({ email });
    if (isExist) {
      return res
        .status(422)
        .json({ message: "User already exists", status: "failed" });
    }

    const user = await User.create({ email, name, password });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });
    res.cookie("token", token);
    return res.status(201).json({
      message: "User created successfully",
      status: "success",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//login a user

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(401)
        .json({ message: "User not found", status: "failed" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Invalid credentials", status: "failed" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });
    res.cookie("token", token);
    return res.status(200).json({
      message: "User logged in successfully",
      status: "success",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { registerUser, loginUser };
