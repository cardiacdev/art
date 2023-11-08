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

### Dev Infos

#### Next.js Dev Server:

Der Dev Server kann im Client Container durch `npm run dev` oder `npm run dev:legacy` gestartet werden.

Der Command mit `legacy` Suffix benutzt Webpack anstatt das schnellere Rust-basierte Turbopack.

#### Next.js Prod Build:

Der Prod Build kann im Client Container durch `npm run build` gebaut werden.

Getestet werden kann anschließend mit `npm run start`.

#### Makefile

Weitere Commands für QoL können der [Makefile](Makefile) entnommen werden.
