const libOratorServiceServerBase = require('orator-serviceserver-base');

// A synthesized response object, for simple IPC.
const libOratorServiceServerIPCSynthesizedResponse = require('./Orator-ServiceServer-IPC-SynthesizedResponse.js');

// This library is the default router for our services
const libFindMyWay = require('find-my-way');

/**
 * OratorServiceServerIPC class.
 *
 * @class
 * @extends libOratorServiceServerBase
 * @classdesc Represents an IPC service server for Orator.
 */
class OratorServiceServerIPC extends libOratorServiceServerBase
{
	constructor(pFable, pOptions, pServiceHash)
	{
        super(pFable, pOptions, pServiceHash);

		this.router = libFindMyWay(this.options);

		this.ServiceServerType = 'IPC';

		this.URL = 'IPC';
		this.Port = 0;

		this.preBehaviorFunctions = [];
		this.behaviorMap = {};
		this.postBehaviorFunctions = [];
	}

	use(fHandlerFunction)
	{
		return this.addPreBehaviorFunction(fHandlerFunction);
	}

	addPreBehaviorFunction(fHandlerFunction)
	{
		if (!super.use(fHandlerFunction))
		{
			this.log.error(`IPC provider failed to map USE handler function!`);
			return false;
		}

		this.preBehaviorFunctions.push(fHandlerFunction);
		return true;
	}

	executePreBehaviorFunctions(pRequest, pResponse, fNext)
	{
		let tmpAnticipate = this.fable.serviceManager.instantiateServiceProviderWithoutRegistration('Anticipate');

		for (let i = 0; i < this.preBehaviorFunctions.length; i++)
		{
			let tmpPreBehaviorFunction = this.preBehaviorFunctions[i];
			tmpAnticipate.anticipate(
				(fStageComplete) =>
				{
					return tmpPreBehaviorFunction(pRequest, pResponse, fStageComplete);
				});
		}

		tmpAnticipate.wait(
			(pError) =>
			{
				if (pError)
				{
					this.log.error(`IPC Provider preBehaviorFunction failed with error: ${pError}`, pError);
				}
				return fNext(pError);
			});
	}

	addPostBehaviorFunction(fHandlerFunction)
	{
		if (!super.use(fHandlerFunction))
		{
			this.log.error(`IPC provider failed to map USE handler function!`);
			return false;
		}

		this.postBehaviorFunctions.push(fHandlerFunction);
		return true;
	}

	executePostBehaviorFunctions(pRequest, pResponse, fNext)
	{
		let tmpAnticipate = this.fable.serviceManager.instantiateServiceProviderWithoutRegistration('Anticipate');

		for (let i = 0; i < this.postBehaviorFunctions.length; i++)
		{
			let tmpPostBehaviorFunction = this.postBehaviorFunctions[i];
			tmpAnticipate.anticipate(
				(fStageComplete) =>
				{
					return tmpPostBehaviorFunction(pRequest, pResponse, fStageComplete);
				});
		}

		tmpAnticipate.wait(
			(pError) =>
			{
				if (pError)
				{
					this.log.error(`IPC Provider postBehaviorFunction failed with error: ${pError}`, pError);
				}
				return fNext(pError);
			});
	}

	/*
	 * Service Route Creation Functions
	 *
	 * These base functions provide basic validation for the routes, but don't actually 
	 * do anything with them.  The design intent here is to allow derived classes to call
	 * these functions to validate that they conform to expected standards.
	 *
	 * Something like:

		get (pRoute, ...fRouteProcessingFunctions)
		{
			//...now we can do our actual get mapping function!....
		}

	 * This pattern and calling super is totally optional, obviously.
	 *************************************************************************/
	addRouteProcessor(pMethod, pRoute, pRouteFunctionArray)
	{
		// We have a constrainer on IPC so we can control channels eventually, if we like.
		// For now it just makes sure it was added with an IPC service server.
		this.router.on(pMethod, pRoute, this.buildFindMyWayHandler(pRouteFunctionArray));
		return true;
	}

