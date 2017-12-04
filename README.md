[![Build Status](https://travis-ci.org/mrkingz/Events-Manager.svg?branch=develop)](https://travis-ci.org/mrkingz/Events-Manager)
[![Coverage Status](https://coveralls.io/repos/github/mrkingz/events-manager/badge.svg?branch=develop)](https://coveralls.io/github/mrkingz/events-manager?branch=develop)

# Events-Manager

Application for managing event centers. This app provides functionalities that help an event center manager to manage users applications to use any of the centers he or she manages. As the manager, he has the administrative privilege of the app to either decline events if the proposed date is not available or suggest an available date.

Live at https://mrkingz.github.io/Events-Manager/template/index.html

# Features

User signup and signin pages
A page where an authenticated user can add a new event
A page, section or view where an authenticated user can Modify the event he/she added
A page, section or view where an authenticated user can Delete the event he/she added
A page where an admin can add a new center
A page, section or view where an admin can modify the details of a center
A page showing the details of a center and the events slated for that center



## Application Features
* Admin can add an event center
* Admin can edit details of an event center
* Admin can delete event center
* Admin can approve users application to use any of the event center
* Admin can cancel users application to use any of the event center
* Admin can view a list of event centers
* Admin and users can view a list of all available event dates
* Admin and users can view a list of all booked event dates
* Users can create accounts on the application
* Users can search for event centers by name only
* Users can search for event centers by location only
* Users can search for event centers by name and location
* Users can login to use the accessible features provided
* Users can create new event, applying to use any of the event centers
* Users can edit their event detals
* Users can delete their events
* Users can get a list of all event centers they have created
* Users can view all event centers created by the admin


## Technology Stack
* NodeJS
* Express
* Sequelize ORM
* Postgresql Relational Database
* Bootstrap 4

## Getting Started
* Install **NodeJs** and **Postgresql** (PGAdmin 4 preferably) locally on your machine or signup to an online hosted database e.g ElephantSql
* Clone the repository from bash or windows command
```sh
> $ `git clone https://github.com/mrkingz/Events-Manager.git
```

* Change into the directory
```sh
> $ `cd /event-manager`
```
* Install all required dependencies with
```sh
> $ `npm install`
```
* After successful installation, create a `.env` file which will be used to load environment variables **see sample below**
* Create a databse to be used with application
```
- DB_USERNAME = your database username
- DB_NAME = your database name
- DB_PASSWORD = your password
- DB_HOST = "127.0.0.1"
- DB_DIALECT = "postgres"
- ISSUER = Your token issuer
- SUBJECT = Your token subject
- SECRET_KEY = Your token secret key
- EXPIRATION = Your token expiration

```
* Migrate your database schema using
```sh
> $ `npm run migrate:dev`
```
* To start the application
```sh
> $ npm run start:dev
> babel-node ./bin/www
> Server started at port 5000

```
## Using the Application
#### Routes
* POST `api/v1/users/` for creation of new account. Required fields are:
  - `username` Username containing alphabets and numbers only, mininmum of three characters
  - `email` A valid email address of the new user
  - `password` Password mininmum character length of 8 and must contain at least an alphabet and a digit

  * POST `api/v1/users/login` for logging in to the application. Required fields are:
  - `username` Username of registered user
  - `password` Password of registered user

* POST `api/v1/users/login` for logging in to the application. Required fields are:
  - `username` Username of registered user
  - `password` Password of registered user

* POST `api/v1/centers` for adding new event centers by admin. Required fields are:

  - `name` Name of the event center
  - `capacity` Capacity of the event center
  - `price` Price of the event center
  - `location` Location of the event center
  - `address` Address of the event center
  - `availability` Address of the event center
  - `description` Description of the event center

* PUT `api/v1/centers/:centerId` for updating an event centers by admin. Required fields are:

  - `name` Name of the event center (optional)
  - `capacity` Capacity of the event center (optional)
  - `price` Price of the event center (optional)
  - `location` Location of the event center (optional)
  - `address` Address of the event center (optional)
  - `availability` Address of the event center (optional)
  - `description` Description of the event center (optional)

   ### Note:
  ```sh
    When availability of a center is updated, event's approval get updated accordingly
    -e.g., if availability is set to true, the slated event on that date gets cancelled
  ```
  
* GET `api/v1/centers` for viewing all event centers

* GET `api/v1/centers/:centerId` for viewing a single event centers

* GET `api/v1/centers?name=value` for searching event centers by name

* GET `api/v1/centers?location=value` for searching event centers by location

* GET `api/v1/centers?name=value&location=value` for searching event centers by name and location

* POST `api/v1/events` for adding new events by users. Required fields are:
  - `title` Tile of the event
  - `date` Slated date for the event
  - `time` Slated time for the event
  - `centerId` the id of the event center
  - `estimatedGuests` Number of estimated guests for the event
  - `approval` Approval status of the event to use the event center
  - `description` Description of the event 

* PUT `api/v1/centers/:centerId` for updating an event centers by admin. Required fields are:
  - `title` Tile of the event (optional)
  - `date` Slated date for the event (optional)
  - `time` Slated time for the event (optional)
  - `centerId` the id of the event center (optional)
  - `estimatedGuests` Number of estimated guests for the event (optional)
  - `description` Description of the event (optional)

* GET `api/v1/events` for viewing all events

* GET `api/v1/events/:eventId` for viewing a single event

* GET `api/v1/events?approval=true` for viewing all approved events

* GET `api/v1/events?approval=false` for viewing all proposed but not yet approved events

* DELETE `api/v1/events/:eventId` for deleting an event

## Testing
* Create a test database and name it travis
* Run Test `$ npm run tests`

## Application Limitations
* Only one admin can exist
* Only a user with admin privilege can create a center
* Users can only create account once with their username and  email
* Users will have to obtain a fresh token after 48 hours when their session has expired
* Users will only be able to access the full application functionalities only if they are logged in

## How To Contribute
* Fork the repository
* Create a feature branch with a feature.md file
* Write tests and make them pass
* Open a pull request


