/**
* Orator Service Abstraction
*
* @license MIT
*
* @author Steven Velozo <steven@velozo.com>
* @module Orator Service
*/

const libFableServiceProviderBase = require('fable-serviceproviderbase');

const libDefaultOratorServiceServer = require('./Orator-Default-ServiceServer.js');

// orator-static-server is lazy-loaded so that browser bundles using orator's
// IPC mode don't pay the cost of (or trip over) its server-only deps. Only
// setMimeHeader / addStaticRoute / addStaticRouteWithFallbacks need it, and
// none of those are reachable from IPC-only consumers.
let libOratorStaticServer = null;
const getOratorStaticServer = () =>
{
	if (!libOratorStaticServer)
	{
		libOratorStaticServer = require('orator-static-server');
	}
	return libOratorStaticServer;
};

const defaultOratorConfiguration = require('./Orator-Default-Configuration.js');

/**
 * @class Orator
 * @extends libFableServiceProviderBase
 * 
 * Represents the Orator service provider.
 * 
 * @param {Object} pFable - The Fable instance.
 * @param {Object} pOptions - The options for the Orator service.
 * @param {string} pServiceHash - The hash of the service.
 */
class Orator extends libFableServiceProviderBase
{
	constructor(pFable, pOptions, pServiceHash)
	{
        super(pFable, pOptions, pServiceHash);

        this.serviceType = 'Orator';

		// Create the empty, important logic containers
		this.serviceServer = false;
		this.serviceServerProvider = false;

		// Now check to see that the ServicePort is set (this used to be APIServerPort)
		if (!this.options.hasOwnProperty('ServicePort'))
		{
			if (this.fable.settings.hasOwnProperty('APIServerPort'))
			{
				// Automatically migrate the legacy APIServerPort to ServicePort
				this.options.ServicePort = this.fable.settings.APIServerPort;
			}
			else
			{
				// Default to whatever the ... default is!
				this.options.ServicePort = defaultOratorConfiguration.ServicePort;
			}
		}

		// Now check to see that the Product name is set
		if (!this.options.hasOwnProperty('Product'))
		{
			this.options.Product = defaultOratorConfiguration.Product;
		}
	}

	/**
	 * Lifecycle event that executes before initializing the service.  For overloading.
	 */
	onBeforeInitialize()
	{
		if (this.fable.settings.LogNoisiness > 3)
		{
			this.log.trace(`Orator [${this.UUID}]::[${this.Hash}] ${this.options.Product} onBeforeInitialize:`);
		}
	}
	/**
	 * Lifecycle event that executes before initializing the service.  For overloading.
	 * 
	 * @param {Function} fNext - The callback function to be called after the actions are executed.
	 */
	onBeforeInitializeAsync(fNext)
	{
		this.onBeforeInitialize();
		// Check to see if there is a service server active; if not instantiate one (and use IPC if none is registered with Fable as the default provider)
		if (!this.serviceServer)
		{
			// If the developer hasn't set this to a service provider class of their own choosing, 
			// TODO: Give the developer a chance to set a service provider instantiation address of their own choosing.
			// use the built-in network-less one.
			if (!this.fable.OratorServiceServer)
			{
				// If there isn't a default Service Server setup, create one.
				let tmpServiceServerOptions = (typeof(this.options.ServiceServerOptions) == 'undefined') ? {} : this.options.ServiceServerOptions;
				if (!this.fable.serviceManager.servicesMap.hasOwnProperty('OratorServiceServer'))
				{
					// Only register IPC if there isn't one yet.
					this.fable.serviceManager.addServiceType('OratorServiceServer', libDefaultOratorServiceServer);
				}
				this.fable.serviceManager.instantiateServiceProvider('OratorServiceServer', tmpServiceServerOptions, 'OratorServiceServer-AutoInit');
			}
			this.serviceServer = this.fable.OratorServiceServer;
			// For legacy reasons, we also will provide this under the "webServer" variable.
			this.webServer = this.serviceServer;
		}
		else
		{
			this.log.warn(`Orator attempting to initialize a service server after initialization has already completed.`)
		}
		fNext();
	}

