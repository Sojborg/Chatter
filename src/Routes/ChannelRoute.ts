import express from 'express';
import {ObjectId} from 'mongodb';
import {verifyMiddleware} from "../Middelware/VerifyToken";
import {Channel} from "../Models/Channel";

const router = express.Router();

router.post("/", verifyMiddleware, async (req: any, res: any) => {
  console.log("New channel");
  console.log(req.body);
  const newChannel = new Channel({
    name: req.body.name
  });
  try {
    const channel = await newChannel.save();
    res.status(201).json(channel);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", verifyMiddleware, async (req, res) => {

  const query: any = req.params.id;
  try {
    const channels = await Channel.aggregate([
      {$match: {channelId: new ObjectId(query)}}
    ])
    res.status(200).json(channels);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", verifyMiddleware, async (req, res) => {
  try {
    const channels = await Channel.find();
    res.status(200).json(channels);
  } catch (err) {
    res.status(500).json(err);
  }
});

export const channelRoutes = router;
