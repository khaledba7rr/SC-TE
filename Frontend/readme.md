# Scandiweb Frontend

This is the frontend of the Scandiweb Fullstack E-commerce Application. Built with **React**, styled using **Tailwind CSS**, and powered by **Apollo Client** to consume the GraphQL API.

## 📦 Tech Stack

- React (Vite)
- TypeScript
- SCSS
- Apollo Client
- GraphQL

## 🚀 Getting Started

### 1. Clone the repo

```bash

git clone https://github.com/yourusername/frontend.git
cd frontend

```

### 2. Install dependencies

npm install

### 3. Configure environment (if needed)

Update src/apolloClient.ts if your GraphQL endpoint changes.

const client = new ApolloClient({
uri: 'http://your-server.duckdns.org/graphql',
cache: new InMemoryCache(),
});

### 4. Start the development server

npm run dev

## 📁 Project Structure

src/
├── components/
├── pages/
├── graphql/
├── apolloClient.ts
├── App.tsx

### 🛠 Features

    List products

    View product details

    Filter by category

    Add to cart

    Submit orders