	onInitialize()
	{
		if (this.fable.settings.LogNoisiness > 3)
		{
			this.log.trace(`Orator [${this.UUID}]::[${this.Hash}] ${this.options.Product} onInitialize:`);
		}
	}
	/**
	 * Lifecycle event that executes at the moment of initializing the service.  For overloading.
	 *
	 * @param {Function} fNext - The callback function to be executed after initialization.
	 */
	onInitializeAsync(fNext)
	{
		this.onInitialize();
		return fNext();
	}

	/**
	 * Lifecycle event that executes after initializing the service.  For overloading.
	 */
	onAfterInitialize()
	{
		if (this.fable.settings.LogNoisiness > 3)
		{
			this.log.trace(`Orator [${this.UUID}]::[${this.Hash}] ${this.options.Product} onAfterInitialize:`);
		}
	}
	/**
	 * Lifecycle event that executes after initializing the service.  For overloading.
	 * @param {Function} fNext - The callback function to be called after executing onAfterInitialize.
	 * @returns {Promise} - A promise that resolves when the callback function is called.
	 */
	onAfterInitializeAsync(fNext)
	{
		this.onAfterInitialize();
		return fNext();
	}

	/**
	 * Initializes the Orator instance.
	 *
	 * @param {Function} fCallback - The callback function to be executed after initialization.
	 */
	initialize(fCallback)
	{
		// I hate this -- as long as we want to be "mostly" backwards compatible it needs to do it though
		let tmpCallback = (typeof(fCallback) === 'function') ? fCallback : () => {};

		if (!this.initializeTimestamp)
		{
			let tmpAnticipate = this.fable.serviceManager.instantiateServiceProviderWithoutRegistration('Anticipate');

			if (this.fable.LogNoisiness > 3)
			{
				this.log.trace(`Orator [${this.UUID}]::[${this.Hash}] ${this.options.Product} beginning initialization steps...`);
			}

			tmpAnticipate.anticipate(this.onBeforeInitializeAsync.bind(this));
			tmpAnticipate.anticipate(this.onInitializeAsync.bind(this));
			tmpAnticipate.anticipate(this.onAfterInitializeAsync.bind(this));

			tmpAnticipate.wait(
				(pError) =>
				{
					this.initializeTimestamp = this.fable.log.getTimeStamp();
					if (this.fable.LogNoisiness > 2)
					{
						this.log.trace(`Orator [${this.UUID}]::[${this.Hash}] ${this.options.Product} initialization steps complete.`);
					}
					return tmpCallback(pError);
				});
		}
		else
		{
			this.log.warn(`Orator [${this.UUID}]::[${this.Hash}] ${this.options.Product} async initialize called but initialization is already completed.  Aborting.`);
			// TODO: Should this be returning an error?
			return tmpCallback();
		}
	}

	/**
	 * Lifecycle event that executes before starting the service.  For overloading.
	 *
	 * @param {Function} fNext - The function to be executed before starting the service.
	 * @returns {Promise} A promise that resolves when the function is completed.
	 */
	onBeforeStartService(fNext)
	{
		return fNext();
	}
	/**
	 * Lifecycle event that executes when the service starts.  For overloading.
	 * 
	 * @param {Function} fNext - The callback function to be called after the service starts.
	 * @returns {Promise} A promise that resolves when the service starts successfully, or rejects with an error.
	 */
	onStartService(fNext)
	{
		this.onAfterInitialize();
		return this.serviceServer.listen
		(
			this.options.ServicePort,
			(pError)	=>
			{
				this.log.info(`${this.serviceServer.Name} listening on port ${this.options.ServicePort}`);
				return fNext(pError);
			}
		);
	}
	/**
	 * Lifecycle event that executes after starting the service.  For overloading.
	 *
	 * @param {Function} fNext - The callback function to be executed after the service starts.
	 * @returns {Promise} - A promise that resolves when the callback function is completed.
	 */
	onAfterStartService(fNext)
	{
		return fNext();
	}

