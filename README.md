# Delivery App (Merchant / Provider Panel) — Freelance Portfolio Project

A responsive administrative dashboard built with React, TypeScript, and Styled Components. This repository represents the provider/merchant ecosystem of the delivery platform, enabling restaurant managers to process live incoming orders, inspect customer logistics data, transition order statuses in real time, and manage their product catalog.

> 🌐 **Portfolio Note:** While this application is operationally tailored to the Brazilian delivery market (displaying monetary values in R$ and handling localized address structures like CEP/Neighbourhoods), **the source code, architecture, and administrative interface were intentionally developed in English** to effectively demonstrate full-stack engineering proficiency to international recruiters.

---

## 🚀 Key Features

* **Real-Time Orders Management (`Orders` Page):**
Displays active incoming orders categorized by state (Pending / Completed).
Features memoized calculations for category revenue totals (R$) and status toggles.
Provides quick-access client navigation and historical order purging.
* **Client Details & Address Inspection (`ClientData` Page):**
Fetches detailed customer profiles alongside their active order histories via concurrent Promise.all streams.
Displays full delivery logistics (Street, Number, Complement, Neighbourhood, City, and State).
Enforces state-mutation locks (isMutating) on status buttons to prevent race conditions during rapid order status updates (Pending ↔ Completed).

* **Dynamic Catalog & Menu Management (`Profile` Page):**
Operates a multi-view state engine (List, Insert, Update) without requiring separate route navigation.
Categorized Live Search: Groups products by category and limits live search filtering to the active category for optimal performance.
Auto-Scroll & Asset Recovery: Uses useRef anchors for seamless category scrolling and onError image handlers to gracefully fall back when asset images fail to load.

* **Session Persistence & Authentication:**
Synchronizes JWT authorization headers across all API endpoints using custom context state (useGlobal) and local storage namespaces (@MyDeliveryProvider:token).

---

## 🛠️ Architecture and Tech Stack
Frontend Library: React (Functional Components & Custom Hooks)

Type Safety: TypeScript (Strictly typed models for Order, User, Restaurant, Products, and GroupedProducts)

State Architecture: Context API (GlobalStateProvider) with scoped local storage persistence and memoized state selectors (useMemo, useCallback)

Styling Engine: Styled Components (CSS-in-JS layout structure)

Icons & UI Utilities: react-icons (BsFillPersonFill, MdFeed, AiOutlineLogout, IoMdAddCircle, IoMdCloseCircle)

HTTP Client: Centralized Axios requests featuring bearer token headers (Authorization)

---

### 📂 Key Components and Page Architectures

### 1. Global State Hub (GlobalStateProvider.tsx)

Serves as the root security controller for the provider panel.

    Storage Namespace: @MyDeliveryProvider:token

    Lifecycle: Hydrates authentication tokens on initial mount (initializeAuth) and exposes reactive token mutators (loginProvider, logoutProvider).

    Context API: Exposes token references directly to downstream pages to formulate dynamic authorization header objects (requestConfig).

### 2. Orders Dashboard (Orders.tsx)

The operational epicenter for restaurant staff.

    Organizes raw orders into grouped objects by status (REQUESTED / FINISHED) using useMemo.

    Calculates total revenue per category dynamically (Number(order.price) * Number(order.quantity)).

    Persists selected client IDs to localStorage when transitioning to the customer inspection view.

### 3. Customer Inspection Hub (ClientData.tsx)

Provides targeted order and address visibility for individual client fulfillments.

    Concurrent Data Fetching: Simultaneously executes calls to /profile/:id and /user/active_orders/:id via Promise.all.

    Guard Logic: Redirects safely to /orders if no active userId reference exists in web storage.

    State Machine Mutations: Handles status patches (/finish_order/:id and /return_order/:id) with button lockouts to prevent duplicate network calls.

### 4. Merchant Profile & Menu Manager (Profile.tsx)

Allows full administration of the restaurant profile and menu catalog.

    Screen State Machine: Toggles between 'list', 'insert', and 'update' modes, auto-refreshing catalog data whenever returning to 'list'.

    Category Auto-Selection: Automatically targets the first available product category upon loading.

    Interactive Filtering: Restricts text queries to the currently active category to minimize UI computation during live searches.

---

## 🔗 Related Ecosystem Repositories

    📱 Delivery App (Customer-Facing Panel) — The consumer frontend where end-users browse menus, manage their shopping cart, and process digital payments (Pix / Credit Card).

---

## 👨‍💻 Author

Developed by **Flamarion França** \
Portolio page: https://portfolio-vtu0.onrender.com \
Application link: https://my-delivery-provider.vercel.app