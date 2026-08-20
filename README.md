# 🏪 My Delivery Provider — Merchant Operations Hub

[![Live Demo](https://img.shields.io/badge/Live_App-Try_It_Now-2ea44f?style=for-the-badge&logo=vercel)](https://my-delivery-provider.vercel.app)
[![Portfolio](https://img.shields.io/badge/Author-Flamarion_França-007acc?style=for-the-badge&logo=render)](https://portfolio-vtu0.onrender.com)

> **Ecosystem Core:** *My Delivery Provider* is the operational dashboard designed for restaurant managers and store operators. It handles real-time order processing sent from **[My Delivery](https://my-delivery-silk.vercel.app)** and feeds financial metrics directly into the **[SaaS Control Panel](https://dashboard-project-nu-one.vercel.app/)**, all orchestrated by **My Delivery Server**.

---

## ⚡ Interactive Live Demo

Experience how merchant order fulfillment and store management operate in real time:

* 🌐 **Live Merchant Portal:** [https://my-delivery-provider.vercel.app](https://my-delivery-provider.vercel.app)
* 🛒 **Consumer App (To place test orders):** [https://my-delivery-silk.vercel.app](https://my-delivery-silk.vercel.app)
* 💼 **Developer Portfolio:** [https://portfolio-vtu0.onrender.com](https://portfolio-vtu0.onrender.com)

🔑 **Demo Merchant Credentials:**
* **Admin 1:** `admin1@example.com` | Password: `password123`
* **Admin 2:** `admin2@example.com` | Password: `password123`

> 💡 **Suggested Test Flow:** Open *My Delivery* and *My Delivery Provider* in side-by-side tabs. Log into the provider app with one of the credentials above, place an order via the consumer app, and — after refreshing "My Delivery Provider" — watch the order hydrate directly into your merchant dashboard!

---

## 🌟 Technical Highlights & Engineering Decisions

Engineered with **React**, **TypeScript**, and **Styled Components**, this administrative application simulates high-efficiency store operations, emphasizing concurrency protection, optimized real-time calculations, and dynamic catalog state management:

* **📊 Real-Time Order Pipeline (`Orders` Page):** Classifies incoming transactions (`REQUESTED` vs. `FINISHED`) and dynamically calculates category-level revenue totals in real time using memoized execution pipelines (`useMemo`).
* **🔒 Concurrency Protection (`ClientData` Page):** Implements asynchronous mutation locks (`isMutating` state safeguards) across status toggles to prevent network race conditions or duplicate fulfillment requests during rapid operator clicks.
* **📦 Dynamic Multi-View Catalog Engine (`Profile` Page):** Operates an in-page view state machine (`List`, `Insert`, `Update`) that enables seamless menu changes without full-page reloads, supported by `useRef` auto-scrolling and `onError` image fallbacks.
* **🔍 Scoped Search Indexing:** Restricts live catalog filtering to the currently selected category, maintaining optimal client-side render speed regardless of menu size.
* **🔔 Cross-Platform Sync:** Instantly receives orders placed via the consumer application while triggering automated platform notifications upon menu or availability adjustments.

---

## 🏗️ Operations & Data Architecture

```text
  ┌───────────────────────────┐
  │   My Delivery (Client)    │
  └─────────────┬─────────────┘
                │ 1. Places Live Order
                ▼
  ┌───────────────────────────┐
  │   My Delivery Server      │
  │    (Centralized API)      │
  └─────────────┬─────────────┘
                │ 2. Real-Time Order Dispatch
                ▼
  ┌───────────────────────────┐
  │   My Delivery Provider    │
  └─────────────┬─────────────┘
                │
     ┌──────────┴────────────────────────────┐
     ▼                                       ▼
┌───────────────────────────┐   ┌───────────────────────────┐
│  State Status Machine     │   │  Revenue Calculations     │
│  (Pending ↔ Completed Lock)│   │  (Dynamic Category Totals)│
└───────────────────────────┘   └───────────────────────────┘