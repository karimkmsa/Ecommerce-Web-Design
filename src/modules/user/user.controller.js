import userModel from "../../../dataBase/models/user.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const getAll = async (req, res) => {
  const users = await userModel.find()
  res.json({ message: "Done", users })
}



export const signUp = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const isExist = await userModel.findOne({ email });

    if (isExist) {
      return res.status(400).json({
        message: "Email already exists"
      });
    }

    const hashedPassword = bcrypt.hashSync(
      password,
      Number(process.env.SALT_Rounds)
    );

    const user = await userModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    });

    // 🔥 create token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 🔥 set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true in production (https)
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(201).json({
      message: "User created successfully",
      user
    });

  } catch (err) {
    console.log("SIGNUP ERROR:", err);

    if (err.code === 11000) {
      return res.status(400).json({
        message: "Email already exists"
      });
    }

    return res.status(500).json({
      message: "Server error"
    });
  }
};

export const signIn = async (req, res) => {
  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Missing data" });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 🔥 create token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 🔥 set cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    // 🔥 redirect (لو EJS)
    return res.json({
      message: "Login success",
      redirect: "/"
    });
        console.log(token);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};
export const logout = (req, res) => {

    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0)
    });

    return res.json({
        redirect: "/"
    });
};

export const updateProfile = async (req, res) => {

    try {

        const { firstName, lastName, email } = req.body;

        const user = await userModel.findByIdAndUpdate(

            req.user._id,

            {
                firstName,
                lastName
            },

            { new: true }

        );

        res.json({
            success: true,
            message: "Profile updated",
            redirect: "/profile"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });

    }
};

export const deleteUser = async (req, res) => {
  let { id } = req.body
  const deleted = await userModel.findByIdAndDelete(id)

  res.json({ message: "user deleted", deleted })

}


export const isAuth = (req, res, next) => {

    if (!req.cookies.token) {
        return res.redirect("/login");
    }

    next();
};