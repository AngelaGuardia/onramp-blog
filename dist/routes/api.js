"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const pg_promise_1 = __importDefault(require("pg-promise"));
const register = (app) => {
    const oidc = app.locals.oidc;
    const port = parseInt(process.env.PGPORT || "5432", 10);
    const config = {
        database: process.env.PGDATABASE || "postgres",
        host: process.env.PGHOST || "localhost",
        port,
        user: process.env.PGUSER || "postgres"
    };
    const pgp = pg_promise_1.default();
    const db = pgp(config);
    // posts index
    app.get(`/api/posts`, oidc.ensureAuthenticated(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userId = req.userContext.userinfo.sub;
            const posts = yield db.any(`
                SELECT
                    id
                    , title
                    , favorite
                    , content
                    , updated_at
                FROM    posts
                WHERE   user_id = $[userId]
                ORDER BY updated_at`, { userId });
            // tslint:disable-next-line:no-console
            console.log(posts);
            return res.json(posts);
        }
        catch (err) {
            // tslint:disable-next-line:no-console
            console.error(err);
            res.json({ error: err.message || err });
        }
    }));
    // posts show
    app.get(`/api/posts/:id`, oidc.ensureAuthenticated(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userId = req.userContext.userinfo.sub;
            const post = yield db.one(`
                SELECT
                    id
                    , title
                    , content
                    , updated_at
                FROM    posts
                WHERE   user_id = $[userId]
                ORDER BY updated_at`, { userId });
            return res.json(post);
        }
        catch (err) {
            // tslint:disable-next-line:no-console
            console.error(err);
            res.json({ error: err.message || err });
        }
    }));
    // posts create
    app.post(`/api/posts`, oidc.ensureAuthenticated(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userId = req.userContext.userinfo.sub;
            const id = yield db.one(`
                INSERT INTO posts( user_id, title, content, favorite )
                VALUES( $[userId], $[title], $[content], $[favorite] )
                RETURNING id;`, Object.assign({ userId }, req.body));
            return res.json({ id });
        }
        catch (err) {
            // tslint:disable-next-line:no-console
            console.error(err);
            res.json({ error: err.message || err });
        }
    }));
    // posts update
    app.patch(`/api/posts/:id`, oidc.ensureAuthenticated(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // tslint:disable-next-line:no-console
            console.log(req.body);
            const userId = req.userContext.userinfo.sub;
            const id = yield db.one(`
                UPDATE posts
                SET title = $[title],
                content = $[content]
                WHERE
                    id = $[id]
                    AND user_id = $[userId]
                RETURNING
                    id;`, Object.assign({ userId }, req.body));
            return res.json({ id });
        }
        catch (err) {
            // tslint:disable-next-line:no-console
            console.error(err);
            res.json({ error: err.message || err });
        }
    }));
    // posts delete
    app.delete(`/api/posts/:id`, oidc.ensureAuthenticated(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userId = req.userContext.userinfo.sub;
            const id = yield db.result(`
                DELETE
                FROM    posts
                WHERE   user_id = $[userId]
                AND     id = $[id]`, { userId, id: req.params.id }, (r) => r.rowCount); //// QUESTION: what does this row count do
            return res.json({ id });
        }
        catch (err) {
            // tslint:disable-next-line:no-console
            console.error(err);
            res.json({ error: err.message || err });
        }
    }));
    // favorites toggle
    app.patch(`/api/favorites/:id`, oidc.ensureAuthenticated(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userId = req.userContext.userinfo.sub;
            const id = yield db.one(`
            UPDATE posts
            SET favorite = NOT favorite
            WHERE
                id = $[id]
                AND user_id = $[userId]
            RETURNING
                id;`, { userId, id: req.params.id });
            return res.json({ id });
        }
        catch (err) {
            // tslint:disable-next-line:no-console
            console.error(err);
            res.json({ error: err.message || err });
        }
    }));
    // favorites index
    app.get(`/api/favorites`, oidc.ensureAuthenticated(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userId = req.userContext.userinfo.sub;
            const posts = yield db.any(`
                SELECT
                    id
                    , title
                    , favorite
                    , content
                    , updated_at
                FROM    posts
                WHERE   user_id = $[userId]
                        AND favorite = TRUE
                ORDER BY updated_at`, { userId });
            // tslint:disable-next-line:no-console
            console.log(posts);
            return res.json(posts);
        }
        catch (err) {
            // tslint:disable-next-line:no-console
            console.error(err);
            res.json({ error: err.message || err });
        }
    }));
};
exports.register = register;
//# sourceMappingURL=api.js.map