	buildFindMyWayHandler(pRouteFunctionArray)
	{
		let tmpRouteFunctionArray = pRouteFunctionArray;
		return (
			(pRequest, pResponse) =>
			{
				let tmpAnticipate = this.fable.serviceManager.instantiateServiceProviderWithoutRegistration('Anticipate');

				tmpAnticipate.anticipate(
					(fNext)=>
					{
						return this.executePreBehaviorFunctions(pRequest, pResponse, fNext);
					});

				for (let i = 0; i < tmpRouteFunctionArray.length; i++)
				{
					let tmpRouteFunction = tmpRouteFunctionArray[i];
					tmpAnticipate.anticipate(
						(fNext) =>
						{
							return tmpRouteFunction(pRequest, pResponse, fNext);
						});
				}

				tmpAnticipate.anticipate(
					(fStageComplete)=>
					{
						return this.executePostBehaviorFunctions(pRequest, pResponse, fStageComplete);
					});

				return new Promise(
					(fResolve, fReject) =>
					{
						tmpAnticipate.wait(
							(pBehaviorFunctionError) =>
							{
								if (pBehaviorFunctionError)
								{
									this.log.error(`IPC Provider behavior function failed with error: ${pBehaviorFunctionError}`, pBehaviorFunctionError);
									return fReject(pBehaviorFunctionError);
								}
								return fResolve();
							});
					});
			});
	}

	// This is the virtualized "body parser"
	bodyParser()
	{
		return (pRequest, pResponse, fNext) =>
		{
			return fNext();
		};
	}

	/**
	 * Handles the HTTP GET request for a specific route.
	 *
	 * @param {string} pRoute - The route to handle.
	 * @param {...Function} fRouteProcessingFunctions - The processing functions to execute for the route.
	 * @returns {Promise} A promise that resolves when the route processing is complete.
	 */
	doGet(pRoute, ...fRouteProcessingFunctions)
	{
		return this.addRouteProcessor('GET', pRoute, Array.from(fRouteProcessingFunctions));
	}

	/**
	 * Handles the PUT request for a specific route.
	 *
	 * @param {string} pRoute - The route to handle.
	 * @param {...Function} fRouteProcessingFunctions - The processing functions to execute for the route.
	 * @returns {Promise} - A promise that resolves when the route processing is complete.
	 */
	doPut(pRoute, ...fRouteProcessingFunctions)
	{
		return this.addRouteProcessor('PUT', pRoute, Array.from(fRouteProcessingFunctions));
	}

	/**
	 * Handles the HTTP POST request for a specific route.
	 *
	 * @param {string} pRoute - The route to handle.
	 * @param {...Function} fRouteProcessingFunctions - The processing functions to execute for the route.
	 * @returns {Promise} - A promise that resolves when the route processing is complete.
	 */
	doPost(pRoute, ...fRouteProcessingFunctions)
	{
		return this.addRouteProcessor('POST', pRoute, Array.from(fRouteProcessingFunctions));
	}

	/**
	 * Handles the HTTP DEL request for a specific route.
	 *
	 * @param {string} pRoute - The route to be deleted.
	 * @param {...Function} fRouteProcessingFunctions - The route processing functions to be added.
	 * @returns {Object} - The updated route processor object.
	 */
	doDel(pRoute, ...fRouteProcessingFunctions)
	{
		return this.addRouteProcessor('DELETE', pRoute, Array.from(fRouteProcessingFunctions));
	}

	/**
	 * Adds a PATCH route processor to the service server.
	 *
	 * @param {string} pRoute - The route to be processed.
	 * @param {...Function} fRouteProcessingFunctions - The route processing functions.
	 * @returns {boolean} - Returns true if the route processor was added successfully, false otherwise.
	 */
	doPatch(pRoute, ...fRouteProcessingFunctions)
	{
		return this.addRouteProcessor('PATCH', pRoute, Array.from(fRouteProcessingFunctions));
	}

