// Framework Singleton instance

import logger from "../utils/logger";

const app		= require( "event_request" )();

const port		= process.env.APP_PORT || 3000;

/**
 * @brief	Initializes important components
 *
 * @async
 */
async function init() {
}

require( "./kernel" );

export default async function () {
	/**
	 * @brief	Start server after initial steps
	 */
	await init();
	await logger.log( "Finished with Initialization" );
	await logger.log( `Starting on port: ${port}` );

	app.listen( port, async () => {
		await logger.log( `Frontend started on port: ${port}` );
	});
}
