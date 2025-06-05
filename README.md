
# Electro

**Electro** is a backend application built with Node.js and TypeScript. It utilizes Express.js for handling HTTP requests and Sequelize as an ORM for database interactions. The project is structured to support scalable development and maintainability.

## Features

- **TypeScript** for type safety and better developer experience.
- **Express.js** for building robust APIs.
- **Sequelize** ORM for database management.
- Organized project structure with separate folders for configurations, migrations, seeders, and source code.
- Pre-configured with ESLint and Prettier for code linting and formatting.

## Project Structure

```
.
├── .vscode/             # Visual Studio Code settings
├── config/              # Configuration files for different environments
├── migrations/          # Sequelize migration files
├── seeders/             # Sequelize seed files
├── src/                 # Source code
│   ├── controllers/     # Route controllers
│   ├── models/          # Sequelize models
│   ├── routes/          # API routes
│   └── index.ts         # Entry point of the application
├── .gitignore           # Git ignore file
├── .prettierrc          # Prettier configuration
├── index.ts             # Main entry file
├── package.json         # NPM dependencies and scripts
├── tsconfig.json        # TypeScript configuration
└── README.md            # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (v14 or above)
- NPM or Yarn
- A relational database (e.g., PostgreSQL, MySQL)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/MihirVaze/electro.git
   cd electro
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root directory and add your environment-specific variables.

4. **Run database migrations**

   ```bash
   npx sequelize-cli db:migrate
   ```

5. **Seed the database (optional)**

   ```bash
   npx sequelize-cli db:seed:all
   ```

6. **Start the application**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The server will start on `http://localhost:3000` by default.

## Scripts

- `npm run dev` - Starts the development server with nodemon.
- `npm run build` - Compiles TypeScript into JavaScript.
- `npm start` - Starts the compiled JavaScript application.
- `npm run lint` - Runs ESLint to lint the codebase.
- `npm run format` - Formats the code using Prettier.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
