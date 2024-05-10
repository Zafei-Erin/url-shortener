# URL Shortener

## Structure

- **`/backend`**: REST server built with Express.js
  - `src/index.ts`: entry point of the whole server
  - `src/router`: request handlers
  - `src/utils`: functions used by handlers
  - `mongoDB/client.ts`: MongoDB driver
- **`/frontend`**: Wep app built with React.js

## Getting Started

### Backend

```sh
    # Install dependencies
    npm install
    # Development
    npm run dev
    # Testing
    npm run test
    # Deployment is handled by Vercel
```

### Frontend

```sh
    # Install dependencies
    pnpm install
    # Development
    pnpm run dev
    # Deployment is handled by Vercel
```
