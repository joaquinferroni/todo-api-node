# Todo List API - NodeJS RESTful Application

This repository contains a NodeJS RESTful API that serves as a todo-list management system. The API allows users to create, read, update, and delete tasks in their personal task list. This README provides information on how to set up the application, access Swagger documentation for API endpoints, and run tests for quality assurance purposes.

## Prerequisites:
- NodeJS (version 12 or higher) installed on your machine
- A GitHub account (to clone this repository)
- MySQL database with a user created to access it

Steps to set up the application:

1. Clone the repository: `git clone https://github.com/joaquinferroni/todo-api-node.git`
2. Navigate to the project directory: `cd todo-app`
3. Install dependencies using npm: `npm install`
4. update config.js file inside dao folder with your db information:
5. Start the application: `npm run start`
6. The API will now be running on http://localhost:3000 by default. You can access it using a REST client like Postman or Insomnia.

Swagger documentation location:
- Visit http://localhost:3001/doc to view the Swagger UI for this application, which provides detailed information on all available API endpoints and their usage.

Running tests:
- To run the test suite, execute `npm run test` in your terminal. This will run Jest, a testing framework for NodeJS applications, to ensure that the code is functioning as expected. The results of the tests will be displayed in your terminal.