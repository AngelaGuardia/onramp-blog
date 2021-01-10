import * as express from "express";
import pgPromise from "pg-promise";

export const register = ( app: express.Application ) => {
    const oidc = app.locals.oidc;
    const port = parseInt( process.env.PGPORT || "5432", 10 );
    const config = {
        database: process.env.PGDATABASE || "postgres",
        host: process.env.PGHOST || "localhost",
        port,
        user: process.env.PGUSER || "postgres"
    };

    const pgp = pgPromise();
    const db = pgp( config );

    // posts index
    app.get( `/api/posts`, oidc.ensureAuthenticated(), async ( req: any, res ) => {
        try {
            const userId = req.userContext.userinfo.sub;
            const posts = await db.any( `
                SELECT
                    id
                    , title
                    , favorite
                    , content
                    , updated_at
                FROM    posts
                WHERE   user_id = $[userId]
                ORDER BY updated_at`, { userId } );
            // tslint:disable-next-line:no-console
            console.log(posts);
            return res.json( posts );
        } catch ( err ) {
            // tslint:disable-next-line:no-console
            console.error(err);
            res.json( { error: err.message || err } );
        }
    } );

    // posts show
    app.get( `/api/posts/:id`, oidc.ensureAuthenticated(), async ( req: any, res ) => {
        try {
            const userId = req.userContext.userinfo.sub;
            const post = await db.one( `
                SELECT
                    id
                    , title
                    , content
                    , updated_at
                FROM    posts
                WHERE   user_id = $[userId]
                ORDER BY updated_at`, { userId } );
            return res.json( post );
        } catch ( err ) {
            // tslint:disable-next-line:no-console
            console.error(err);
            res.json( { error: err.message || err } );
        }
    } );

    // posts create
    app.post( `/api/posts`, oidc.ensureAuthenticated(), async ( req: any, res ) => {
        try {
            const userId = req.userContext.userinfo.sub;
            const id = await db.one( `
                INSERT INTO posts( user_id, title, content, favorite )
                VALUES( $[userId], $[title], $[content], $[favorite] )
                RETURNING id;`,
                { userId, ...req.body  } );
            return res.json( { id } );
        } catch ( err ) {
            // tslint:disable-next-line:no-console
            console.error(err);
            res.json( { error: err.message || err } );
        }
    } );

    // posts update
    app.patch( `/api/posts/:id`, oidc.ensureAuthenticated(), async ( req: any, res ) => {
        try {
            // tslint:disable-next-line:no-console
            console.log(req.body);
            const userId = req.userContext.userinfo.sub;
            const id = await db.one( `
                UPDATE posts
                SET title = $[title],
                content = $[content]
                WHERE
                    id = $[id]
                    AND user_id = $[userId]
                RETURNING
                    id;`,
                { userId, ...req.body  } );
            return res.json( { id } );
        } catch ( err ) {
            // tslint:disable-next-line:no-console
            console.error(err);
            res.json( { error: err.message || err } );
        }
    } );

    // posts delete
    app.delete( `/api/posts/:id`, oidc.ensureAuthenticated(), async ( req: any, res ) => {
        try {
            const userId = req.userContext.userinfo.sub;
            const id = await db.result( `
                DELETE
                FROM    posts
                WHERE   user_id = $[userId]
                AND     id = $[id]`,
                { userId, id: req.params.id  }, ( r ) => r.rowCount ); //// QUESTION: what does this row count do
            return res.json( { id } );
        } catch ( err ) {
            // tslint:disable-next-line:no-console
            console.error(err);
            res.json( { error: err.message || err } );
        }
    } );

    // favorites toggle
    app.patch( `/api/favorites/:id`, oidc.ensureAuthenticated(), async ( req: any, res ) => {
      try {
          const userId = req.userContext.userinfo.sub;
          const id = await db.one( `
            UPDATE posts
            SET favorite = NOT favorite
            WHERE
                id = $[id]
                AND user_id = $[userId]
            RETURNING
                id;`,
              { userId, id: req.params.id } );
          return res.json( { id } );
      } catch ( err ) {
          // tslint:disable-next-line:no-console
          console.error(err);
          res.json( { error: err.message || err } );
      }
    } );

    // favorites index
    app.get( `/api/favorites`, oidc.ensureAuthenticated(), async ( req: any, res ) => {
        try {
            const userId = req.userContext.userinfo.sub;
            const posts = await db.any( `
                SELECT
                    id
                    , title
                    , favorite
                    , content
                    , updated_at
                FROM    posts
                WHERE   user_id = $[userId]
                        AND favorite = TRUE
                ORDER BY updated_at`, { userId } );
            // tslint:disable-next-line:no-console
            console.log(posts);
            return res.json( posts );
        } catch ( err ) {
            // tslint:disable-next-line:no-console
            console.error(err);
            res.json( { error: err.message || err } );
        }
    } );
};
