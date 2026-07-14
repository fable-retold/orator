/**
* Unit tests for the Orator Server
*
* @license     MIT
*
* @author      Steven Velozo <steven@velozo.com>
*/

const libOrator = require('../source/Orator.js');

const Chai = require("chai");
const Expect = Chai.expect;
const Assert = Chai.assert;

//const libSuperTest = require('supertest');
const libFable = require('fable');

const defaultFableSettings = (
	{
		Product:'Orator-BasicTests-Backplane',
		ProductVersion: '0.0.0',
		APIServerPort: 0
	});

suite
(
	'Orator',
	() =>
	{
		suite
		(
			'Object Sanity',
			() =>
			{
				test
				(
					'initialize should build a happy little object',
					(fDone) =>
					{
						let tmpFable = new libFable(defaultFableSettings);
						tmpFable.serviceManager.addServiceType('Orator', libOrator);
						let tmpOrator = tmpFable.serviceManager.instantiateServiceProvider('Orator', {});
						Expect(tmpOrator).to.be.an('object', 'Orator should initialize as an object directly from the require statement.');
						Expect(tmpOrator.startService).to.be.an('function');
						Expect(tmpOrator.options).to.be.an('object');
						tmpOrator.initialize(
							(pError)=>
							{
								Expect(tmpOrator.serviceServer.ServiceServerType).to.equal('IPC', 'The default service server provider should be IPC.');
								fDone();
							});
					}
				);

				test
				(
					'orator should be able to initialize and start a service with discrete steps for init and start',
					(fDone) =>
					{
						let tmpFable = new libFable(defaultFableSettings);
						tmpFable.serviceManager.addServiceType('Orator', libOrator);
						let tmpOrator = tmpFable.serviceManager.instantiateServiceProvider('Orator', {});
						// Start the service
						tmpOrator.initialize(
							() =>
							{
								Expect(tmpOrator.serviceServer.Active).to.equal(false);
								tmpOrator.startService(
									()=>
									{
										Expect(tmpOrator.serviceServer.Active).to.equal(true);
										fDone();
									});
							})
					}
				);

				test
				(
					'orator should be able to initialize IPC and start a service with no effort',
					(fDone) =>
					{
						let tmpFable = new libFable(defaultFableSettings);
						tmpFable.serviceManager.addServiceType('Orator', libOrator);
						let tmpOrator = tmpFable.serviceManager.instantiateServiceProvider('Orator', {});
						// Start the service, which will implicitly call initialize
						tmpOrator.startService(
							()=>
							{
								Expect(tmpOrator.serviceServer.Active).to.equal(true);
								fDone();
							});
					}
				);

				test
				(
					'ipc should be able to provide basic endpoint functionality',
					(fDone) =>
					{
						let tmpFable = new libFable(defaultFableSettings);
						tmpFable.serviceManager.addServiceType('Orator', libOrator);
						let tmpOrator = tmpFable.serviceManager.instantiateServiceProvider('Orator', {});
						// Start the service
						tmpOrator.startService();
						tmpOrator.serviceServer.get
						(
							'/test/:hash',
							(pRequest, pResponse, fNext) =>
							{
								// Send back the request parameters
								pResponse.send(pRequest.params);
								tmpOrator.fable.log.info(`Endpoint sent parameters object:`,pRequest.params);
								return fNext();
							}
						);

						let tmpURI = `/test/SomeHash`;
						tmpOrator.invoke('GET', tmpURI, null, 
							(pError, pResponseData) =>
							{
								let tmpResponseObject = JSON.parse(pResponseData);
								Expect(tmpResponseObject).to.have.a.property('hash');
								Expect(tmpResponseObject.hash).to.equal('SomeHash');
								tmpOrator.log.info(`Response to [${tmpURI}] came back from IPC resulting in [${pResponseData}] which is type ${typeof(pResponseData)}!`);
								return fDone();
							});
					}
				);

				test
				(
					'ipc invoke should deliver the data parameter as the request body',
					(fDone) =>
					{
						let tmpFable = new libFable(defaultFableSettings);
						tmpFable.serviceManager.addServiceType('Orator', libOrator);
						let tmpOrator = tmpFable.serviceManager.instantiateServiceProvider('Orator', {});
						// Start the service
						tmpOrator.startService();
						tmpOrator.serviceServer.post
						(
							'/echo/body',
							(pRequest, pResponse, fNext) =>
							{
								pResponse.send({ ReceivedBody: pRequest.body });
								return fNext();
							}
						);

						let tmpURI = `/echo/body`;
						let tmpBody = { Filter: 'FBV~IDCustomer~EQ~6', Cap: 50 };
						tmpOrator.invoke('POST', tmpURI, tmpBody,
							(pError, pResponseData) =>
							{
								let tmpResponseObject = JSON.parse(pResponseData);
								Expect(tmpResponseObject).to.have.a.property('ReceivedBody');
								Expect(tmpResponseObject.ReceivedBody).to.deep.equal(tmpBody);
								// The data-skipped arity (callback as parameter 3) should leave body undefined
								tmpOrator.invoke('POST', tmpURI,
									(pSecondError, pSecondResponseData) =>
									{
										let tmpSecondResponseObject = JSON.parse(pSecondResponseData);
										Expect(tmpSecondResponseObject).to.not.have.a.property('ReceivedBody');
										return fDone();
									});
							});
					}
				);

				test
				(
					'ipc invoke should dispatch raw router handlers with the canonical find-my-way signature',
					(fDone) =>
					{
						let tmpFable = new libFable(defaultFableSettings);
						tmpFable.serviceManager.addServiceType('Orator', libOrator);
						let tmpOrator = tmpFable.serviceManager.instantiateServiceProvider('Orator', {});
						// Start the service
						tmpOrator.startService();

						let tmpRouteStore = { RouteDescription: 'raw handler store' };
						// Register directly on the router, bypassing the orator route wrappers
						tmpOrator.serviceServer.router.on('POST', '/raw/:section',
							async (pRequest, pResponse, pParams, pStore, pSearchParams) =>
							{
								pResponse.send(
									{
										Params: pParams,
										Store: pStore,
										SearchParams: pSearchParams,
										Body: pRequest.body
									});
							}, tmpRouteStore);

						tmpOrator.invoke('POST', '/raw/widgets?Verbose=1', { Name: 'Widget Nine' },
							(pError, pResponseData) =>
							{
								let tmpResponseObject = JSON.parse(pResponseData);
								Expect(tmpResponseObject.Params).to.deep.equal({ section: 'widgets' });
								Expect(tmpResponseObject.Store).to.deep.equal(tmpRouteStore);
								Expect(tmpResponseObject.SearchParams).to.deep.equal({ Verbose: '1' });
								Expect(tmpResponseObject.Body).to.deep.equal({ Name: 'Widget Nine' });
								return fDone();
							});
					}
				);

				test
				(
					'ipc should be able to process any number of handler additions with the use function',
					(fDone) =>
					{
						let tmpFable = new libFable(defaultFableSettings);
						tmpFable.serviceManager.addServiceType('Orator', libOrator);
						let tmpOrator = tmpFable.serviceManager.instantiateServiceProvider('Orator', {});

						// Start the service
						tmpOrator.startService();

						tmpOrator.serviceServer.get
						(
							'/MagicEndpoint/:MagicWords',
							(pRequest, pResponse, fNext) =>
							{
								let tmpResponseObject = (
									{
										MagicWords: pRequest.params.MagicWords,
										MagicIngredients: pRequest.MagicIngredients
									});
								pResponse.send(tmpResponseObject);
								return fNext();
							}
						);

						tmpFable.Utility.waterfall([
								(fStageComplete) =>
								{
									let tmpURI = `/MagicEndpoint/BippityBoppityBoo`;
									tmpOrator.invoke('GET', tmpURI, null, 
										(pError, pResponseData) =>
										{
											let tmpResponseObject = JSON.parse(pResponseData);
											Expect(tmpResponseObject).to.have.a.property('MagicWords');
											Expect(tmpResponseObject.MagicWords).to.equal('BippityBoppityBoo');
											Expect(tmpResponseObject).to.not.have.a.property('MagicIngredients');
											//Expect(tmpResponseObject.MagicIngredients).to.be('undefined');
											tmpOrator.log.info(`Response to [${tmpURI}] came back from IPC resulting in [${pResponseData}] which is type ${typeof(pResponseData)}!`);
											return fStageComplete();
										});
								},
								(fStageComplete) =>
								{
									// Add a use parameter that decorates the ingredients
									tmpOrator.serviceServer.use(
										(pRequest, pResponse, fNext) =>
										{
											pRequest.MagicIngredients = [];
											return fNext();
										});
									return fStageComplete();
								},
								(fStageComplete) =>
								{
									let tmpURI = `/MagicEndpoint/BippityBoppityBoo`;
									tmpOrator.invoke('GET', tmpURI, null, 
										(pError, pResponseData) =>
										{
											let tmpResponseObject = JSON.parse(pResponseData);
											Expect(tmpResponseObject).to.have.a.property('MagicWords');
											Expect(tmpResponseObject.MagicWords).to.equal('BippityBoppityBoo');
											Expect(tmpResponseObject).to.have.a.property('MagicIngredients');
											Expect(tmpResponseObject.MagicIngredients).to.be.an('array');
											tmpOrator.log.info(`Response to [${tmpURI}] came back from IPC resulting in [${pResponseData}] which is type ${typeof(pResponseData)}!`);
											return fStageComplete();
										});
								},
								(fStageComplete) =>
								{
									// Add a use parameter that decorates the ingredients
									tmpOrator.serviceServer.use(
										(pRequest, pResponse, fNext) =>
										{
											pRequest.MagicIngredients.push('Magic Outcomes');
											return fNext();
										});
									return fStageComplete();
								},
								(fStageComplete) =>
								{
									let tmpURI = `/MagicEndpoint/BippityBoppityBoo`;
									tmpOrator.invoke('GET', tmpURI, null,
										(pError, pResponseData) =>
										{
											let tmpResponseObject = JSON.parse(pResponseData);
											Expect(tmpResponseObject).to.have.a.property('MagicWords');
											Expect(tmpResponseObject.MagicWords).to.equal('BippityBoppityBoo');
											Expect(tmpResponseObject).to.have.a.property('MagicIngredients');
											Expect(tmpResponseObject.MagicIngredients).to.be.an('array');
											Expect(tmpResponseObject.MagicIngredients[0]).to.equal('Magic Outcomes');
											tmpOrator.log.info(`Response to [${tmpURI}] came back from IPC resulting in [${pResponseData}] which is type ${typeof(pResponseData)}!`);
											return fStageComplete();
										});
								}
							],
							(pError) =>
							{
								return fDone();
							})
					}
				);
			}
		);
	}
);