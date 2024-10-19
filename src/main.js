import express from "express";
import dotenv from "dotenv";
import path from "path";
import exphbs from "express-handlebars";
import { fileURLToPath } from "url";
import newsRoutes from "./routes/newsRoutes.js";
import authorRoutes from "./routes/authorRoutes.js"; // Adicione a extensão .js
import connectDB from "./config/dbConnection.js";

dotenv.config();
connectDB();
const app = express();
const PORT = process.env.PORT || 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: true })); // Para formulários codificados em URL
app.use(express.json()); // Para dados JSON

// Configuração do mecanismo de visualização Handlebars
app.engine(
    "hbs",
    exphbs.engine({
        defaultLayout: "template",
        extname: ".hbs",
        partialsDir: [path.join(__dirname, "views/partials")],
        helpers: {
            formatDate: (date) => {
                const options = { year: 'numeric', month: 'long', day: 'numeric' };
                return new Date(date).toLocaleDateString('pt-BR', options);
            }
        }
    })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// Rotas
app.use('/', newsRoutes);
app.use('/authors', authorRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
