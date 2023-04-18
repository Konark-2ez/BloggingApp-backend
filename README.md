
# BloggingApp-Backend

This is a backend developed for a Blogging site using nodejs, expressjs and mongoDB. It has several routes mainly divided into two parts- 1) User Route , 2) Blog Route. 
 


## Installation

Install dependencies with npm

```bash
  npm install express,nodemon,dotenv,mongoose,bcrypt,jsonwebtoken
```

    
## Running Tests

To run tests, run the following command

```bash
  npm run server
```
after that postman or thunder client can be used to run the API's


## API Reference

#### Register users

```http
 POST /users/register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `http//:localhost:3000/users/register` | `string` | **Required**. This will help to register users and save it to database. |

#### Login users

```http
  POST /users/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| ``      | `string` | **Required**. http//:localhost:3000/users/login  this will login the user and generate a token and a refresh token.|

#### Logout

```http
  POST /users/logout
```

T| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| ``      | `string` | **Required**. http//:localhost:3000/users/logout  this will logout the user and store the token in blacklist.|

#### Post blogs

```http
  POST /blogs/post
```

T| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| ``      | `string` | **Required**. http//:localhost:3000/blogs/post  this will post new blogs and save it to database.|

#### get blogs

```http
  GET /blogs/get
```

T| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| ``      | `string` | **Required**. http//:localhost:3000/blogs/get  this will get all the post the user has created and display it.|

#### update blogs

```http
  PATCH /blogs/update/${blogID}
```

T| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| ``      | `string` | **Required**. http//:localhost:3000/blogs/update/${blogID}  this will update  the post the user has created using the id of the blog and display it.|

#### update blogs

```http
  DELETE /blogs/delete/${blogID}
```

T| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| ``      | `string` | **Required**. http//:localhost:3000/blogs/delete/${blogID}  this will delete  the post the user has created using the id of the blog.|

#### update blogs

```http
  DELETE /blogs/deleteMod/${blogID}
```

T| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| ``      | `string` | **Required**. http//:localhost:3000/blogs/deleteMod/${blogID}  this will delete  the post the user has created using the id of the blog.It is only accessible by Moderator|


