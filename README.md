## WALLACLONE BACKEND - DOCUMENTATION  [ v.1.0.0 ] 
-----------------------

### BASE URLs :
  - /api/adverts
  - /api/users

### USER AUTHORIZATION OPERATIONS:
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

### USER OPERATIONS 
- GET <br>
    - / (get my own user) (jwt required in header "Authorization")
    - /:nickname (get specific user) (jwt required in header "Authorization")
    - /getUserImage (get user avatar) (jwt required in header "Authorization")
- POST <br>
    - /userImage (post by form-data a user avatar) (jwt required in header "Authorization")
        - params {photo} <b>required</b>
- DELETE <br>
    - /deleteuser (delete specific user) (jwt required in header "Authorization")
- PUT <br>
    - /updateuser (update specific user info) (jwt required in header "Authorization")
        - params { name, surname, email } <b>optionals</b>

### ADVERTS OPERATIONS:
- GET<br>
    - / (get all adverts)
        - params { name, status, minPrice, maxPrice, tags, skip, limit, sort } <b>optional</b>
    - /:id (get advert by id)
    - /getMyAdverts (get my owns adverts) (jwt required in header "Authorization")
    - /getFavorites (get favorites to an specific user) (jwt required in header "Authorization")
    - /getMyFavoriteAdverts (get my owns favoirtes) (jwt required in header "Authorization")
    - /tags (get all tags availables) 
- DELETE<br>
    - /delete/:id (delete advert by id) (jwt required in header "Authorization")
    - /deleteImage/:advertId/:imageName (delete single image) (jwt required in header "Authorization")
- POST<br>
    - / (jwt required in header "Authorization")
        - params { name, status, price, tags, userId } <b>required</b> { photo } <b>optional</b>
    - /addFavorite (jwt required in header "Authorization")
        -  params { userId, productId } <b>required</b>
    - /removeFavorite (jwt required in header "Authorization")
        -  params { userId, productId } <b>required</b>
- PUT<br>
    - /updateAdvert (jwt required in header "Authorization")
        -  params { name, status, price, tags, productId } <b> required </b> { photo } <b>optional</b>
