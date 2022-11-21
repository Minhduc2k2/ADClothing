import express from "express";
import passport from "passport";
import User from "../models/userModel.js"
const router = express.Router();
const CLIENT_URL = "http://localhost:3000/";

router.get("/login/success", async (req, res) => {
    const data = req.user;
    if (req.user) {

        let oldUser = await User.findOne({ email: data.emails[0].value });

        if (oldUser !== null) {
            res.status(200).json({
                success: true,
                message: "successfull",
                user: oldUser,
                //   cookies: req.cookies
            })
        }
        else {
            const newUser = new User({
                name: data.displayName,
                email: data.emails[0].value,
                avatar: data.photos[0].value,
            })
            await newUser.save();
            res.status(200).json("created a new user")
        };
    }
});

router.get("/login/failed", (req, res) => {
    res.status(401).json({
        success: false,
        message: "failure",
    });
});

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect(CLIENT_URL);
});

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
    "/google/callback",
    passport.authenticate("google", {
        successRedirect: CLIENT_URL,
        failureRedirect: "/login/failed",
    })
);


export default router