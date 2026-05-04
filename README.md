# Training Wiki

<p align="center">
	<img src="static/img/logo.svg" alt="Training Wiki logo" width="160" />
</p>

Wiki/knowledge base built with [Docusaurus](https://docusaurus.io/) with search powered by Typesense DocSearch.

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

3) Create the search-only API key (once):

```bash
docker compose --profile init run --rm typesense-init
```

4) Index the docs into Typesense (required for getting results):

```bash
docker compose --profile scraper run --rm scraper
```

Optional: keep a watcher running and trigger re-index when needed:

```bash
docker compose up -d scraper-watcher

# trigger a re-index
docker compose exec wiki sh -lc 'touch /trigger/run'
```

Note: `TYPESENSE_*` variables are read **at build time**; if you change them, rebuild (`--build`).
