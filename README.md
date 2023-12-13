# ART

Final Exam Project for the _Fachinformatiker Anwendungsentwicklung_ Apprenticeship.

## Description 🌻

ART (Anwendungs- und Rechnungstracker) is a web application for managing Clients, Projects, Tasks/Orders and Invoices.

## Demo

A demo of the application can be found at [art.cardiacdev.tech](https://art.cardiacdev.tech/)

## Tech Stack 🥞

#### Frameworks

- [Next.js](https://nextjs.org/) (React) with TypeScript
- [API Platform](https://api-platform.com/) (Symfony) with PHP

#### DevOps & Infrastructure

- [Docker](https://www.docker.com/) (Containerization)
- [Nginx Proxy Manager](https://nginxproxymanager.com/) (Reverse Proxy)
- [Caddy](https://caddyserver.com/) (Reverse Proxy)
- [Nginx](https://www.nginx.com/) (Web Server)
- [Make](https://www.gnu.org/software/make/) (Task Runner)
- [PostgreSQL](https://www.postgresql.org/) (Database)
- [GitHub Actions](https://github.com/features/actions) (CI/CD)

#### Worth Mentioning

- [Tanstack React Query](https://react-query.tanstack.com/) (Data Fetching)
- [Tailwind CSS](https://tailwindcss.com/) (Styling)
- [React Hook Form](https://react-hook-form.com/) & [Zod](https://github.com/colinhacks/zod) (Form Handling)
- [Tanstack React Table](https://react-table.tanstack.com/) (Data Tables)
- [Nice Modal React](https://github.com/eBay/nice-modal-react) (Modals)
- [shadcn/ui](https://ui.shadcn.com/) (Component Library)

## Local Setup 🛠

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Make](https://www.gnu.org/software/make/)

### Setup

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

The application is now available at [http://localhost](http://localhost).
