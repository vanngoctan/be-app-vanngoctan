# be-app-vanngoctan
A study project which is using **Nodejs** for back-end and **React** for front-end. Database is **MySQL**.

# Init and Run Project
## 1. Donwload Project
- Access https://github.com/vanngoctan/be-app-vanngoctan to download project.
- Extract the ZIP file and access folder **be-app-vanngoctan-main**
## 2. Server
- Access to folder **server**
```bash
cd server
```
- Create an **.env** file and config like file **.env.example**.
- Access and edit file **/config/config.json** for the information of Database Connection. We will run the server in Development mode, so please edit the development part. Don't forget to create the Database first. Here is an example:
```json
{
  "development": {
    "username": "root",
    "password": "vanngoctan",
    "database": "be-app-vanngoctan",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```
- Back to folder **server** and run command to install the dependecies
```bash
npm install
```
- Run server by this command. This step will check database and create tables if not exists.
```bash
npm start
```
- Run this command to seed data to database.
```bash
npx sequelize-cli db:seed:all
```

## 3. Client
- Access folder **client**
```bash
cd client
```
- Create an **.env** file and config like file **.env.example**.
- Back to folder **client** and run command to install the dependecies
```bash
npm install
```
- Run client by this command
```bash
npm start
```
# Features
1. Show Events and Description of Event.
2. Register user information to specific event.
3. View list users who registered to event.
4. Unsubcribe user from event or all events.
5. Edit user information (Admin only)
6. View user's events registration.

# Deployment.
- The project was uploaded to host, access via http://events.3rebooks.com
- Login by credential: email: **tanvan@example.com**  |  password: **vanngoctan**

# Task Management
This project use Trello to manage the tasks
https://trello.com/b/T4No0n3O/events

# APIs
## Public APIs
### 1. Saving users’ information to database.
* **URL**

  api_host/register/:id

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]` //Event Id

* **Data Params**

  **Required:**
  `firstName=[string]`
  `lastName=[string]`
  `email=[string][email]`
 
  **Optional**
  `workLocation=[string]`
  `hobbies=[string]`

**Security: These inputs will be santinize to prevent SQL injection.**

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ "SUCCESS" }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ errors : "User has registered this event" }`
    
* **Sample:**
```
curl --request POST \
  --url http://localhost:3001/register/1 \
  --header 'Content-Type: application/json' \
  --data '{
	"firstName": "Tan",
	"lastName": "Van",
	"email": "tanvan@example.com",
	"workLocation":"HCM"
}'
```

### 2. Getting the list of registered users from each event.
* **URL**

  api_post/view/:eventId

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `eventId=[integer]`

* **Data Params**
  none

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ 
      "result": list of users,
      "count": total users,
      "pages": total pages,
      "current": current page
    }`
     
* **Sample:**
```
curl --request GET \
  --url http://localhost:3001/view/1
```

### 3. Getting the list of registered users from each event per page.
* **URL**

  api_post/view/:eventId/page/:page

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `eventId=[integer]`
   `page=[integer]`

* **Data Params**
  none

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ 
      "result": list of users,
      "count": total users,
      "pages": total pages,
      "current": current page
    }`
     
* **Sample:**
```
curl --request GET \
  --url http://localhost:3001/view/1/page/1
```

### 4. Unsubscribing users per event.
* **URL**

  api_host/events/unsubscribe/:eventId

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
 
   `eventId=[integer]` //Event Id

* **Data Params**

  **Required:**
  `UserId=[integer]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ "SUCCESS" }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ "UserId is empty!" }`
    
* **Sample:**
```
curl --request PUT \
  --url http://localhost:3001/events/unsubscribe/1 \
  --header 'Content-Type: application/json' \
  --data '{
	"userId": 1
}'
```

### 5. Unsubscribing users from all events.
* **URL**

  api_host/events/unsubscribeall

* **Method:**

  `PUT`
  
*  **URL Params**

   none

* **Data Params**

  **Required:**
  `UserId=[integer]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ "SUCCESS" }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ "UserId is empty!" }`
    
* **Sample:**
```
curl --request PUT \
  --url http://localhost:3001/events/unsubscribeall \
  --header 'Content-Type: application/json' \
  --data '{
	"userId": 2
}
'
```

## Authenticated APIs
### 1. Authorizing

* **URL**

  api_host/auth/login

* **Method:**

  `POST`
  
*  **URL Params**

   none

* **Data Params**

  **Required:**
  `email=[string][email]`
  `password=[string]`

**Security: These inputs will be santinize to prevent SQL injection.**

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ 
    	"result" : "LOGGED IN",
	"userId" : id of admin,
	"name"   : name of admin,
	"token"  : JWT access token,
	"refreshToken" : JWT refresh token,
	"role"   : "Admin"
    }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ "User not found" }`
    
   * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ "Wrong password" }`
    
* **Sample:**
```
curl --request POST \
  --url http://api.3rebooks.com/auth/login \
  --header 'Content-Type: application/json' \
  --data '{
	"email":"tanvan@example.com",
	"password":"vanngoctan"
}'
```

### 2. Modifying user information

