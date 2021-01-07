"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const register = (app) => {
    const oidc = app.locals.oidc;
    app.get("/", (req, res) => {
        res.render("index");
    });
    app.get("/login", oidc.ensureAuthenticated(), (req, res) => {
        res.redirect("/posts");
    });
    app.get("/logout", (req, res) => {
        req.logout();
        res.redirect("/");
    });
    app.get("/posts", oidc.ensureAuthenticated(), (req, res) => {
        res.render("posts");
    });
};
exports.register = register;
//# sourceMappingURL=index.js.map