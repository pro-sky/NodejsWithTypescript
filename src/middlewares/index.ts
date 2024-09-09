import express from 'express';
import {get,merge} from  "lodash";
import { getUserBySessionToken } from '../db/users';

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const {id} = req.params
        const currentUserId = get(req, 'identity._id') as string
        if(!currentUserId) {
            return res.status(405).json({error: "You are not authorised"}).end();
        }
        if(currentUserId != id) {
            return res.status(403).json({error: "You are not authorised"}).end();
        }
        next();

    } catch(error){
        console.log(error);
        res.status(400).json({error: "Some thing went wrong"})
    }
}


export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionToken = req.cookies['SUJEET-AUTH']
        if(!sessionToken) {
            return res.status(400).json({error: "You are not authenticated"}).end();
        }
        const existingUser = await getUserBySessionToken(sessionToken);
        if(!existingUser) {
            return res.status(400).json({error: "User not Present in db"}).end();;
        }
        merge(req,  { identity: existingUser });
        return next();
    } catch(error) {
        console.log(error);
        res.status(400).json({error: "Some thing went wrong"})
    }
}