* **URL**

  api_host/user/edit

* **Method:**

  `POST`
 
* **Header:**

  `header 'Authorization: Baerer accessToken`
  
*  **URL Params**

   none

* **Data Params**

   **Required:**
  `userId=[integer]`
  `firstName=[string]`
  `lastName=[string]`
  `email=[string][email]`
 
  **Optional**
  `workLocation=[string]`
  `hobbies=[string]`

**Security: These inputs will be santinize to prevent SQL injection.**

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ "SUCCESS" }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ "User not found" }`
    
  * **Code:** 401 UNAUTHORIED <br />
    **Content:** `{ errors: "Token is invalid!" }`

  * **Code:** 401 UNAUTHORIED <br />
    **Content:** `{ errors: "User is not login!" }`
    
* **Sample:**
```
curl --request POST \
  --url http://localhost:3001/user/edit \
  --header 'Authorization: Baerer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRhbnZhbkBleGFtcGxlLmNvbSIsImlhdCI6MTYzMzMzOTg2NiwiZXhwIjoxNjMzMzM5ODk2fQ.AxOwMUHyuCaUphdv2vTCGgholPKC7nyv0i0s6jLlhLA' \
  --header 'Content-Type: application/json' \
  --data '{
	"userId": 3,
  "firstName": "Tan",
	"lastName": "Van",
	"email": "tanvan2@example.com",
	"workLocation": "HCM",
	"hobbies": "Read Books"
}'
```

### 3. Statistic API

* **URL**

  api_host/user/statistic

* **Method:**

  `POST`
 
* **Header:**

  `header 'Authorization: Baerer accessToken`
  
*  **URL Params**

   none

* **Data Params**

   **Required:**
  `email=[string][email]`

**Security: These inputs will be santinize to prevent SQL injection.**

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ 
    		"user": user information
		"events": list of events that user registerd
    		}`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ "User not found" }`
    
  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ "Email empty" }`
    
  * **Code:** 401 UNAUTHORIED <br />
    **Content:** `{ errors: "Token is invalid!" }`

  * **Code:** 401 UNAUTHORIED <br />
    **Content:** `{ errors: "User is not login!" }`
    
* **Sample:**
```
curl --request POST \
  --url http://localhost:3001/user/statistic \
  --header 'Authorization: Baerer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRhbnZhbkBleGFtcGxlLmNvbSIsImlhdCI6MTYzMzM0MTY5NCwiZXhwIjoxNjMzMzQxNzI0fQ.Iik-Og3FmWw2C9C6R3098sLtng-_A4HDv3kZ2maYUcc' \
  --header 'Content-Type: application/json' \
  --data '{
	"email": "Phyllis.Swift82@gmail.com"
}'
```

## Other APIs
### 1. Refresh Token

* **URL**

  api_host/auth/refreshToken

* **Method:**

  `POST`
  
*  **URL Params**

   none

* **Data Params**

  **Required:**
  `accessToken=[string]`
  `refreshToken=[string]`
  `userId=[string]`

**Security: These inputs will be santinize to prevent SQL injection.**

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ 
	"accessToken"  : JWT access token,
	"refreshToken" : JWT refresh token,
    }`
 
* **Error Response:**

  * **Code:** 403 FORBIDENT <br />
    **Content:** `{ "User not found" }`
    
* **Sample:**
```
curl --request POST \
  --url http://localhost:3001/auth/refreshToken \
  --header 'Content-Type: application/json' \
  --data '{
	"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRhbnZhbkBleGFtcGxlLmNvbSIsImlhdCI6MTYzMzI0NDkyOSwiZXhwIjoxNjMzMjQ0OTU5fQ.qxKcpeBke7mnK7fQXUx6V9NDqFR7d5uFAMfdTx9knTs",
	"refreshToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRhbnZhbkBleGFtcGxlLmNvbSIsImlhdCI6MTYzMzM0MTY5NH0.MhcA3kvjpK-oDWivXFmw4mFRVA1aBtqT9dVm3CkLLw8",
	"userId": 1
}'
```

### 2. Logout

* **URL**

  api_host/auth/logout

* **Method:**

  `PUT`
 
* **Header:**

  `header 'Authorization: Baerer accessToken`
  
*  **URL Params**

   none

* **Data Params**

   **Required:**
  `userId=[Integer]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ "LOGGED OUT" }`
 
* **Error Response:**
    
  * **Code:** 401 UNAUTHORIED <br />
    **Content:** `{ errors: "Token is invalid!" }`

  * **Code:** 401 UNAUTHORIED <br />
    **Content:** `{ errors: "User is not login!" }`
    
* **Sample:**
```
curl --request PUT \
  --url http://localhost:3001/auth/logout \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRhbnZhbkBleGFtcGxlLmNvbSIsImlhdCI6MTYzMzM0MjM1MSwiZXhwIjoxNjMzMzQyMzgxfQ.ShddLg4gIdGEqjK0S2R8AmE0KpWp6uRMfihdInd-194' \
  --header 'Content-Type: application/json' \
  --data '{
	"userId": 1
}'
```


