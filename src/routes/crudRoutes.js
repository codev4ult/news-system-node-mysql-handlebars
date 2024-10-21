import express from "express";
import multer from "multer";
import bcrypt from "bcrypt";
import Author from "../models/authorSchema.js";
import Category from "../models/categorySchema.js";
import News from "../models/newsSchema.js";
import isAuthenticated from "../middleware/auth.js";

const router = express.Router();

// Configuração do multer para upload de imagens
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/assets/img/");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

//Rota para exibir a página inicial Dashboard
router.get("/", isAuthenticated, async (req, res) => {
   
    try {
        //const newsList = await News.find().lean(); // Busca todas as notícias
        const newsList = await News.find().populate('author').populate('category').lean();
 
        return res.render("dashboard", { 
            title: "Dashboard", 
            news: newsList // Passa a lista de notícias para a view
        });
    } catch (error) {
        console.log(error);
        return res.render("dashboard", {
            title: "Dashboard",
            message: { type: "danger", text: "Error fetching news." }
        });
    }

});

//Rota para exibir o form de inserção de notícias
router.get("/news/register", isAuthenticated, async (req, res) => {
    try {
        const authors = await Author.find().lean();
        const categories = await Category.find().lean();
        res.render("dashboard/newsForm", { authors, categories, title: "Inserting news" }); // Renderiza o formulário de criação de notícias
    } catch (error) {
        console.log(error);
        res.render("dashboard/newsForm", {
            message: { type: "danger", text: "Error fetching authors or categories" },
            title: "Insert news",
        });
    }
});

// Rota POST para inserir o formulário de criação de notícias
router.post("/news/insert", isAuthenticated, upload.single("image"), async (req, res) => {
    try {
        const { title, content, category, author, status } = req.body;

        const image = req.file ? req.file.originalname : "";

        // Verifica se já existe uma notícia com o mesmo título
        const existingNews = await News.findOne({ title }).lean();

        if (!existingNews) {
            const news = new News({
                title,
                content,
                category,
                author,
                image,
                status,
            });

            await news.save();

            res.render("dashboard/newsForm", {
                message: { type: "success", text: "News created successfully!" },
                title: "Insert news",
            });
        } else {
            res.render("dashboard/newsForm", {
                message: { type: "danger", text: "Notícia já está cadastrada" },
                title: "Error: Insert news",
            });
        }
    } catch (error) {
        console.log(error);
        res.render("dashboard/newsForm", {
            message: { type: "danger", text: `Error creating news post: ${error.message}` },
            title: "Insert news",
        });
    }
});

// Rota para renderizar o formulário de registro de um novo autor
router.get("/author/register", isAuthenticated, (req, res) => {
    res.render("dashboard/authorForm", { message: null, title: "Insert news authors" });
});

// Rota para inserir o registro do autor
router.post("/author/insert", isAuthenticated, async (req, res) => {
    const { name, surname, username, email, password, avatar } = req.body;

    try {
        const existingAuthor = await Author.findOne({ username });

        if (existingAuthor) {
            return res.status(400).render("dashboard/authorForm", {
                message: { type: "danger", text: "Author already exists" },
            });
        }

        if (!name || !surname || !email || !password) {
            return res.render("dashboard/authorForm", {
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
        res.render("dashboard/authorForm", {
            message: { type: "success", text: "Author created successfully!" },
            title: "Insert news authors",
        });
    } catch (error) {
        console.log(error);
        res.render("dashboard/authorForm", {
            message: { type: "danger", text: "Something went wrong when registering the author" },
            title: "Insert news authors",
        });
    }
});

// Rota para renderizar o formulário de registro de um novo autor
router.get("/category/register", isAuthenticated, (req, res) => {
    res.render("dashboard/categoryForm", { message: null, title: "Insert news categories" });
});

// Rota para processar o registro do autor
router.post("/category/insert", isAuthenticated, async (req, res) => {
    const { name } = req.body;

    try {
        const existingCategory = await Category.findOne({ name });

        if (existingCategory) {
            return res.status(400).render("dashboard/categoryForm", {
                message: { type: "danger", text: "Category already exists" },
                title: "Insert news categories",
            });
        }

        if (!name) {
            return res.render("dashboard/categoryForm", {
                message: { type: "danger", text: "Please fill in all fields" },
                title: "Insert news categories",
            });
        }

        const newCategory = new Category({
            name,
        });

        await newCategory.save();
        res.render("dashboard/categoryForm", {
            message: { type: "success", text: "Category created successfully!" },
            title: "Insert news categories",
        });
    } catch (error) {
        console.log(error);
        res.render("dashboard/categoryForm", {
            message: { type: "danger", text: "Something went wrong when registering the category" },
            title: "Insert news categories",
        });
    }
});

export default router;
