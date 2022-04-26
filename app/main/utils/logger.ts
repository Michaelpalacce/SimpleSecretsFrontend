import { Logging }			from "event_request";
const { Loggur, Console }	= Logging;

Loggur.disableDefault();

// Create a custom Logger
const logger	= Loggur.createLogger({
	serverName : "Default", // The name of the logger
	logLevel : 300, // The logLevel for which the logger should be fired
	transports : [
		new Console( {
			logLevel : 300,
		} ), // Console logger that logs everything below notice
	]
});

Loggur.addLogger( "SimpleSecretsFrontend", logger );

export default logger;
