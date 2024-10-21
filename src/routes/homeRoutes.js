import express from "express";
import News from "../models/newsSchema.js";

const router = express.Router();

// Rota GET para exibir a página inicial com os cards de notícias
router.get("/", async (req, res) => {
    try {
        const news = await News.find().lean(); // Busca todas as notícias do banco de dados
        res.render("news", { news ,  title : "News Page"}); // Renderiza o template "news" passando as notícias
    } catch (error) {
        console.log(error);
        res.render("news", {           
            message: { type: "danger", text: "Error fetching news" },
            title : "News Page",
        });
    }
});

// Rota GET para exibir a notícia completa
router.get("/news/show/:id", async (req, res) => {
    try {
        const newsItem = await News.findById(req.params.id).lean();
        if (!newsItem) {
            return res.render("news_post", {
                message: { type: "danger", text: "News not found" },
                title : "Show news"
            });
        }
        res.render("news_post", { news: newsItem, title : "Show news" }); // Renderiza a notícia completa
    } catch (error) {
        console.log(error);
        res.render("news_post", {
            message: { type: "danger", text: "Error fetching news" },
            title : "Show news"
        });
    }
});

export default router;
