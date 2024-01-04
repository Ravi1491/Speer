# Speer Assignment

## Project Description

The Project Name is a secure and scalable RESTful API designed to manage notes for users. The application allows users to create, read, update, and delete notes, as well as share them with other users. Additionally, users can search for notes based on keywords.

### Key Features

- **User Authentication:** Users can sign up for a new account and log in to access their personalized notes.
- **CRUD Operations:** Create, Read, Update, and Delete notes functionalities for authenticated users.
- **Note Sharing:** Users can share their notes with other registered users.
- **Search Functionality:** Enables users to search for notes based on keywords.
- **Security Measures:** Implementation of secure authentication and authorization mechanisms.
- **Rate Limiting and Throttling:** Handles high traffic by incorporating rate limiting.

### Technical Stack

- **Framework:** Express
- **Database:** Postgres
- **ORM:** Sequelize
- **Authentication:** JWT

## Configuration

1. Create a `.env` file in the project root with the following variables:

### App_env The environment in which the application is running

```
 NODE_ENV=development
```

### Port for the server to run on

```
 PORT=4000
```

### Database connection details

```
DB_DIALECT= # The dialect of the database server
DB_HOST= # The hostname of the database server
DB_PORT= # The port number on which the database server is listening
DB_USERNAME= # The username of the database user
DB_PASSWORD= # The password of the database user
DB_NAME= # The name of the database
```

### JSON Web Token secret for authentication

```
JWT_SECRET= # jwt secret key
```

## Running the Server

Execute the `npm run start:dev` command to run the server. The application will be accessible at `http://localhost:4000`.

## Testing

Execute the `npm run test` command to run the test suite.
