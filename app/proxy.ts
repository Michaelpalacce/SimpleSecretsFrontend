"use strict";

import App					from "event_request";
import { createReadStream }	from "fs";
const app					= App();
import { parse }			from "path";
const PROJECT_ROOT			= parse( require.main.filename ).dir;

const API_URL				= process.env.API_URL || "simplesecrets-api.simplesecrets";

app.add({
	route: /\\api\\.+/,
	handler: ( event ) => {
		// Finish proxy logic
	}
});

// Serve Static Resources
app.apply( app.er_static,	{ paths	: ['dist'], cache: { cacheControl: 'public', expirationDirectives: { 'max-age': 3600 } } } );

// Frontend
app.get(( event )=>{
	event.setResponseHeader( 'Content-Type', 'text/html' );
	createReadStream( `${PROJECT_ROOT}/dist/index.html` ).pipe( event.response );
});