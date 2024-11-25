import session from "express-session";
//import MongoStore from "connect-mongo"; // Se você está usando MongoDB

const setSession = () => {
    return session({
        secret: process.env.SESSION_SECRET || "secretKey", // Substitua por um valor seguro
        resave: false,
        saveUninitialized: false,
        //store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }), // Use o MongoDB para armazenar sessões
        cookie: {
            secure: process.env.NODE_ENV === "production", // Cookies seguros apenas em produção (HTTPS)
            maxAge: 1000 * 60 * 60 * 24, // Sessão expira em 1 dia
        },
    });
};

export default setSession;
