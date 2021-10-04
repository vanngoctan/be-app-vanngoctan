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


