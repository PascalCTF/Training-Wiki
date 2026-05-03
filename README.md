# Training Wiki

<p align="center">
	<img src="static/img/logo.svg" alt="Training Wiki logo" width="160" />
</p>

Wiki/knowledge base built with [Docusaurus](https://docusaurus.io/) with search powered by Typesense DocSearch.

Prerequisites: Node.js >= 20, npm. For deployment: Docker + Docker Compose.

## Local setup

```bash
npm ci
npm run start
```

## Server setup

1) Create the `.env` file starting from [.env.example](.env.example) and set the variables (especially `ROOT_PASSWORD`, `TYPESENSE_ADMIN_API_KEY`, `TYPESENSE_SEARCH_API_KEY`).

2) Start the stack:

```bash
docker compose up -d --build
```

Note: `TYPESENSE_*` variables are read **at build time**; if you change them, you must rebuild (`--build`).
