# chat-restapi

This is a REST API for a chat backend. You can do the following request:

#### Health Check

- **Description:** Check the health of the system.
- **URL:** /check
- **Method:**`POST`
- **Response sample:**
    Code: 200
    Content: `{ "health": "ok" }`

#### Create a new User

- **Description:** Create a user in the system.
- **URL:** /users
- **Method:**`POST`
- **URL Params:**
   **Required:**
   `username=[string]`
   `password=[string]`
- **Response samples:**
    Code: 200
    Content:
```
{ "id": 0 } // User ID of the newly created user.
```
    
#### Login

- **Description:** Log in as an existing user.
- **URL:** /login
- **Method:**`POST`
- **URL Params**
   **Required:**
   `username=[string]`
   `password=[string]`
* **Response samples:**
    Code: 200
    Content: 
```
{ 
    "id": 0, // User ID of the user who logged in.
    "token": "string"  // Authentication token to use for API calls on behalf of this user.
}
```

#### Send a Message

* **Description** Send a message. You can send three type of message: text, image and video
* **URL** /messages
* **Method:**`POST`
* **URL Params**
   **Required:** 
   `sender=[string]`
   `recipient=[string]`
   `content=[object]`
```
// Text message payload
{ 
    "sender": 0,
    "recipient": 0,
    "content": {
        "type": "string",
        "text": "string"
    }
}

// Image message payload
{ 
    "sender": 0,
    "recipient": 0,
    "content": {
        "type": "string",
        "url": "string",
        "height": 1,
        "weight": 1
    }
}

// Video message payload
{ 
    "sender": 0,
    "recipient": 0,
    "content": {
        "type": "string",
        "url": "string",
        "source": "string" (Enum: "youtube" "vimeo")
    }
}
```
* **Response samples:**
    Code: 200
    Content:
```
{
    "id": 0,
    "timestamp": "2019-08-24T14:15:22Z"
}
```
       
#### Get Messages

* **Description** Fetch all existing messages to a given recipient, within a range of message IDs.
* **URL** /messages
* **Method:**`GET`
* **URL Params**
   **Required:**
   `recipient=[integer]`
   `start=[integer]` 
   **Optional:**
   `limit=[integer]`
* **Success Response:**
    Code: 200
    Content: 
```
{ 
  "messages": [{
      "id": 0,
      "timestamp": "2019-08-24T14:15:22Z",
      "sender": 0,
      "recipient": 0,
      "content": {
          "type": "string",
          "text": "string"
        }
    }]
}
```

### Prerequisites

- Installed Nodejs >= v8.x
- Complete .env file with the following required global variables:

`DATABASE_USER`
`DATABASE_PASSWORD`
`JWT_SECRET_KEY`

### How to run it

```
npm start
```

### Possible improvements
- Add validation between the sender user and the sent token in the request when sending messages.
- Add different types of messages' searches. For example, by type, by sender, etc.
