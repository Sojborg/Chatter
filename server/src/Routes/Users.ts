import {verifyMiddelware} from "../Middelware/VerifyToken";
import router from "../router";
import {AES, enc} from 'crypto-js';
import {User} from "../Models/User";

router.put("/user/:id", verifyMiddelware, async (req: any, res: any) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        if (req.body.password) {
            req.body.password = AES.encrypt(
                req.body.password,
                process.env.SECRET_KEY
            ).toString();
        }

        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            res.status(200).json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You can update only your account!");
    }
});