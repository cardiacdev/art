# BART

## Local Development

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Make](https://www.gnu.org/software/make/)

### Config

#### Caddy

Falls erwünscht, in `docker/dev/caddy/Caddyfile` den Port anpassen.

### Initial Setup

```bash
$ make up
```

#### API

```bash
$ make api-bash
$ composer i
$ bin/console do:mi:mi
$ bin/console do:fi:lo
```

#### Client

```bash
$ make client-bash
$ npm i
$ npm run dev
```

Die Applikation ist nun unter [http://localhost](http://localhost) erreichbar.
