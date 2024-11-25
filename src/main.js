import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import homeRoutes from "./routes/homeRoutes.js";
import loginRoutes from "./routes/loginRoutes.js";
import crudRoutes from "./routes/crudRoutes.js";
// import newsRoutes from "./routes/newsRoutes.js";
// import authorRoutes from "./routes/authorRoutes.js";
// import categoryRoutes from "./routes/categoryRoutes.js";
import connectDB from "./config/dbConnection.js";
import configureHandlebars from "./helpers/handlebars.js";
import setSession from "./helpers/sessionHelper.js";

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
configureHandlebars(app, __dirname);

//Setting the session
app.use(setSession());

// Rotas
app.use("/", homeRoutes);
app.use("/", loginRoutes);
app.use("/dashboard", crudRoutes);
// app.use("/news", newsRoutes);
// app.use("/author", authorRoutes);
// app.use("/category", categoryRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
