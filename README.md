## WALLACLONE BACKEND - DOCUMENTATION  [ v.1.0.0 ] 
-----------------------

### BASE URLs :
  - /api/adverts
  - /api/users

### USER OPERATIONS :
- POST<br>
    - /login
        - params { email, password } <b>required</b>
        - response { msg: "Token Created", token: "token" }
- POST<br>
    - /register
        - params { name, username, email, password } <b>required</b>
        - response { msg: "User and Token Created", user: { new user }, token: "token" }
- POST<br>
    - /logout
        - params {}
        - response { result: true }

- POST<br>
    - /recoverpassword
        - params { email } <b>required</b>
        - response { }

- POST<br>
    - /resetpassword
        - params { newPassword, confirmNewPassword }
        - response {  }

### ADVERTS OPERATIONS:
- GET<br>
    - / (get all adverts)
        - params { name, status, minPrice, maxPrice, tags, skip, limit, sort } <b>optional</b>
- GET<br>
    - /:id (get advert by id)
- DELETE<br>
    - /delete/:id (delte advert by id) (jwt required in header "Authorization")
- POST<br>
    - / (jwt required in header "Authorization")
        - params { name, status, price, tags, userId } <b>required</b> { photo } <b>optional</b>
    - /addFavorite (jwt required in header "Authorization")
        -  params { userId, productId } <b>required</b>
    - /removeFavorite (jwt required in header "Authorization")
        -  params { userId, productId } <b>required</b>
- PUT<br>
    - /updateAdvert (jwt required in header "Authorization")
        -  params { name, status, price, tags, userId } <b> required </b> { photo } <b>optional</b>
