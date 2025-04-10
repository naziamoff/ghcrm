# Google Drive Uploader

A simple tool to upload multiple files to Google Drive and view the uploaded files.

## Technologies Used

- TypeScript (for type-safe development in both the backend and frontend)
- NestJS (for building the backend API)
- React (for the frontend user interface)
- MongoDB (for storing session data)
- Prisma (for simplified migration and querying)
- PostgreSQL (for storing data related to file uploads)
- Docker (for easy setup and deployment)
- Github API (for fetching repo data)

## Setup Instructions

### 1. Clone the repository:

```bash
git clone https://github.com/naziamoff/ghcrm.git
```

Open the repository.

### 2. Create .env files

You'll need to do that in `/`, `/api`, and `fe` folders.
Copypaste corresponding .env.template files afterward.

### 3. Get Mail credentials:

I used my gmail account for it, so I'll provide step by step instruction for this provider.

#### 3.1. Enable 2FA (you can skip this step if already enabled)

- Navigate to [Security tab of your Google account](https://myaccount.google.com/security)
- Find 2FA setting and follow the instructions

#### 3.2 Obtain the app password

- Navigate to [App passwords page of your google account](https://myaccount.google.com/apppasswords)
- Type the name of the app (I called it ghcrm but it doesn't matter) and generate the password
- Copy the password

#### 3.3. Use the password

- Set the copied password in `/api/.env` as `MAIL_PASSWORD`
- Use your email as `MAIL_LOGIN`

### 4. Get PostgreSQL credentials:

I used free DB Hosting from [Neon.tech](https://neon.tech/).
You need to sign up/in and create a project. Clicking on the Connect button will show the necessary data for env
variables:

````
POSTGRES_USER=your-postgres-user
POSTGRES_PASSWORD=your-postgres-password
POSTGRES_DB=your-postgres-db
DATABASE_URL=your-database-url
````

You might also need to migrate the database, since there are some migrations already present.

### 5. Run the project using Docker Compose:

Once you've set up your `.env` file, you can start the application:

```bash
docker-compose up --build
```

### 6. Open `http://localhost:3000`

### 7. Enjoy (only if you find it enjoyable)
