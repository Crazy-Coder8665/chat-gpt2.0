<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# ChatGPT Interface

A web interface for interacting with ChatGPT using Express, TypeScript, and Puppeteer.

## Prerequisites

- Node.js version 23 or higher
- npm (Node Package Manager)
- setup env check example.env for reference

## Installation

1. Install Node.js v23 or higher:
   ```bash
   # Using nvm (Node Version Manager)
   nvm install 23
   nvm use 23
   
   # Or download directly from nodejs.org
   ```

2. Clone the repository:
   ```bash
   git clone <repository-url>
   cd chat-gpt2.0
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Install nodemon globally (optional but recommended):
   ```bash
   npm install -g nodemon
   ```

## Running the Application

### Development Mode
```bash
npm run start:dev
```
This will start the application with nodemon, which automatically restarts the server when files change.

### Production Mode
```bash
# First build the TypeScript files
npm run build

# Then start the production server
npm run start:prod
```

### Regular Mode
```bash
# First build the TypeScript files
npm run build

# Then start the server
npm start
```

## Features

- Real-time chat interface with ChatGPT
- Optional login support
- Chat history export to CSV
- Modern UI with responsive design
- Stealth mode for browser automation
- TypeScript support for better type safety

## Project Structure

```
chat-gpt2.0/
├── src/
│   ├── routes/
│   │   └── chat.ts
│   ├── services/
│   │   └── chat.ts
│   └── app.ts
├── views/
│   └── chat.ejs
├── public/
├── exports/
├── dist/           # Compiled JavaScript files
├── tsconfig.json   # TypeScript configuration
└── package.json
```

## TypeScript Configuration

The project uses TypeScript with the following key configurations:
- Target: ES2020
- Module: CommonJS
- Strict mode enabled
- Source maps for debugging
- Path aliases for cleaner imports

## Environment Variables

The application uses the following environment variables:
- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment mode (development/production)

## Troubleshooting

If you encounter any issues:

1. Make sure you have Node.js v23 or higher installed
2. Clear npm cache: `npm cache clean --force`
3. Delete node_modules and reinstall: 
   ```bash
   rm -rf node_modules
   npm install
   ```
4. Check if all required ports are available
5. For TypeScript compilation errors:
   - Run `npm run build` to see detailed error messages
   - Check the `tsconfig.json` settings
   - Ensure all type definitions are installed
