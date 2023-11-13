## Stack
- Express.js
- TS
- Prisma
- Mysql

## Environment Variables
- DATABASE_URL

### Set the database url in the .env file
```bash
DB_HOST=localhost
DB_PORT=3306
DB_USER=test
DB_PASSWORD=test

DATABASE_URL="mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/test?schema=public"
```
