export const isAdmin = (req, res, next) => {

    if (!req.user) {

        return res.redirect("/login");

    }

    if (req.user.role !== "admin") {

        return res.redirect("/");

    }

    next();

};