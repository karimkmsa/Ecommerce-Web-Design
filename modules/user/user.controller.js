import userModel from "../../dataBase/models/user.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const getAll = async (req, res) => {
    const users = await userModel.find()
    res.json({ message: "Done", users })
}


export const signUp = async (req, res) => {
    let { name, email, password } = req.body;
    const isexist = await userModel.findOne({ email })
    if (isexist) {
        res.json({ message: "email already register" })
    }
    else {
        let hashedPassword = bcrypt.hashSync(password ,Number(process.env.SALT_Rounds)  )
        const added = await userModel.insertMany({ name, email, password:hashedPassword })
        res.json({ message: "Done: data added", added })
    }

}

export const signIn = async (req, res) => {
    let { email, password } = req.body

    const isexist = await userModel.findOne({ email })
    if (isexist) {

        let matched = bcrypt.compareSync(password,isexist.password)
        if (matched) {
            let token = jwt.sign({userId:isexist._id , name :isexist.name},process.env.SECRET_KEY)
            console.log(token);
            res.json({ message: "Welcome" ,token})


        } else {
            res.json({ message: "password is wrong" })


        }
    }
    else {
        res.json({ message: "go create email" })



    }


}




export const updateUser = async (req, res) => {
    let { name, id } = req.body
    const updated = await userModel.findByIdAndUpdate(id, { name }, { new: true })

    res.json({ message: "user updated", updated })

}

export const deleteUser = async (req, res) => {
    let { id } = req.body
    const deleted = await userModel.findByIdAndDelete(id)

    res.json({ message: "user deleted", deleted })

}


