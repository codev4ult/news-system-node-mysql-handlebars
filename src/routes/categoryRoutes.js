import express from "express";
import Category from "../models/categorySchema.js";
import bcrypt from "bcrypt";

const router = express.Router();

// Rota para renderizar o formulário de registro de um novo autor
router.get("/register", (req, res) => {
    res.render("categoryForm", { message: null,  title : "Insert news categories" });
});

// Rota para processar o registro do autor
router.post("/insert", async (req, res) => {
    const { name } = req.body;

    try {
        const existingCategory = await Category.findOne({ name });

        if (existingCategory) {
            return res.status(400).render("categoryForm", {
                message: { type: "danger", text: "Category already exists" },
                title : "Insert news categories"
            });
        }

        if (!name) {
            return res.render("categoryForm", {
                message: { type: "danger", text: "Please fill in all fields" },
                title : "Insert news categories"
            });
        }

        const newCategory = new Category({
            name,
        });

        await newCategory.save();
        res.render("categoryForm", {
            message: { type: "success", text: "Category created successfully!" },
            title : "Insert news categories"
        });
    } catch (error) {
        console.log(error);
        res.render("categoryForm", {
            message: { type: "danger", text: "Something went wrong when registering the category" },
            title : "Insert news categories"
        });
    }
});

export default router;
