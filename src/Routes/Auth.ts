import express from 'express';

const router = express.Router();
import {AES, enc} from 'crypto-js';
import {sign} from 'jsonwebtoken';
import {User} from "../Models/User";

// REGISTER
router.post("/register", async (req: any, res: any) => {
  console.log("Register user");
  console.log(req.body);
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString()
  });
  try {
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN
router.post("/login", async (req: any, res: any) => {
  try {
    let user = await User.findOne({email: req.body.email});
    if (!user) {
      res.status(401).json("Wrong password or username!");
    }

    const bytes = AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(enc.Utf8);

    if (originalPassword !== req.body.password) {
      res.status(401).json("Wrong password or username!");
    }

    const accessToken = sign(
      {id: user._id, isAdmin: user.isAdmin},
      process.env.SECRET_KEY,
      {expiresIn: "5d"}
    );

    try {
      user = await user.updateOne({}, {loggedInAt: new Date()});
    } catch(e) {
      console.log('###############################################')
      console.error(e)
    }

    const {password, ...info} = user._doc;

    res.status(200).json({...info, accessToken});
  } catch (err) {
    res.status(500).json(err);
  }
});

export const authRoutes = router;
