# MyEx



## Dev dependencies

- [Nest](https://github.com/nestjs/nest)

## Project setup

```bash
$ pnpm install
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
$ pnpm start

# watch mode
$ pnpm start:dev

# production mode
$ pnpm start:prod
```

## Run tests

```bash
# unit tests
$ pnpm test

# e2e tests
$ pnpm test:e2e

# test coverage
$ pnpm test:cov
```