	/**
	 * Starts the service.
	 * 
	 * @param {Function} fNext - The callback function to be executed after the service has started.
	 */
	startService(fNext)
	{
		var tmpNext = (typeof(fNext) === 'function') ? fNext : ()=>{};

		let tmpAnticipate = this.fable.serviceManager.instantiateServiceProviderWithoutRegistration('Anticipate');

		if (this.fable.LogNoisiness > 3)
		{
			this.log.trace(`Orator [${this.UUID}]::[${this.Hash}] ${this.options.Product} beginning startService steps...`);
		}

		// Auto initialize if there is no serviceServer
		if (!this.serviceServer)
		{
			tmpAnticipate.anticipate(this.initialize.bind(this));
		}

		tmpAnticipate.anticipate(this.onBeforeStartService.bind(this));
		tmpAnticipate.anticipate(this.onStartService.bind(this));
		tmpAnticipate.anticipate(this.onAfterStartService.bind(this));

		tmpAnticipate.wait(
			(pError) =>
			{
				this.startServiceTimestamp = this.fable.log.getTimeStamp();
				if (this.fable.LogNoisiness > 2)
				{
					this.log.trace(`Orator [${this.UUID}]::[${this.Hash}] ${this.options.Product} startService steps complete.`);
				}
				return tmpNext(pError);
			});
	}

	/**
	 * Stops the service server.
	 * 
	 * @param {Function} fCallback - The callback function to be executed after the service server is stopped.
	 * @returns {void}
	 */
	stopService(fCallback)
	{
		var tmpCallback = (typeof(fCallback) === 'function') ? fCallback : ()=>{};

		if (!this.serviceServer)
		{
			let tmpMessage = `Orator attempting to stop a service server but the service server has not been intialized yet.`;
			this.log.warn(tmpMessage);
			return tmpCallback(tmpMessage);
		}

		if (!this.serviceServer.Active)
		{
			let tmpMessage = `Orator attempting to stop a service server but the service server is not actively running.`;
			this.log.warn(tmpMessage);
			return tmpCallback(tmpMessage);
		}

		return this.serviceServer.close(tmpCallback);
	}

	/**
	 * Programmatically invokes a method on the service server.
	 *
	 * @param {string} pMethod - The method to invoke.
	 * @param {string} pRoute - The route to invoke.
	 * @param {any|Function} pData - The request body, exposed to handlers as pRequest.body, or the completion callback when the body is skipped.
	 * @param {Function} [fCallback] - The callback function to execute after the invocation; required unless passed via pData.
	 * @returns {any} - The result of the invocation.
	 */
	invoke(pMethod, pRoute, pData, fCallback)
	{
		//this.log.trace(`Orator [${this.UUID}]::[${this.Hash}] ${this.options.Product} invoking ${pMethod} ${pRoute}`);
		return this.serviceServer.invoke(pMethod, pRoute, pData, fCallback);
	}

	/*
	 * Legacy Orator / Backwards Compatibility Functions
	 *************************************************************************/
	/**
	 * Starts the web server.
	 *
	 * @param {Function} fNext - The callback function to be executed after the web server starts.
	 * @returns {Promise} A promise that resolves when the web server has started.
	 */
	startWebServer(fNext)
	{
		return this.startService(fNext);
	}

	/**
	 * Stops the web server.
	 *
	 * @param {Function} fNext - The callback function to be called after the web server is stopped.
	 * @returns {Promise} A promise that resolves when the web server is stopped.
	 */
	stopWebServer(fNext)
	{
		return this.stopService(fNext);
	}

	/**
	 * Retrieves the web server instance.
	 * 
	 * @returns {WebServer} The web server instance.
	 */
	getWebServer()
	{
		// The old behavior was to lazily construct the service the first time 
		// this accessor function is called.
		if (!this.serviceServer)
		{
			this.initialize();
		}

		return this.serviceServer;
	}
	/*************************************************************************
	 * End of Legacy Orator Functions
	 */

	/*
	 * Backwards Compatibility: setMimeHeader and oldLibMime
	 *
	 * These used to live directly on Orator but now live on OratorStaticServer.
	 * These thin wrappers delegate to the OratorStaticServer instance so that
	 * any code calling orator.setMimeHeader() or reading orator.oldLibMime
	 * continues to work without changes.
	 *************************************************************************/
	/**
	 * @deprecated Use fable.OratorStaticServer.oldLibMime instead.
	 */
	get oldLibMime()
	{
		if (this.fable.OratorStaticServer)
		{
			return this.fable.OratorStaticServer.oldLibMime;
		}
		return false;
	}

