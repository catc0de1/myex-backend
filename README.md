# MyEx

This project is the backend for a platform to buy and sell pre-owned items. This is just the first prototype and is expected to grow and improve over time.

---

## Endpoint

Health check:
```http
GET /
```

Get all users:
```http
GET /users
```

Create user:
```http
POST /users
```

Find user:
```http
GET /users:id
```

Edit user:
```http
PATCH /users:id
```

Delete user:
```http
DELETE /users:id
```

Sign In:
```http
POST /auth/login
```

Sign Up:
```http
POST /auth/register
```

Log Out:
```http
POST /auth/logout
```

Get all items:
```http
GET /items
```

Create items:
```http
POST /items
```

Find item:
```http
GET /items:id
```

Approval item:
```http
PATCH /items:id
```

---

## Dependencies

- [Nest](https://github.com/nestjs/nest)
- [PostgreSQL](https://www.postgresql.org/)
- [Redis](https://redis.io/)
- [TypeOrm](https://typeorm.io/)

---

## Project setup

```bash
$ pnpm install
```

Setup `.env` key for development or production.

---

## Editor setup

use `LF` for `EOL` style, run these command to fix it if use windows (CRLF).

```bash
git config --global core.autocrlf false
git config --global core.eol lf
```

change editor config if needed
```.editorconfig
[*]
end_of_line = lf
insert_final_newline = true
charset = utf-8
```

---

## Compile and run the project

```bash
# development
$ pnpm start

# watch mode
$ pnpm start:dev

# production mode
$ pnpm start:prod
```

---

## Run tests

```bash
# unit tests
$ pnpm test

# e2e tests
$ pnpm test:e2e

# test coverage
$ pnpm test:cov

```

## License

MyEx is [MIT Licensed](https://github.com/CatC0de1/myex-backend?tab=MIT-1-ov-file)
