# Node js | React js Chat App

## Use case

- Open two tabs (one in private mode) or one tab on two diffrent browsers, then create two users (registration page). 

- There is one global chat room, and private chat rooms. Clicking on an online user opens a private chat room. 

- Sharing images is possible. I used `cloudinary` for its free tier.

## Docker deployment

Start the app

```bash
   docker-compose up -d --build
```

Stop the app and remove everything

```bash
   docker-compose down --rmi all -v
```

- App will be on [http://localhost:5173]
- Api documentation [http://localhost:5000/api-docs]


## Run Locally

Clone the project

Go to the project directory

```bash
  cd chat-app
```

### Backend

```bash
  cd backend
```

Install dependencies

```bash
  npm install
```

Start backend

```bash
  npm run start
```

### Frontend

```bash
  cd frontend
```

Install dependencies

```bash
  npm install
```
Start in dev mode

```bash
  npm run dev
```
Build the app

```bash
  npm run build
```