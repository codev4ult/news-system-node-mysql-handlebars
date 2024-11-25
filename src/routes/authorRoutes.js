import express from "express";
import Author from "../models/authorSchema.js";
import bcrypt from "bcrypt";

const router = express.Router();

// Rota para renderizar o formulário de registro de um novo autor
router.get("/register", (req, res) => {
    res.render("authorForm", { message: null, title : "Insert news authors" });
});

// Rota para processar o registro do autor
router.post("/insert", async (req, res) => {
    const { name, surname, username, email, password, avatar } = req.body;

    try {
        const existingAuthor = await Author.findOne({ username });

        if (existingAuthor) {
            return res.status(400).render("authorForm", {
                message: { type: "danger", text: "Author already exists" },
            });
        }

        if (!name || !surname || !email || !password) {
            return res.render("authorForm", {
                message: { type: "danger", text: "Please fill in all fields" },
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAuthor = new Author({
            name,
            surname,
            username,
            email,
            password: hashedPassword,
            avatar,
        });

        await newAuthor.save();
        res.render("authorForm", {
            message: { type: "success", text: "Author created successfully!" },
            title : "Insert news authors"
        });
    } catch (error) {
        console.log(error);
        res.render("authorForm", {
            message: { type: "danger", text: "Something went wrong when registering the author" },
            title : "Insert news authors"
        });
    }
});

export default router;
