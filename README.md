# API for Authentication

- This is a readme with all routes

## Auth Routes

### POST ```/api/v1/auth/login```

- method must include a user and password
- method return a BASE64 token with this information:
- ```{ "name": ..., "email": ..., "roles": ..., "expiration":... }```

```

{
  "users": [
    {
      "name": "Carlos",
      "email": "Carlos@gmail.com",
      "password":"202772552",
      "password_second":"202772552",
      "cellphone": "62862833"
    },
    {
      "name": "Carlitos",
      "email": "Carlitos@gmail.com",
      "password":"20277255",
      "password_second":"20277255",
      "cellphone": "62862833"
    }
    ]
}

```

