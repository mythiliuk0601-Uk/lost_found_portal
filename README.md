# Campus Lost & Found Portal

A small full-stack college lost-and-found portal using React, Spring Boot, MongoDB, and JWT authentication.

## Run it

### Backend
1. Install Java 17+ and Maven.
2. Set `MONGODB_URI` to your MongoDB Atlas connection string. `MONGODB_DATABASE` is optional.
3. From `backend`, run:

```bash
mvn spring-boot:run
```

The API runs at `http://localhost:8080`.

### Frontend
1. Install Node.js 18+.
2. From `frontend`, run:

```bash
npm install
npm run dev
```

Open the Vite URL shown in the terminal, usually `http://localhost:5173`.

## API endpoints

- `POST /api/auth/register` - create a user
- `POST /api/auth/login` - receive a JWT
- `GET /api/items` - list items; supports `search`, `category`, and `type`
- `GET /api/items/{id}` - get one item
- `POST /api/items/lost` - create a lost report (JWT)
- `POST /api/items/found` - create a found report (JWT)
- `GET /api/items/my-reports` - current user's reports (JWT)
- `PATCH /api/items/{id}/returned` - mark an item returned (JWT)

For Atlas, use a connection string like `mongodb+srv://user:password@cluster.mongodb.net/campus_lost_found` and whitelist the development machine IP in Atlas Network Access.