	/**
	 * @deprecated Use fable.OratorStaticServer.setMimeHeader() instead.
	 */
	setMimeHeader(pFileName, pResponse)
	{
		if (!this.fable.OratorStaticServer)
		{
			// Force auto-registration so the method is available
			if (!this.fable.serviceManager.servicesMap.hasOwnProperty('OratorStaticServer'))
			{
				this.fable.serviceManager.addServiceType('OratorStaticServer', getOratorStaticServer());
			}
			this.fable.serviceManager.instantiateServiceProvider('OratorStaticServer', {}, 'OratorStaticServer-AutoInit');
		}
		return this.fable.OratorStaticServer.setMimeHeader(pFileName, pResponse);
	}

	/**
	 * Serve a static folder, optionally with magic subdomain masking.
	 * Delegates to the OratorStaticServer service provider.
	 *
	 * @param {string} pFilePath The path on disk that we are serving files from.
	 * @param {string?} pDefaultFile (optional) The default file served if no specific file is requested.
	 * @param {string?} pRoute (optional) The route matcher that will be used. Defaults to everything.
	 * @param {string?} pRouteStrip (optional) If provided, this prefix will be removed from URL paths before being served.
	 * @param {object?} pParams (optional) Additional parameters to pass to serve-static.
	 * @return {boolean} true if the handler was successfully installed, otherwise false.
	 */
	addStaticRoute(pFilePath, pDefaultFile, pRoute, pRouteStrip, pParams)
	{
		// Auto-register the OratorStaticServer service type if it hasn't been registered yet
		if (!this.fable.serviceManager.servicesMap.hasOwnProperty('OratorStaticServer'))
		{
			this.fable.serviceManager.addServiceType('OratorStaticServer', getOratorStaticServer());
		}

		// Auto-instantiate a default OratorStaticServer instance if none exists
		if (!this.fable.OratorStaticServer)
		{
			this.fable.serviceManager.instantiateServiceProvider('OratorStaticServer', {}, 'OratorStaticServer-AutoInit');
		}

		return this.fable.OratorStaticServer.addStaticRoute(pFilePath, pDefaultFile, pRoute, pRouteStrip, pParams);
	}

	/**
	 * Register a static-file route with a per-file CDN fallback map.
	 *
	 * Behaves like addStaticRoute for every local hit. For any request whose
	 * relative path is a key in pFallbackMap and whose file isn't present
	 * on disk, responds with 302 to the mapped URL instead of a 404. Any
	 * request whose relative path isn't in the map behaves exactly as
	 * addStaticRoute would (local hit → stream, local miss → 404).
	 *
	 * @param {string} pFilePath The path on disk that we are serving files from.
	 * @param {string?} pDefaultFile (optional) The default file served if no specific file is requested.
	 * @param {string?} pRoute (optional) The route matcher that will be used. Defaults to everything.
	 * @param {string?} pRouteStrip (optional) If provided, this prefix will be removed from URL paths before being served.
	 * @param {object?} pParams (optional) Additional parameters to pass to serve-static.
	 * @param {Object<string,string>?} pFallbackMap (optional) Map of relative path (under the route prefix) to absolute URL for CDN fallback.
	 * @return {boolean} true if the handler was successfully installed, otherwise false.
	 */
	addStaticRouteWithFallbacks(pFilePath, pDefaultFile, pRoute, pRouteStrip, pParams, pFallbackMap)
	{
		if (!this.fable.serviceManager.servicesMap.hasOwnProperty('OratorStaticServer'))
		{
			this.fable.serviceManager.addServiceType('OratorStaticServer', getOratorStaticServer());
		}
		if (!this.fable.OratorStaticServer)
		{
			this.fable.serviceManager.instantiateServiceProvider('OratorStaticServer', {}, 'OratorStaticServer-AutoInit');
		}

		return this.fable.OratorStaticServer.addStaticRouteWithFallbacks(
			pFilePath, pDefaultFile, pRoute, pRouteStrip, pParams, pFallbackMap);
	}
}

module.exports = Orator;
module.exports.ServiceServerBase = require('orator-serviceserver-base');
module.exports.ServiceServerIPC = require('./Orator-ServiceServer-IPC.js');
