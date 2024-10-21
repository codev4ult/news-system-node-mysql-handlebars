import exphbs from "express-handlebars";
import hbsHelpers from "./hbsHelper.js";
import path from "path";

const configureHandlebars = (app, __dirname) => {
    app.engine(
        "hbs",
        exphbs.engine({
            defaultLayout: "template",
            extname: ".hbs",
            partialsDir: [
                path.join(__dirname, "views/partials"), 
                path.join(__dirname, "views/dashboard"), //Para carregar as partials dentro da pasta dashboard
            ],
            helpers: hbsHelpers,
        })
    );

    app.set("view engine", "hbs");
    app.set("views", path.join(__dirname, "views"));
};

export default configureHandlebars;
