import express from "express";
import Author from "../models/authorSchema.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const authors = await Author.find().lean();
        res.render("home", { authors });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching authors" });
    }
});

export default router;
