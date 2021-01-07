import * as express from "express";

export const register = ( app: express.Application ) => {
  const oidc = app.locals.oidc;

  app.get( "/", ( req: any, res ) => {
    const user = req.userContext ? req.userContext.userinfo : null;
    res.render( "index", { isAuthenticated: req.isAuthenticated(), user } );
  } );

  app.get( "/login", oidc.ensureAuthenticated(), ( req, res ) => {
      res.redirect( "/posts" );
  } );

  app.get( "/logout", ( req: any, res ) => {
      req.logout();
      res.redirect( "/" );
  } );

  app.get( "/posts", oidc.ensureAuthenticated(), ( req: any, res ) => {
    const user = req.userContext ? req.userContext.userinfo : null;
    res.render( "posts", { isAuthenticated: req.isAuthenticated(), user } );
  } );
};
