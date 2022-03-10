
# CNAB-Project
A small platform containing formatted data about a CNAB file.

The App uses /login as its main route.
This project uses Github 0Auth2 to authenticate in the App and API




## Running locally

Clone o projeto

```bash
  git clone https://github.com/gabholanda/desafio-dev
```

Enter App folder

```bash
  cd cnab-app/
```

Install dependencies

```bash
  npm install
```

Enter API folder

```bash
  cd API/
```

Install dependencies

```bash
  npm install
```

Initialize API for the first time with:

```bash
  npm run dev => this will create databases and populate TransactionTypes table
```


Go back to App folder and run:

```bash
  npm start
```

If you wish to use docker compose just go to API folder and run (You need docker daemon/service running for this):
 
 ```bash
  docker-compose up
```

API standard URL: http://localhost:3000

App standard URL: http://localhost:3001


## API Documentation

#### Return all transactions

```http
  GET /document/transactions
```

#### Return a cnab document specified by shopName in query (**Required**: OAuth authentication session token inside the request)

```http
  GET /document/getSingleCompanyDocs?shopName=SomeShopName
```

| Parâmetro   | Tipo       | Description                                   |
| :---------- | :--------- | :------------------------------------------ |
| `shopName`    | `string` | Name of the shop(Request query)

#### Return all cnab documents (**Required**: OAuth authentication session token inside the request)

```http
  GET /document/getAllDocs
```

#### Return a list of shopNames from cnab documents grouped by shopName(**Required**: OAuth authentication session token inside the request)

```http
  GET /document/getGroupedDocs
```

#### Accepts a cnab.txt file to create new cnab documents (**Required**: OAuth authentication session token inside the request)

```http
  POST /document/upload
```

| Parâmetro   | Tipo       | Description                                   |
| :---------- | :--------- | :------------------------------------------ |
| `parser`    | `string` | Type of file parser (Request body)
| `file`    | `formData` | file to save new documents

#### Github Oauth2 login route

```http
  POST /auth/login
```

#### Github Oauth2 callback route (this route will redirect to the App and save the session)

```http
  POST /auth/callback
```

#### Logout Route will delete session

```http
  POST /auth/logout
```

#### Loggedin Route check if user is authenticated

```http
  POST /auth/loggedin
```





## API Environment variables 
go to Authorized Auth Apps https://github.com/settings/applications

`HOST='localhost'`

`USER=YOUR_POSTGRES_USERNAME`

`DATABASE=YOUR_POSTGRES_DATABASE`

`PASSWORD=YOUR_POSTGRES_PASSWORD`

`DB_PORT=5432`

`DB_DIALECT = postgres`

`CLIENT_ID=YOUR_CLIENT_ID_FROM_GITHUB`

`CLIENT_SECRET=YOUR_CLIENT_SECRET_FROM_GITHUB`

`CALLBACK_URL=http://localhost:3000/auth/callback`

`REDIRECT_URL=http://localhost:3001/`

`JWT_SECRET_KEY=YOUR_GENERATED_JWT_TOKEN`


## App Envinroment variables

`PORT=3001`

`REACT_APP_API_URL=http://localhost:3000`

## Docker Compose variables

Edit envinroment variables in API/docker-compose.yml

## Stack

**Front-end:** ReactJS

**Back-end:** Node, Express, Sequelize with Postgres, Passport

