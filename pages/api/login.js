import connectDb from '../../utils/connectDb'

import User from '../../models/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


connectDb()

export default async (req, res) => {
    const { email, password } = req.body
    try {
        //Check if user exist with the provided email
        const user = await User.findOne({ email }).select('+password')
        //if not return error
        if (!user) {
            return res.status(404).send("No user exist with that email")
        }

        //check to see if users's password is matches
        const passMatch = await bcrypt.compare(password, user.password)

        //if generate a token
        if (passMatch) {
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
            res.status(201).json(token)
        } else {
            res.status(401).send("Password do not match")
        }

        //send token to the client




    } catch (error) {
        console.error(error)
        res.status(500).send("Error login")
    }

}