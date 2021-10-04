# be-app-vanngoctan
A study project which is using **Nodejs** for back-end and **React** for front-end. Database is MySQL.

# Init and Run Project
## 1. Donwload Project
- Access https://github.com/vanngoctan/be-app-vanngoctan to download project.
- Extract the ZIP file and access folder **be-app-vanngoctan-main**
## 2. Server
- Access to folder **Server**
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
- Back to folder **Server** and run command to install the dependecies
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
