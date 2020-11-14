**SIGN IN**
----
  return access_token

* **Data Headers**

  NONE

* **URL**

  /users/signIn

* **Method:**

  `POST`
  
* **URL Params**

  NONE

* **Data Params**

  `email=[string]`,
  `password=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IndlMnkudGFuc2lsQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYwNTM0MjA5OX0.lsR_FG1mHiKB8jZ3_JSHQ_L9s_6kPju-TaevLio9JYc"
    }`
 
* **Error Response:**

  * **Code:** 401 <br />
    **Content:** `email/password is invalid`

  OR

  * **Code:** 500 <br />
    **Content:** `internal server error`

------------------------------------------------------------

**CREATE PRODUCT**
----
  return json data of one new additional row and message

* **Data Headers**

    '{
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IndlMnkudGFuc2lsQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYwNTM0MjA5OX0.lsR_FG1mHiKB8jZ3_JSHQ_L9s_6kPju-TaevLio9JYc"
    }`

* **URL**

  /products

* **Method:**

  `POST`
  
* **URL Params**

  NONE

* **Data Params**

  `name=[string]`,
  `img_url=[string]`,
  `price=[number]`,
  `stock=[number]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "result": {
        "id": 7,
        "name": "Books",
        "img_url": "askakdakds",
        "price": 100000,
        "stock": 10,
        "updatedAt": "2020-11-14T08:31:10.394Z",
        "createdAt": "2020-11-14T08:31:10.394Z"
    },
    "msg": "Successfully created"
    }`
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `((can be one of these))` `stock should be at least 1, name should not be empty, image should not be empty, price should not be empty, stock should not be empty, price should be greater than 0, stock should be at least 1`

  OR

  * **Code:** 401 <br />
    **Content:** `Authentication Failed`

  OR

  * **Code:** 500 <br />
    **Content:** `internal server error`

------------------------------------------------------------

**READ ALL PRODUCTS**
----
  return all json data and message

* **Data Headers**

  '{
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IndlMnkudGFuc2lsQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYwNTM0MjA5OX0.lsR_FG1mHiKB8jZ3_JSHQ_L9s_6kPju-TaevLio9JYc"
    }`
  
* **URL**

  /products

* **Method:**

  `GET`
  
* **URL Params**

  NONE

* **Data Params**

  NONE

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "result": [
        {
            "id": 5,
            "name": "Jack Daniels",
            "img_url": "https://i.ibb.co/rt9FpcR/K5-9243-jack-daniels-product-shot.jpg",
            "price": 142000,
            "stock": 32,
            "createdAt": "2020-11-14T06:15:13.632Z",
            "updatedAt": "2020-11-14T06:15:13.632Z"
        }
    ],
    "msg": "Read successfully"
}`
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{ error : "INTERNAL SERVER ERROR" }`

------------------------------------------------------------

**READ PRODUCT BY ID**
----
  return products json data filtered by id and message

* **Data Headers**

  `{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoid2UyeS50YW5zaWxAZ21haWwuY29tIiwiaWF0IjoxNjAzODE3NTQ0fQ.sHZWSmO4t6xp4BiAWrQSXx182foRtMhEVtabHdyoU14"
  }`
  

* **URL**

  /products/id

* **Method:**

  `GET`
  
* **URL Params**

  `id=[integer]`

* **Data Params**

  NONE

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "result": [
        {
            "id": 5,
            "name": "Jack Daniels",
            "img_url": "https://i.ibb.co/rt9FpcR/K5-9243-jack-daniels-product-shot.jpg",
            "price": 142000,
            "stock": 32,
            "createdAt": "2020-11-14T06:15:13.632Z",
            "updatedAt": "2020-11-14T06:15:13.632Z"
        }
    ],
    "msg": "Read successfully"
    }`
 
* **Error Response:**

  * **Code:** 401 <br />
    **Content:** `Authentication Failed`

  OR

  * **Code:** 500 <br />
    **Content:** `internal server error`

------------------------------------------------------------

**UPDATE PRODUCT**
----
  return message to indicate your successfully updated data

* **Data Headers**

  `{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoid2UyeS50YW5zaWxAZ21haWwuY29tIiwiaWF0IjoxNjAzODE3NTQ0fQ.sHZWSmO4t6xp4BiAWrQSXx182foRtMhEVtabHdyoU14"
  }`
  

* **URL**

  /products/:id

* **Method:**

  `PUT`
  
* **URL Params**

  `id=[integer]`

* **Data Params**

  `name=[string]`,
  `img_url=[string]`,
  `price=[number]`,
  `stock=[number]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "msg": "Update successfully"
    }`
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `((can be one of these))` `stock should be at least 1, name should not be empty, image should not be empty, price should not be empty, stock should not be empty, price should be greater than 0, stock should be at least 1`

  OR

  * **Code:** 401 <br />
    **Content:** `Authentication Failed`

  OR

  * **Code:** 401 <br />
    **Content:** `Not Authorized`

  OR

  * **Code:** 500 <br />
    **Content:** `internal server error`


------------------------------------------------------------

**DELETE TODO**
----
  return message to indicate your successfully deleting data

* **Data Headers**

  `{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoid2UyeS50YW5zaWxAZ21haWwuY29tIiwiaWF0IjoxNjAzODE3NTQ0fQ.sHZWSmO4t6xp4BiAWrQSXx182foRtMhEVtabHdyoU14"
  }`
  

* **URL**

  /todos/:id

* **Method:**

  `DELETE`
  
* **URL Params**

  `id=[integer]`

* **Data Params**

  NONE

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "msg": "Delete successfully"
    }`
 
* **Error Response:**

  * **Code:** 401 <br />
    **Content:** `Authentication Failed`

  OR

  * **Code:** 401 <br />
    **Content:** `Not Authorized`

  OR

  * **Code:** 500 <br />
    **Content:** `internal server error`