	/**
	 * Adds a route processor for the OPTIONS method.
	 *
	 * @param {string} pRoute - The route to add the processor to.
	 * @param {...Function} fRouteProcessingFunctions - The processing functions to be executed for the route.
	 * @returns {Object} - The updated Orator-ServiceServer-IPC object.
	 */
	doOpts(pRoute, ...fRouteProcessingFunctions)
	{
		return this.addRouteProcessor('OPTIONS', pRoute, Array.from(fRouteProcessingFunctions));
	}

	/**
	 * Handles the HEAD request for a specific route.
	 *
	 * @param {string} pRoute - The route to handle.
	 * @param {...Function} fRouteProcessingFunctions - The processing functions to execute for the route.
	 * @returns {Promise} - A promise that resolves when the route processing is complete.
	 */
	doHead(pRoute, ...fRouteProcessingFunctions)
	{
		return this.addRouteProcessor('HEAD', pRoute, Array.from(fRouteProcessingFunctions));
	}
	/*************************************************************************
	 * End of Service Route Creation Functions
	 */

	/**
	 * Invokes a method on the IPC provider.
	 *
	 * The route handler is dispatched with the canonical find-my-way signature
	 * (pRequest, pResponse, pParams, pStore, pSearchParams), so handlers
	 * registered directly on the router see the same arguments as lookup().
	 *
	 * @param {string} pMethod - The method to invoke.
	 * @param {string} pRoute - The route to invoke.
	 * @param {any|Function} pData - The request body, exposed to handlers as pRequest.body, or the completion callback when the body is skipped.
	 * @param {Function} [fCallback] - The callback function to handle the response; required unless passed via pData.
	 * @throws {Error} Throws an error if invoked without a callback function.
	 */
	invoke(pMethod, pRoute, pData, fCallback)
	{
		// If the data is skipped and a callback is parameter 3, do the right thing
		let tmpCallback = (typeof(fCallback) == 'function') ? fCallback :
							(typeof(pData) == 'function') ? pData :
							false;

		if (!tmpCallback)
		{
			throw new Error(`IPC Provider invoke() called without a callback function.`);
		}

		// Create a bare minimum request object for IPC to pass to our router
		let tmpRequest = (
			{
				method: pMethod,
				url: pRoute,
				body: (typeof(pData) == 'function') ? undefined : pData,
				guid: this.fable.getUUID()
			});

		// For now, dealing with no handler constraints.
		let tmpHandler = this.router.find( tmpRequest.method, tmpRequest.url);

		// Create a container for the IPC response data to be aggregated to from send() methodds
		let tmpSynthesizedResponseData = new libOratorServiceServerIPCSynthesizedResponse(tmpHandler, this.log, tmpRequest.guid);

		// Map parsed params back to the request object
		tmpRequest.params = tmpSynthesizedResponseData.params;
		tmpRequest.searchParams = tmpSynthesizedResponseData.searchParams;

		//params: handle._createParamsObject(params)//,
        //searchParams: this.querystringParser(querystring)

		// Dispatch with the canonical find-my-way handler signature so handlers
		// registered directly on the router see the same arguments as lookup().
		tmpHandler.handler(tmpRequest, tmpSynthesizedResponseData, tmpHandler.params, tmpHandler.store, tmpHandler.searchParams).then(
			(pResults)=>
			{
				return tmpCallback(null, tmpSynthesizedResponseData.responseData, tmpSynthesizedResponseData, pResults);
			},
			(pError)=>
			{
				this.log.trace('IPC Response Received', {Error: pError});
				if (pError)
				{
					this.log.error(`IPC Request Error Request GUID [${tmpRequest.guid}] handling route [${pRoute}]: ${pError}`, {Error: pError, Route: pRoute, Data: pData});
				}
				return tmpCallback(pError, tmpSynthesizedResponseData.responseData, tmpSynthesizedResponseData);
			}
		);
	}
}

module.exports = OratorServiceServerIPC;
