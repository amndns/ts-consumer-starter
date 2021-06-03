<h1 align="center">TypeScript RabbitMQ Consumer Starter</h1>
<p align="center">
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/amndns/ts-rest-starter/blob/main/README.md" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/amndns/ts-rest-starter/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/amndns/ts-rest-starter/blob/main/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-green.svg" />
  </a>
</p>

> TypeScript RabbitMQ Consumer Starter is a boilerplate for building RabbitMQ Consumer services using NodeJS and TypeScript.

## ✨ Features

- **Clear Structure** with different layers such as consumers, controllers, services, repositories, models, and so on.
- **Dependency Injection** done with the nice framework from [TypeDI](https://github.com/pleerock/typedi).
- **Simplified Database Query** with the ORM [TypeORM](https://github.com/typeorm/typeorm).
- **Smart Validation** thanks to [class-validator](https://github.com/typestack/class-validator).
- **Smart Transformation** thanks to [class-transformer](https://github.com/typestack/class-transformer).
- **Smart Concurrent Processing** thanks to [concurrently](https://github.com/kimmobrunfeldt/concurrently).
- **Easy API Testing** with included unit testing thanks to [Jest](https://facebook.github.io/jest).
- **Easy RabbitMQ Integration** thanks to [@amndns/amqp-ts](https://github.com/amndns/amqp-ts).

Give a ⭐️ if this project helped you!

### Good for First Timers

- [ ] Add unit tests for consumer controller.
- [ ] Improve consumer concurrency.

## 🔬 Project Structure

| Name                                    | Description |
| --------------------------------------- | ----------- |
| **.vscode/**                            | VSCode tasks, launch configuration, and some other settings |
| **dist/**                               | Compiled source files |
| **src/**                                | Source files |
| **src/config/**                         | Environment configurations loaded into the project |
| **src/consumers/common/**               | Common Consumer controllers, services, repositories, models, middlewares, etc. |
| **src/consumers/\*\*/consumers/**       | RabbitMQ consumers |
| **src/consumers/\*\*/controllers/**     | Consumer controller layer |
| **src/consumers/\*\*/models/**          | TypeORM entity models and Consumer backend models |
| **src/consumers/\*\*/repositories/**    | Consumer repository/DAO layer |
| **src/consumers/\*\*/services/**        | Consumer service layer |
| **src/database/factories/**             | Factory that generates fake entities |
| **src/database/migrations/**            | Database migration scripts |
| **src/database/seeds/**                 | Seeds to create some data in the database |
| **src/loaders/**                        | Consumer server configuration loader |
| **test/**                               | Tests |
| **test/unit/**                          | Unit tests and their mocks |
| **.env.example**                        | Example raw environment configurations |
| **app.ts**                              | Consumer server entrypoint - concurrently calls all of the consumer processes |
| **app-consumer.ts [FILENAME]**          | Single consumer entrypoint - the one being called by `app.ts` |

## ⚙️ Notifications Webhook

The sample consumer provided is designed to be a simple webhook service that sends a sample HTTP POST request notification to https://reqres.in/api/users. The sample consumer and its resources are also designed to be fault-tolerant. The boilerplate declares a RabbitMQ exchange with a main queue and a dead-letter queue. 

| Queue                        | Exchange          | Routing Key                | Description |
| ---------------------------- | ----------------- | -------------------------- | ----------- |
| **notifications.queue**      | **notifications** | **notifications.key**      | Example main queue - redirects the message to `notifications.dead.queue` when there's a failure |
| **notifications.dead.queue** | **notifications** | **notifications.dead.key** | Example dead-letter queue with TTL - redirects the message back to `notifications.queue` after TTL expiration |

## 🚀 Get Started

This project was created using [TypeScript](https://www.typescriptlang.org/).

Before running any of the `yarn` commands below, make sure you create a `.env` file first. You can simply copy the contents of the `.env.example` into your local `.env` file. Moreover, make sure you also have the proper local resources running before starting the server (e.g. RabbitMQ, Redis, PostgreSQL).

Below is a guide on the common commands you might use all throughout the development process. In the project directory, you can run:

#### `yarn install`

Installs all package dependencies of the app. Make sure you have [yarn](https://yarnpkg.com/) installed and configured first.

#### `yarn start`

Starts the server by transpiling all of the `.ts` code to `.js` and then running the `dist/app.js` entrypoint.

#### `yarn start:watch`

Starts the server in watch mode by concurrently transpiling all of the `.ts` code to `.js` and running the `dist/app.js` entrypoint.

#### `yarn lint`

Launches the linter against all of the `.ts` files from the `src/` and `test/` directory. The project specifically uses [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) as the linter and code formatter, respectively.

#### `yarn test:unit`

Launches the test runner in interactive watch mode using Jest. The test is launched against all of the `.ts` files from the `test/` directory.

## 📑 Logging

[Winston](https://github.com/winstonjs/winston) is being used as the logger. To log HTTP requests, we use the express middleware [morgan](https://github.com/expressjs/morgan). You can check a sample usage of the logger utility.

```typescript
import { Logger, WinstonLogger } from '@amndns/service-utils/logger';

@Service()
export class SampleService {
    constructor(
      @Logger(__filename) private log: WinstonLogger,
    ) {}

    ...
```

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_