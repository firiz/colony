# Colony

A boilerplate for developing scalable microservices using RabbitMQ ([amqp](https://www.npmjs.com/package/amqp)) and Protocol Buffers ([protobufjs](https://www.npmjs.com/package/protobufjs)) with Node.js. featuring:
* Node.js Async/Await interface
* Protocol Buffers
* RabbitMQ 
* RPC Concept
* Eslint
* PM2 Cluster Mode

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* A running RabbitMQ instance on localhost on standard port (5672). In case you use a different host, port or credentials, connections settings would require adjusting.
* Node (> v8.9.0)
* Globally installed yarn (`npm install -g yarn`)
* Globally installed pm2 (`npm install -g pm2`)
 
### Installing

Clone repository into your local machine

```
git clone https://github.com/firiz/colony.git
```

Change directory to colony

```
cd colony
```

Install dependencies

```
yarn
```

Run services 

```
npm start
```

At this point you should be able to monitor your services via pm2

```
pm2 ls
```

Or see services logs

```
pm2 logs
```

Also you can open RabbitMQ management dashboard to review your queues status

```
http://127.0.0.1:15672
```


## Running the tests

Will be added soon, but you can explore:
* [Jest](https://jestjs.io/) - Delightful JavaScript Testing

## Deployment

Will be added soon, but you can explore:
* [PM2](http://pm2.keymetrics.io/) - Advanced, production process manager for Node.js.
* [Docker](https://www.docker.com/) - Build, Manage and Secure Your Apps Anywhere. Your Way.

## Built With

* [Node.js](https://nodejs.org/en/) - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
* [RabbitMQ](https://www.rabbitmq.com/) - RabbitMQ is the most widely deployed open source message broker.
* [Protocol Buffers](https://developers.google.com/protocol-buffers/) - Protocol buffers are a language-neutral, platform-neutral extensible mechanism for serializing structured data.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

* **Farshad Sahafzadeh** - [Github Page](https://github.com/firiz)

See also the list of [contributors](https://github.com/firiz/colony/graphs/contributors) who participated in this project.

## License

This project is licensed under the GNU GENERAL PUBLIC LICENSE - see the [LICENSE](LICENSE) file for details

