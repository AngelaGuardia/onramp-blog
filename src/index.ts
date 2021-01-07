import dotenv from "dotenv";
import express from "express";
import path from "path";

dotenv.config();

const port = process.env.SERVER_PORT;
const app = express();

// setup EJS
app.set( "views", path.join( __dirname, "views" ) );
app.set( "view engine", "ejs" );

// home page
app.get( "/", ( req, res ) => {
    res.render( "index" );
} );

// start the Express server
app.listen( port, () => {
  // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );
