# Jammer - Jam with musicians near you

This was created during my time as a student at Code Chrysalis.

## Table of Contents

1.  [Introduction](#introduction)
1.  [Installation](#installation)
1.  [API](#API)
1.  [Resources](#resources)

## Introduction

Leftovers is a web app that allows users to make a list of the food they currently have in their fridge and get recipes based on that. It is also possible to use the searchbar on the landingpage, without signing up for an account. The purpose of Leftovers is to reduce food waste, by giving people inspiration to cook dishes with the food they already have at home.

Note that it is required to have Postgres installed to run this project, and to have an API Key for the [Edamam API](https://developer.edamam.com/)

## Installation

Run `yarn` to install all dependencies.

Create a file named `.env`, where you will put all the database credentials and your API key and API ID. Copy and paste the following contents into the `.env` file and fill out the `YOURVALUE` with your own credentials:

```
REACT_APP_API_KEY=YOURVALUE
REACT_APP_API_ID=YOURVALUE
HOST=localhost
PORT=3000
PGDATABASE="leftovers"
PGHOST=localhost
PGPORT=5432
DBUSER=YOURVALUE
PGPASSWORD=YOURVALUE 
SECRET=YOUREVALUE
```
Run `yarn createDatabase` to create the leftovers database.

Run `yarn migrate` to migrate the users and food_items tables to your newly created database.

Run `yarn seed` to seed the database with test users and food items.

Run `yarn server` to get the backend server running.

Run `yarn start` to get the frontend server runnning.

If necessary run `yarn rollback` to drop the tables.


## API

The Leftovers API is used to make CRUD operations on the database. The tables contains following fields:

- users table
  - id
  - username
  - password
  - created_at

- food_items table
  - id
  - user_id
  - item
  - quantity
  - created_at



The API exposes the following operations:

### Endpoints

#### User:

GET `/api/users/:id`: Returns a specific user from the database based on the users id.

POST `/api/users/`: Created a new user with the username and password provided in the body

PATCH `/api/users/:id`: Updates a username or password with the values provided in the body. The user is found by id.

DELETE `/api/users/:id`: Deletes a user based on id.


#### Food:

GET `/api/users/:id/food/`: Returns a list of food belonging to the user. The food is found based on the user's id.

POST `/api/users/:id/food/`: Created a new food item belonging to user with the provided id. The request must include item. Quantity is optional

PATCH `/api/users/:id/food/:foodId`: Updates a food item by quantity or item. The food item is found based on food id.

DELETE `/api/users/:id/food/:foodId`: Deletes a food item based on food id.


#### Recipes

GET `/api/recipes`: Returns a list of recipes that match the list of food provided in the body.



## Resources

- [React Documentation](https://reactjs.org/)
- [React-Redux Documentation](https://react-redux.js.org/)
- [Postgres Documentation](https://www.postgresql.org/docs/)
- [Knex Documentation](http://knexjs.org/)
- [Express v4.x Documentation](https://expressjs.com/en/api.html)
- [Edamam API](https://developer.edamam.com/)

