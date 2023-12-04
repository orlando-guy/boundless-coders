# BOUNDLESS CODERS - take your software engineering skills to the next level

![overview](/public/images/boundless-coders.png "an overview of the landing page")

**[BOUNDLESS CODERS][boundless-coders]** is an open source project that aims to help you become a better software engineer and find cool work through coding challenges and contributions to other developers' projects.

- [Contributing Guidelines](/CONTRIBUTING.md)
- [Submitting an Issue](https://github.com/orlando-guy/boundless-coders/pulls)

## Development Stacks

- **Next.js 14.0**
- **TypeScript**
- **Carbon Design System**
- **Sass preprocessor**
- **Postgresql** as SGBD

## Getting Started

### Prequisites

- Install [Node.js][Node.js] which includes [Node Package Manager][npm]

### Setting

```shell
# clone this repository
git clone https://github.com/orlando-guy/boundless-coders
# cd to your project_directory
cd project_directory
# then install dependencies
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

populate the database:

```shell
# migrate models
npx prisma migrate dev --name migration_name
# populate the database with fake data coming from prisma/seed.ts
npx prisma db seed
```

run the development server:

```shell
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

**`DATABASE_URL`** (required)
Access url to allow prisma to communicate with your database

[boundless-coders]: boundless-coders.vercel.app
[Node.js]: https://nodejs.org
[npm]: https://npmjs.com/get-npm