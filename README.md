## WALLACLONE BACKEND - DOCUMENTATION  [ v.1.0.0 ] 
-----------------------

### BASE URLs :
  - /api/adverts
  - /api/users

### USER OPERATIONS :
- POST<br>
    - /login
        - params { email, password } <b>required</b>
- POST<br>
    - /register
        - params { name, username, email, password } <b>required</b>
- POST<br>
    - /logout   [ not implemented ]

### ADVERTS OPERATIONS:
- GET<br>
    - / (get all adverts)
        - params { name, status, minPrice, maxPrice, tags, skip, limit, sort } <b>optional</b>
- GET<br>
    - /:id (get advert by id)
- POST<br>
    - /addFavorite (jwt required in header "Authorization")
        -  params { userId, productId } <b>required</b>
    - /removeFavorite (jwt required in header "Authorization")
        -  params { userId, productId } <b>required</b>
