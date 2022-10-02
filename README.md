This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
yarn dev
```

JSON server will start automaticly while using all default yarn's scripts.

!!! Concurrently JSON-server will automly start even during "yarn build" running (because of next build require all back-end links used for pages pregeneration to be working, in our situation - fake back-end). So you had to exit server after build by pressing "^C".

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

[http://localhost:3001](http://localhost:3001) is used for JSON server for imitating requests and responses to the database.
