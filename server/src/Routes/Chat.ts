import express from 'express';
const router = express.Router();
import {AES, enc} from 'crypto-js';
import {User} from "../Models/User";
import {Chat} from "../Models/Chat";
import {ObjectId} from 'mongodb';

// REGISTER
router.post("/message", async (req: any, res: any) => {
    console.log("New chat message");
    console.log(req.body);
    const newChat = new Chat({
        channelId: new ObjectId('61e68a6a6642d355e0004a91'),
        userId: new ObjectId('61e68a6a6642d355e0004a99'), // '61e68a6a6642d355e0004a99',
        message: req.body.message
    });
    try {
        const chat = await newChat.save();
        res.status(201).json(chat);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/channel/:id", async (req, res) => {

    const query: any = req.params.id;
    console.log("#### Channel chats ####", query);
    try {
        const users = await Chat.aggregate([
            { $match: { channelId: new ObjectId(query) }}
        ])
        console.log(users);
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});

export const chatRoutes = router;