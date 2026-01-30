const { userAuthModel } = require("../../models/userAuthModel");
const bcrypt = require("bcrypt");

const saltRounds = 10;

const registerUser = async (req, res) => {
  console.log(req.body)
  try {
    const { name, email, password, role } = req.body;

    // 1️⃣ Validation
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        status: 0,
        message: "All fields are required",
      });
    }

    // 2️⃣ Check existing user
    const existingUser = await userAuthModel.findOne({ userEmail: email });
    if (existingUser) {
      return res.status(409).json({
        status: 0,
        message: "Email already exists",
      });
    }

    // 3️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 4️⃣ CREATE USER (MAPPING DONE HERE)
    await userAuthModel.create({
      userName: name,
      userEmail: email,
      userPassword: hashedPassword,
      role,
    });

    return res.status(201).json({
      status: 1,
      message: "Registration successful",
    });

  } catch (error) {
    return res.status(500).json({
      status: 0,
      message: "Registration failed",
      error: error.message,
    });
  }
};
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: 0,
        message: "Email and password required",
      });
    }

    const user = await userAuthModel.findOne({ userEmail: email });
    if (!user) {
      return res.status(404).json({
        status: 0,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.userPassword);
    if (!isMatch) {
      return res.status(401).json({
        status: 0,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.AUTHKEY,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      status: 1,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.userName,
        email: user.userEmail,
        role: user.role,
      },
    });

  } catch (error) {
    return res.status(500).json({
      status: 0,
      message: "Login failed",
      error: error.message,
    });
  }
};


module.exports = { registerUser,userLogin };
