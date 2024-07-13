## Description

Hai! this is another one example of my work using ExpressJS framework, Prisma ORM and PostgreSQL. With this one you also can deploy it using docker so have fun try to using it!. By default it will be running on localhost:4003 unless you've change it, further more kindly check `/api-doc` for api documentation.

## Installation

1. Please make your own env file for database connection and JWT secret unless you deploy it using docker you have to change in docker-compose file.

```bash
# installing dependencies
$ npm install

# prisma migrate
$ npx prisma migrate deploy

# seeding the database
$ npx prisma db seed
```

## Running the app

```bash
# watch mode
$ npm run dev

# production mode
$ npm run start
```

## Deployment using docker

```bash
# build an image
$ docker-compose build

# running container
$ docker-compose up

# running container on background
$ docker-compose up -d
```
