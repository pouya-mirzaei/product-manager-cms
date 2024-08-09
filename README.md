# SabzLearn Shop

Welcome to the **Admin panel CMS** repository! This project is a simple e-commerce application with a backend built using Node.js and a frontend built using React.js

## Table of Contents

- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Database Configuration](#database-configuration)
- [Running the Project](#running-the-project)
- [Contributing](#contributing)

## Project Structure

The repository is organized as follows:

- **frontend/**: Contains the frontend code of the application.
- **backend/**: Contains the backend code, including the API and server logic.
- **initalDatas.sql**: SQL file with initial data for the MySQL database.
- **.gitignore**: Lists files and directories that should be ignored by Git.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Required to run the backend server.
- **MySQL**: Used as the database for this project.
- **XAMPP or WAMP**: To manage the MySQL database and phpMyAdmin.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/sabzlearn-shop.git
   cd sabzlearn-shop
   ```

2. **Create the MySQL Database:**

   - Open phpMyAdmin.
   - Create a new database named `database_name`
   - Import the `sabzlearn_shop.sql` file into the your database.

3. **Install Dependencies:**

   Navigate to the backend and frontend directories and install the necessary packages.

   **For the backend**

   ```bash
   cd backend
   npm install
   ```

   **For the frontend**

   ```bash
   cd ../frontend
   npm install
   ```

## Database Configuration

Before running the backend, ensure that the database configuration is set correctly. Navigate to `backend/db/SabzLearnShop.js` and modify the connection details as necessary.

**Here is the default configuration:**

```js
const mysql = require('mysql');

const SabzlearnShopDB = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'admin-panel-cms',
});

module.exports = SabzlearnShopDB;
```

- **host**: Usually `localhost` for a local development environment.
- **user**: The MySQL username (default is `root`).
- **password**: The MySQL password (leave it as `''` if not set).
- **database**: Name of the database you've created (e.g., `database_name`).

Make sure to update the configuration if your MySQL setup differs.

## Running the Project

After installing the dependencies, you can run the backend server.

1. **Start the backend server**

   ```bash
   cd backend
   npm run dev
   ```

   This will start the backend server on the specified port.

2. **Start the Frontend**

   Open a new terminal and navigate to the `frontend` directory and run the following command:

   ```bash
   npm run dev
   ```

   This will start the frontend development server, usually accessible at http://localhost:5173

3. **Start the MySQL database**

   Make sure that your MySQL server is running
   if you are using xampp, the `Apache` and `MySQL` services should be turned on

## Contributing

Contributions are welcome! Please fork this repository, make your changes, and submit a pull request.
