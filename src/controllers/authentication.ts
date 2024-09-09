import express from 'express';
import { createUser, getUserByEmail } from "../db/users";
import { authentication, random } from '../helpers';

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const {email, password, username} =  req.body
        if(!email || !password || !username) {
            return res.status(400).json({message: "Email, Password, username is compulsary"});
        }
        const existingUser = await getUserByEmail(email);
        if(existingUser) {
            return res.status(400).json({message: "User already exist"});
        }
        const salt = random();
        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password)
            }
        })
        return res.status(200).json(user).end();
    } catch(error) {
        console.log(error)
        return res.status(400).json({message: "something went wrong"});
    }
}

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const {email, password} =  req.body
        const user = await getUserByEmail(email);
        if(!user) {
            return res.status(400).json({error: "wrong email"}).end();
        }
        const expectedHash = authentication(user.authentication.salt, password)
        console.log(user.authentication.password, expectedHash)
        if(user.authentication.password !== expectedHash) {
            return res.status(400).json({message: "Email or Password is incorrect"}).end();
        }
        const salt = random();
        user.authentication.sessionToken = authentication(salt, user._id.toString())
        await user.save();
        res.cookie('SUJEET-AUTH', user.authentication.sessionToken, {domain: 'localhost', path: '/'});        
        return res.status(200).json(user).end();
    } catch(error) {
        console.log(error)
        return res.status(400).json({message: "something went wrong"});
    }
}