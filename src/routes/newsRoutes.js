import express from "express";
import multer from "multer";
import Author from "../models/authorSchema.js";
import Category from "../models/categorySchema.js";
import News from "../models/newsSchema.js";

const router = express.Router();

// Configuração do multer para upload de imagens
const upload = multer({ dest: "uploads/" });

router.get("/register", async (req, res) => {
    try {
        const authors = await Author.find().lean();
        const categories = await Category.find().lean();
        res.render("newsForm", { authors, categories, title : "Inserting news" }); // Renderiza o formulário de criação de notícias
    } catch (error) {
        console.log(error);
        res.render("newsForm", {
            message: { type: "danger", text: "Error fetching authors or categories" },
            title : "Insert news"
        });
    }
});

// Rota POST para processar o formulário de criação de notícias
router.post("/insert", upload.single("image"), async (req, res) => {
    try {
        const { title, content, category, author, status } = req.body;
        const image = req.file ? req.file.filename : ""; // Obtém o nome do arquivo da imagem

        const news = new News({
            title,
            content,
            category,
            author,
            image,
            status,
        });

        await news.save();
        res.render("newsForm", {
            message: { type: "success", text: "News created successfully!" },
            title : "Insert news"
        });
    } catch (error) {
        console.log(error);
        res.render("newsForm", {
            message: { type: "danger", text: "Error creating news post" },
            title : "Insert news"
        });
    }
});

export default router;
