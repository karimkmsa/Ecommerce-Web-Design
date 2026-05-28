import bcrypt from 'bcrypt'
import userModel from '../../dataBase/models/user.model.js'


export const seedAdmin = async () => {

    try {

        const adminExists = await userModel.findOne({

            email: process.env.ADMIN_EMAIL

        });

        if (adminExists) {

            console.log("Admin already exists");

            return;

        }

        const hashedPassword = bcrypt.hashSync(

            process.env.ADMIN_PASSWORD,

            10

        );

        await userModel.create({

            firstName: "Admin",

            lastName: "System",

            email: process.env.ADMIN_EMAIL,

            password: hashedPassword,

            role: "admin"

        });

        console.log("Admin created successfully");

    } catch (error) {

        console.log("Seed admin error:", error);

    }

};