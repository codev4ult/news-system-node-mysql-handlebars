import express from "express";
import Author from "../models/authorSchema.js";
import bcrypt from "bcrypt";

const router = express.Router();

// GET /login is already defined in main.js
router.get("/login", (req, res) => {
    res.render("login", { title: "Login" });
});

// Rota de logout
router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            return res.redirect("/dashboard"); // Redireciona para o dashboard em caso de erro
        }
        res.redirect("/login"); // Redireciona para a página de login
    });
});

// POST /login is already defined in main.js
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const author = await Author.findOne({ email });

        if (!author) {
            return res.render("login", {
                message: { type: "danger", text: "Invalid username or password" },
                title: "Login",
            });
        }

        const isMatch = await bcrypt.compare(password, author.password);

        if (!isMatch) {
            return res.render("login", {
                message: { type: "danger", text: "Invalid email or password" },
                title: "Login",
            });
        }

        // Se o login for bem-sucedido, armazena os dados do autor na sessão
        req.session.author = {
            email: author.email,
            username: author.username,
            id: author._id,
        };

        res.redirect("/dashboard");
    } catch (error) {
        console.error(error);
        res.render("login", {
            message: { type: "danger", text: "An error occurred during login" },
            title: "Login",
        });
    }
});

export default router;
