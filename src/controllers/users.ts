import express from "express";
import { deleteUserById, getUser , getUserById, updateUserById} from "../db/users";

export const getAllUser = async (req: express.Request, res: express.Response) => {
    try {
        const users = await getUser()
        res.status(200).json(users).end();
    } catch(error) {
        console.log(error)
        return res.status(400).json({message: "something went wrong"});
    }
}

export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const {id} = req.params
        const  deletedUser = await deleteUserById(id)
        res.status(200).json(deletedUser).end();
    } catch(error) {
        console.log(error)
        return res.status(400).json({message: "something went wrong"});
    }
}

export const updateUser = async (req: express.Request, res: express.Response) => {
    try {
        const {id} = req.params
        const {username} = req.body
        if(!username){
            res.status(403).json({error: "Username cannot be empty"})
        }
        const  user = await getUserById(id)
        user.username = username
        user.save();
        res.status(200).json(user).end();
    } catch(error) {
        console.log(error)
        return res.status(400).json({message: "something went wrong"});
    }
}