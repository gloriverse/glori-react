import connectDb from '../../utils/connectDb'

import User from '../../models/User'
import Cart from '../../models/Cart'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import isEmail from 'validator/lib/isEmail'
import isLength from 'validator/lib/isLength'

connectDb()

export default async (req, res) => {
    const { name, email, password } = req.body
    try {
        //Validate name email password
        if (!isLength(name, { min: 3, max: 10 })) {
            return res.status(422).send("Name must be 3-10 Characters")
        } else if (!isLength(password, { min: 6 })) {
            return res.status(422).send("Password must be min of 6 characters")
        } else if (!isEmail(email)) {
            return res.status(422).send("Email must be valid")
        }
        //Check if user already exist
        const user = await User.findOne({ email })
        if (user) {
            return res.status(422).send(`user already exist with email ${email}`)
        }

        //If not hash their password
        const hash = await bcrypt.hash(password, 10)

        //Create user
        const newUser = await new User({
            name,
            email,
            password: hash
        }).save()
        //create a Cart for new user
        await new Cart({
            user: newUser._id
        }).save()
        //Create token for the new user
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
        //send Back the token
        res.status(201).json(token)

    } catch (error) {
        console.error(error)
        res.status(500).send("Error signup user, Please try again later.")
    }

}