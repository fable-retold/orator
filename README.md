# Orator

> **[Read the Orator Documentation](https://fable-retold.github.io/orator/)** - interactive docs with the full API reference.

> An unopinionated API server abstraction for REST and IPC services

Orator is not an attempt to reinvent the wheel. Nor do we want to make a car with five of them. Orator is a thin abstraction layer over service server implementations (like Restify), providing a consistent interface for building API servers. You can spin up a web server in a single simple line, and configuration is managed through a consistent JSON format -- so as you begin to have 10 or 15 or 5,000 microservices, you don't have a bunch of boilerplate API server code laying around.

## Features

- **Unopinionated Design** - Wraps any service server implementation through a consistent interface
- **REST and IPC** - Full HTTP server support via Restify, or in-process IPC for testing and microservice composition
- **Lifecycle Management** - Before/After hooks for initialization and service start phases
- **Static File Serving** - Built-in static file serving with subdomain-based folder routing
- **Fable Integration** - First-class service provider in the Fable ecosystem with logging and configuration
- **Browser & Node.js** - Works in both environments with automatic service server selection

## Quick Start

```javascript
const libFable = require('fable');
const libOrator = require('orator');
const libOratorServiceServerRestify = require('orator-serviceserver-restify');

const _Fable = new libFable({
	Product: 'MyAPIServer',
	ProductVersion: '1.0.0',
	ServicePort: 8080
});

_Fable.serviceManager.addServiceType('Orator', libOrator);
_Fable.serviceManager.addServiceType('OratorServiceServer', libOratorServiceServerRestify);
_Fable.serviceManager.instantiateServiceProvider('Orator');
_Fable.serviceManager.instantiateServiceProvider('OratorServiceServer');

_Fable.Orator.serviceServer.get('/hello/:name',
	(pRequest, pResponse, fNext) =>
	{
		pResponse.send({ greeting: `Hello ${pRequest.params.name}!` });
		return fNext();
	});

_Fable.Orator.startService(
	() =>
	{
		console.log('Server is running on port 8080');
	});
```

## Installation

```bash
npm install orator
```

## Configuration

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `Product` | string | `"Unnamed_Service"` | Application name identifier |
| `ProductVersion` | string | `"0.0.1"` | Application version string |
| `ServicePort` | number | `8080` | Port for the service server to listen on |
| `APIServerPort` | number | - | Legacy alias for ServicePort (automatically migrated) |
| `RestifyConfiguration` | object | `{}` | Configuration passed to Restify when using the Restify service server |

## Documentation

Full documentation is available in the [`docs`](./docs) folder, or served locally:

```bash
npx docsify-cli serve docs
```

- [Architecture](docs/architecture.md) - Service server abstraction design
- [Getting Started](docs/getting-started.md) - Step-by-step setup guide
- [Static File Serving](docs/static-files.md) - Serving files from disk
- [IPC Server](docs/ipc-server.md) - In-process service invocation

## Related Packages

- [orator-serviceserver-restify](https://github.com/fable-retold/orator-serviceserver-restify) - Restify service server implementation
- [orator-serviceserver-base](https://github.com/fable-retold/orator-serviceserver-base) - Abstract service server base class
- [orator-static-server](https://github.com/fable-retold/orator-static-server) - Static file serving
- [fable](https://github.com/fable-retold/fable) - Application services framework

## License

MIT

## Contributing

Pull requests are welcome. For details on our code of conduct, contribution process, and testing requirements, see the [Retold Contributing Guide](https://github.com/fable-retold/retold/blob/main/docs/contributing.md).
