# My Delivery Provider

A store operations web application for restaurants and other businesses that receive orders through the My Delivery ecosystem. Store teams use Provider to review orders, view customer details, and manage their catalog and store profile.

## The My Delivery ecosystem

Provider is one of three applications connected through the My Delivery Server API:

- **My Delivery** — the customer app for discovering stores, choosing products, and placing orders.
- **My Delivery Provider** — the store operations dashboard for reviewing incoming orders, updating their status, and managing products.
- **SaaS Dashboard** — the management and monitoring dashboard for the ecosystem.
- **My Delivery Server** — the central API that connects the applications, authenticates users, persists data, and integrates platform services.

The main flow starts in the My Delivery customer app. The API records each order and makes it available in the Provider dashboard, where the store can review and update it.

## Features

- Store sign-up and login, password reset, and authentication-protected routes.
- View orders grouped by status: pending (`REQUESTED`) and completed (`FINISHED`).
- View each customer's profile and order history, and mark orders as completed or return them to pending.
- View the value of listed orders and remove completed orders.
- Manage the product catalog: create, edit, and remove products with a category, description, price, stock, and image.
- Search products within the selected category.
- Edit store details, view notifications, and manage the account.

## Tech stack

- React 19, TypeScript, and Vite
- React Router
- Styled Components
- Axios

## Run locally

Requires Node.js and npm. From this project directory:

```bash
npm install
```

Create a `.env` file in the project root with the API base URL:

```env
VITE_BASE_URL=http://localhost:3003
```

To make links from new-order notifications navigate to the correct page, also configure:

```env
VITE_RESTAURANT_NOTIFICATION_URL=/orders
```

Start the development server:

```bash
npm run dev
```

Other available commands:

```bash
npm run build
npm run preview
npm run lint
```

## API integration

Provider uses the URL configured in `VITE_BASE_URL` as the base for the `/providers`, `/orders`, `/users`, and `/provider-notifications` routes on My Delivery Server. Authenticated actions send the store's token in the `Authorization` header.

## Related applications

- [My Delivery — customer app](https://my-delivery-silk.vercel.app)
- [My Delivery Provider — web app](https://my-delivery-provider.vercel.app)
- [My Delivery Server — API documentation](https://my-delivery-server-nine.vercel.app/api-docs/)
- [Portfolio](https://portfolio-vtu0.onrender.com)
