# 🏪 My Delivery Provider — Merchant Operations Hub

[![Live Demo](https://img.shields.io/badge/Live_App-Try_It_Now-2ea44f?style=for-the-badge&logo=vercel)](https://my-delivery-provider.vercel.app)
[![Portfolio](https://img.shields.io/badge/Author-Flamarion_França-007acc?style=for-the-badge&logo=render)](https://portfolio-vtu0.onrender.com)

> **Ecosystem Core:** *My Delivery Provider* is the operational dashboard designed for restaurant managers and store operators. It receives real-time customer transactions from **[My Delivery](https://my-delivery-silk.vercel.app)** and feeds analytical performance metrics directly into the **[SaaS Dashboard](https://dashboard-project-nu-one.vercel.app/)**.

---

## ⚡ Interactive Live Demo
Experience how merchant order fulfillment operates in real time:
* 🌐 **Live Merchant Portal:** [https://my-delivery-provider.vercel.app](https://my-delivery-provider.vercel.app)
* 🛒 **Consumer App (To place test orders):** [https://my-delivery-silk.vercel.app](https://my-delivery-silk.vercel.app)
* 💼 **Developer Portfolio:** [https://portfolio-vtu0.onrender.com](https://portfolio-vtu0.onrender.com)

> 💡 **Try this flow:** Open both *My Delivery* and *My Delivery Provider* in side-by-side tabs. Place an order in the client app and watch it hydrate into the provider dashboard!

---

## 🌟 Why Test This Dashboard?

Engineered with **React**, **TypeScript**, and **Styled Components**, this administrative tool simulates real-world store operations, emphasizing state machine locks, real-time calculation memoization, and dynamic menu administration:

* **📊 Live Order Pipeline (`Orders` Page):** Categorizes incoming requests (`REQUESTED` vs. `FINISHED`) and dynamically computes real-time category revenue totals (`R$`) using `useMemo`.
* **🔒 Concurrency Protection (`ClientData` Page):** Implements async mutation locks (`isMutating` state safeguards) on status toggles to prevent network race conditions or duplicate fulfillment triggers during rapid clicks.
* **📦 Dynamic Multi-View Catalog Engine (`Profile` Page):** Features an in-page view state machine (`List`, `Insert`, `Update`) that refreshes catalogs without full page reloads, optimized with `useRef` auto-scrolling and `onError` image fallback recovery.
* **🔍 Scoped Search Indexing:** Restricts live catalog filter operations to the currently selected product category, keeping search performance smooth even with thousands of SKUs.

---

## 🏗️ Operations & State Architecture

```text
[ Consumer Order ] ──► [ REST API Backend ] ──► [ My Delivery Provider ]
                                                         │
                                      ┌──────────────────┴──────────────────┐
                                      ▼                                     ▼
                           [ State Status Machine ]             [ Revenue Computations ]
                          Pending ↔ Completed Lock               Dynamic Category Totals