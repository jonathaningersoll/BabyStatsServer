# babystatsserver
Server side for baby stats. This is an api which provides the data and controllers for the BabyStats client to interface with.

# To Run:
You will need a PostgreSQL server to connect to in order to build the database.
BabyStats server comes with nodemon as a dev dependency, so you can just navigate to the parent folder and type ```nodemon``` to run it.

# Structure:
The BabyStats server has basic CRUD options for users, children, and childrens' logs.
The following endpoints are accessible:

## User endpoints:
```/user/register```
Method: POST
 - username: string
 - password: string
 - email: string
Create a user account. All users are initiated with the role "User" unless granted "Admin" rights by an admin.
 
```/user/login```
Method: POST
 - username: string
 - password: string
Logs in a current user updating their session token.

## Child endpoints:
```/child/```
Method: GET
Retrieves all children of the currently-logged-in user along with logs for all the children.

```/child/```
Method: POST
 - name: STRING
 - dob: DATE
 - birth_weight: NUMBER
 - birth_length: NUMBER
Creates a new child

```/child/:id```
Method: GET
 - param: (id)
Retrieves a particular child of the currently logged-in user along with all their log data.

```/child/:id```
Method: PUT
 - name: STRING
 - dob: DATE
 - birth_weight: NUMBER
 - birth_length: NUMBER
Updates a child by Id.

```/child/:id```
Method: DELETE
Deletes a child.

## Sleep Log endpoints:

```/sleeplog/```
Method: POST
 - sleep_start: DATE
 - sleep_stop: DATE
Creates a sleep log

```/sleeplog/:id```
Method: GET
Gets a particular sleep log of a child.

```/sleeplog/:id```
Method: PUT
 - sleep_start: DATE
 - sleep_stop: DATE
Updates a sleep log.

```/sleeplog/:id```
Method: DELETE
Deletes a sleep log.

## Food Log endpoints

```/foodlog/```
Method: POST
 - time_fed: DATE
 - breast: BOOLEAN
 - bottle: NUMBER
 - solid: STRING
Creates a food log

```/foodlog/:id```
Method: GET
Gets a particular food log of a child.

```/foodlog/:id```
Method: PUT
 - time_fed: DATE
 - breast: BOOLEAN
 - bottle: NUMBER
 - solid: STRING
Updates a food log.

```/foodlog/:id```
Method: DELETE
Deletes a food log.

## Diaper Log endpoints

```/diaperlog/```
Method: POST
 - time_checked: DATE
 - dirty: BOOLEAN
 - wet: BOOLEAN
 - dry: BOOLEAN
Creates a diaper log

```/diaperlog/:id```
Method: GET
Gets a particular diaper log of a child.

```/diaperlog/:id```
Method: PUT
 - time_checked: DATE
 - dirty: BOOLEAN
 - wet: BOOLEAN
 - dry: BOOLEAN
Updates a diaper log.

```/diaperlog/:id```
Method: DELETE
Deletes a diaper log.

## Growth Log endpoints

```/growthloggrowthlog/```
Method: POST
 - check_date: DATE
 - length: NUMBER
 - weight: NUMBER
Creates a growth log

```/growthloggrowthlog/:id```
Method: GET
Gets a particular growth log of a child.

```/growthlog/:id```
Method: PUT
 - check_date: DATE
 - length: NUMBER
 - weight: NUMBER
Updates a growth log.

```/growthlog/:id```
Method: DELETE
Deletes a growth log.

# Dependencies:
bcryptjs v2.4.3 [BCrypt](https://www.npmjs.com/package/bcryptjs)
cors v2.8.5 [Cors](https://www.npmjs.com/package/cors)
dotenv v5.0.1 [dotenv](https://www.npmjs.com/package/dotenv)
express v4.16.3 [express](https://www.npmjs.com/package/express)
jsonwebtoken v8.2.0 [JWT](https://www.npmjs.com/package/jsonwebtoken)
pg v^7.4.1 [PG](https://www.npmjs.com/package/pg)
pg-hstore v2.3.2 [pg-hstore](https://www.npmjs.com/package/pg-hstore)
sequelize v6.3.5 [sequelize](https://www.npmjs.com/package/sequelize)

# Construction:
The app is built on Node.js and Express. jsonwebtoken and bcrypt are used for encrypting passwords and decoding to a token. Sequelize is the ORM used to built the database in PostgreSQL. Pg and pg-hstore are also installed in order to assist with the PostgreSQL implementation.

# Contact me:
Creator:

* jonathan.ingersoll@gmail.com

Project Repository: https://github.com/jonathaningersoll/babystatsserver

# Acknowledgements:
Special thanks to [Eleven Fifty Academy](https://elevenfifty.org/) and their team of instructors and learning assistants as well as my own teammates and classmates for assisting in completing this project.
