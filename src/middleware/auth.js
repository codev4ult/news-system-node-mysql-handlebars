
const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.author) {
        return next();
    }

    res.redirect("/login");
};

export default isAuthenticated;
