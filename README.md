# MyEx



## Dev dependencies

- [Nest](https://github.com/nestjs/nest)

## Project setup

```bash
$ npm install
```

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

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
