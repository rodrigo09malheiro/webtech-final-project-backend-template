# Project Information

## Group Members

- Student 1: Rodrigo Fernandes Malheiro

## Project Theme

GameDex — personal video game catalog and tracking application

## External API Used

- API name: RAWG Video Games Database API
- API link: https://rawg.io/apidocs
- Requires API key? Yes (consumed by the frontend; the backend only stores the user's associations with games)

## Frontend Repository

- Link: https://github.com/rodrigo09malheiro/ProjetoFinal_TW_33103.git

## Entities

1. User
2. Favorite
3. Wishlist
4. Review

## Main Features

1. User authentication (register/login) with JWT and bcrypt password hashing
2. CRUD endpoints for favorites, wishlist and reviews, scoped to the authenticated user
3. Profile management (update username, upload avatar)

## Endpoints

- POST /api/auth/register
- POST /api/auth/login
- PUT /api/profile
- GET /api/favorites
- POST /api/favorites
- DELETE /api/favorites/:gameId
- GET /api/wishlist
- POST /api/wishlist
- DELETE /api/wishlist/:gameId
- GET /api/reviews
- GET /api/reviews/:gameId
- POST /api/reviews

## Notes

Backend built with Node.js, Express and SQLite. Authentication via JWT (Bearer token in the Authorization header). All