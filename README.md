<div align="center">

# 🎪 EventEase

### *A Full-Stack Event Registration & Management Platform*

<br/>

![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose_8-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Auth-FB015B?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![SendGrid](https://img.shields.io/badge/SendGrid-Email-1A82E2?style=for-the-badge&logo=sendgrid&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Deploy-000000?style=for-the-badge&logo=vercel&logoColor=white)

<br/>

![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![Version](https://img.shields.io/badge/Version-0.1.0-blue?style=flat-square)
![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=flat-square)
![Node](https://img.shields.io/badge/Node-%3E%3D18.0-339933?style=flat-square&logo=node.js)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [Architecture Overview](#-architecture-overview)
- [ER Diagram](#-er-diagram)
- [User Flow Diagrams](#-user-flow-diagrams)
  - [Customer Flow](#customer-flow)
  - [Admin Flow](#admin-flow)
  - [Booking & Email Flow](#booking--email-flow)
- [API Reference](#-api-reference)
- [Project Structure](#-project-structure)
- [Environment Variables](#-environment-variables)
- [Getting Started](#-getting-started)
- [Deployment](#-deployment)
- [Contributing](#-contributing)

---

## 🌟 Overview

**EventEase** is a production-ready, full-stack event registration and management platform built with the **Next.js App Router**. It provides a dual-portal system — one for **admins** to manage events and one for **customers** to discover, browse, and register for events — all backed by real-time MongoDB persistence and automated email confirmations.

### ✨ Key Features

| Feature | Description |
|---|---|
| 🔐 **Dual Auth System** | Separate JWT-based login for Admins and Customers |
| 📅 **Event Management** | Full CRUD operations for events with rich details |
| 🎟️ **Booking System** | Customers can book tickets with multi-seat support |
| 📧 **Email Confirmations** | Automated HTML booking confirmation emails via SendGrid |
| 🔍 **Smart Search & Filter** | Filter events by price, location, date range |
| 📊 **Admin Dashboard** | Centralized hub to manage events, view bookings |
| 🌙 **Dark Mode** | Admin dashboard dark mode toggle |
| 📈 **Analytics** | Vercel Analytics integration for traffic insights |

---

## 🛠 Tech Stack

### Full Stack Wiring Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         CLIENT (Browser)                            │
│                                                                     │
│  ┌───────────────────────┐      ┌────────────────────────────┐      │
│  │   React 19 (UI)       │      │   TailwindCSS v4 (Styles)  │      │
│  │   - Hooks & State     │      │   - Utility classes         │      │
│  │   - lucide-react icons│      │   - Responsive grid         │      │
│  │   - react-toastify    │      │   - Dark mode variants      │      │
│  └───────────────────────┘      └────────────────────────────┘      │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │               Next.js 15 App Router                          │   │
│  │   /                  → Public Event Listing (SSR)            │   │
│  │   /booking/[eventId] → Customer Booking Page                 │   │
│  │   /customer/register → Customer Registration                 │   │
│  │   /customer/login    → Customer Login                        │   │
│  │   /customer/my-bookings → Booking History                    │   │
│  │   /admin/login       → Admin Login                           │   │
│  │   /admin/dashboard   → Admin Dashboard                       │   │
│  │   /admin/bookings    → Booking Management                    │   │
│  └──────────────────────────────────────────────────────────────┘   │
└───────────────────────────────┬─────────────────────────────────────┘
                                │ HTTP / Fetch API
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    SERVER (Next.js API Routes)                      │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  Route Handlers  (app/api/**/route.js)                        │  │
│  │                                                               │  │
│  │  POST /api/auth/admin          → Admin Login + JWT issue      │  │
│  │  POST /api/auth/customer       → Customer Login + JWT issue   │  │
│  │  GET  /api/events              → Fetch All Events             │  │
│  │  POST /api/events              → Create Event (Admin)         │  │
│  │  GET  /api/events/[eventId]    → Fetch Single Event           │  │
│  │  POST /api/bookings            → Create Booking + send Email  │  │
│  │  GET  /api/bookings            → Fetch All Bookings (Admin)   │  │
│  │  GET  /api/customer/bookings   → Fetch My Bookings            │  │
│  │  GET  /api/admin/details       → Fetch Admin Info             │  │
│  │  GET  /api/customer/details    → Fetch Customer Info          │  │
│  │  POST /api/send-email          → Manual Email Trigger         │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  ┌──────────────────┐    ┌────────────────────────────────────────┐  │
│  │  authMiddleware  │    │         lib/tokenUtils.js              │  │
│  │  - Bearer token  │    │  - JWT sign / verify helpers           │  │
│  │  - Role checks   │◄───│  - Token decode utilities              │  │
│  │  - 401 / 403     │    └────────────────────────────────────────┘  │
│  └──────────────────┘                                               │
│                                                                     │
└─────────┬───────────────────────────────┬───────────────────────────┘
          │                               │
          ▼                               ▼
┌──────────────────────┐       ┌─────────────────────────┐
│   MongoDB Atlas      │       │   SendGrid Email API     │
│   (via Mongoose 8)   │       │                         │
│                      │       │  ✉ Booking Confirmation  │
│  Collections:        │       │  ✉ Event Notifications   │
│  - users             │       │                         │
│  - admins            │       │  From:                  │
│  - customers         │       │  eventhub.company12     │
│  - events            │       │  @gmail.com             │
│  - bookings          │       │                         │
└──────────────────────┘       └─────────────────────────┘
```

### Tech Stack Summary

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | Next.js 15 (App Router) | SSR, routing, API routes |
| **UI Library** | React 19 | Component-based UI |
| **Styling** | TailwindCSS v4 | Utility-first CSS |
| **Icons** | lucide-react, react-icons | UI iconography |
| **Database** | MongoDB + Mongoose 8 | Data persistence & schemas |
| **Auth** | JWT (jsonwebtoken) + bcryptjs | Secure token-based auth |
| **Email** | SendGrid (@sendgrid/mail) | Transactional emails |
| **Notifications** | react-toastify | In-app toast alerts |
| **Analytics** | @vercel/analytics | Page view tracking |
| **Fonts** | Google Fonts (Geist) | Typography |
| **Deployment** | Vercel | CI/CD + Hosting |

---

## 🏗 Project Structure

```
event-registration/
│
├── app/                          ← Next.js App Router Root
│   ├── layout.js                 ← Global layout + fonts + analytics
│   ├── page.js                   ← Public homepage (event listing)
│   │
│   ├── api/                      ← Server-side Route Handlers
│   │   ├── auth/
│   │   │   ├── admin/route.js    ← Admin login endpoint
│   │   │   └── customer/route.js ← Customer login endpoint
│   │   ├── events/
│   │   │   ├── route.js          ← GET all / POST create event
│   │   │   └── [eventId]/route.js← GET / PUT / DELETE single event
│   │   ├── bookings/
│   │   │   └── route.js          ← POST create booking + email trigger
│   │   ├── admin/
│   │   │   └── details/route.js  ← GET logged-in admin details
│   │   ├── customer/
│   │   │   ├── details/route.js  ← GET logged-in customer details
│   │   │   └── bookings/route.js ← GET customer booking history
│   │   └── send-email/route.js   ← Manual email dispatch
│   │
│   ├── admin/                    ← Admin Portal Pages
│   │   ├── layout.js             ← Admin layout wrapper
│   │   ├── login/page.js         ← Admin login form
│   │   ├── dashboard/page.js     ← Admin dashboard + event CRUD
│   │   └── bookings/page.js      ← Booking management view
│   │
│   ├── customer/                 ← Customer Portal Pages
│   │   ├── layout.js             ← Customer layout wrapper
│   │   ├── login/page.js         ← Customer login
│   │   ├── register/page.js      ← Customer registration
│   │   └── my-bookings/page.js   ← Customer booking history
│   │
│   ├── booking/
│   │   └── [eventId]/page.js     ← Event booking page (per event)
│   │
│   └── components/               ← Shared UI Components
│       ├── Navbar.js             ← Public-facing navbar
│       ├── AdminNavbar.js        ← Admin top navigation
│       ├── AdminSidebar.js       ← Admin collapsible sidebar
│       ├── CreativeFooter.js     ← Styled footer
│       └── FilterSidebar.js      ← Event filter panel
│
├── models/                       ← Mongoose Data Models
│   ├── User.js                   ← Shared user schema (role-based)
│   ├── Admin.js                  ← Admin-specific schema
│   ├── Customer.js               ← Customer-specific schema
│   ├── Event.js                  ← Event schema
│   └── Booking.js                ← Booking schema
│
├── lib/                          ← Server-side Utilities
│   ├── mongodb.js                ← Mongoose connection (cached)
│   ├── authMiddleware.js         ← JWT verify + role-based guard
│   ├── tokenUtils.js             ← JWT sign/verify helpers
│   └── sendgrid.js               ← SendGrid email helper
│
└── public/                       ← Static Assets
```

---

## 🗄 ER Diagram

The following Entity-Relationship diagram shows the data model and how collections are linked in MongoDB:

```mermaid
erDiagram
    USER {
        ObjectId  _id PK
        String    username UK
        String    password
        String    role
        Date      createdAt
        Date      updatedAt
    }

    ADMIN {
        ObjectId  _id PK
        String    username UK
        String    email UK
        String    password
    }

    CUSTOMER {
        ObjectId  _id PK
        String    email UK
        String    username UK
        String    password
    }

    EVENT {
        ObjectId  _id PK
        String    name
        String    description
        String    date
        String    time
        Number    price
        String    place
        String    image
        ObjectId  createdBy FK
        Date      createdAt
        Date      updatedAt
    }

    BOOKING {
        ObjectId  _id PK
        ObjectId  eventId FK
        String    name
        String    email
        String    phone
        Number    numberOfTickets
        String    additionalDetails
        Date      createdAt
        Date      updatedAt
    }

    USER         ||--o{ EVENT   : "creates (as admin)"
    EVENT        ||--o{ BOOKING : "has bookings"
    CUSTOMER     ||--o{ BOOKING : "places (by email)"
```

> **Note:** `User` is the shared authentication model with role-based access (`admin` | `customer`). `Admin` and `Customer` are supplementary profile models. Bookings are linked to Events via `eventId` and implicitly to customers via `email`.

---

## 🔄 User Flow Diagrams

### Customer Flow

```mermaid
flowchart TD
    A([Visit EventEase]) --> B[Browse Events on Homepage]
    B --> C{Interested in an Event?}
    C -- No --> B
    C -- Yes --> D[Click Book Now]
    D --> E{Customer Logged In?}
    E -- No --> F[Redirect to Customer Login]
    F --> G{Has Account?}
    G -- No --> H[Register as Customer]
    H --> I[Fill Name / Email / Password]
    I --> J[POST /api/auth/customer/register]
    G -- Yes --> K[Login with Credentials]
    K --> L[POST /api/auth/customer]
    L --> M{Valid Credentials?}
    M -- No --> N[Show Error Toast]
    N --> K
    M -- Yes --> O[JWT Token Stored in Cookie/LocalStorage]
    E -- Yes --> P
    J --> O
    O --> P[Load Booking Page /booking/eventId]
    P --> Q[Fill: Name, Email, Phone, Tickets, Details]
    Q --> R[Submit Booking Form]
    R --> S[POST /api/bookings]
    S --> T[Save Booking to MongoDB]
    T --> U[Trigger SendGrid Email]
    U --> V[HTML Confirmation Email Sent]
    V --> W[Show Success Toast]
    W --> X[Redirect to My Bookings]
    X --> Y[GET /api/customer/bookings]
    Y --> Z[View Booking History]
```

### Admin Flow

```mermaid
flowchart TD
    A([Admin Login Page]) --> B[Enter Username and Password]
    B --> C[POST /api/auth/admin]
    C --> D{Valid Admin?}
    D -- No --> E[401 Unauthorized]
    E --> B
    D -- Yes --> F[JWT Token Issued]
    F --> G[Admin Dashboard Loaded]
    G --> H{Choose Action}

    H --> I[Manage Events]
    I --> I1[View All Events - GET /api/events]
    I1 --> I2{Action on Event}
    I2 --> I3[Create New Event]
    I3 --> I4[Fill Form: Name, Desc, Date, Time, Price, Place, Image]
    I4 --> I5[POST /api/events]
    I5 --> I6[Event Created in MongoDB]

    I2 --> I7[Edit Event]
    I7 --> I8[PUT /api/events/eventId]
    I8 --> I9[Event Updated]

    I2 --> I10[Delete Event]
    I10 --> I11[DELETE /api/events/eventId]
    I11 --> I12[Event Removed]

    H --> J[View Bookings]
    J --> J1[GET /api/bookings]
    J1 --> J2[View All Customer Bookings]
    J2 --> J3[See: Name, Email, Phone, Tickets, Event]

    H --> K[Toggle Dark Mode]
    K --> L[Dark/Light UI Switch]

    H --> M[Logout]
    M --> N[Clear JWT Token]
    N --> A
```

### Booking & Email Flow

```mermaid
sequenceDiagram
    actor Customer
    participant Browser
    participant NextAPI as Next.js API /api/bookings
    participant MongoDB
    participant SendGrid

    Customer->>Browser: Fill booking form
    Browser->>NextAPI: POST /api/bookings with eventId, name, email, phone, tickets

    NextAPI->>MongoDB: Booking.create(body)
    MongoDB-->>NextAPI: Booking document saved

    NextAPI->>MongoDB: Event.findById(eventId)
    MongoDB-->>NextAPI: Event details - name, date, place, image

    NextAPI->>NextAPI: Build HTML email template

    NextAPI->>SendGrid: sgMail.send(msg)
    SendGrid-->>Customer: HTML Confirmation Email

    NextAPI-->>Browser: 201 Created with booking data
    Browser-->>Customer: Success toast notification
```

---

## 📡 API Reference

### Authentication

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/auth/admin` | Admin login → JWT token | ❌ |
| `POST` | `/api/auth/customer` | Customer login → JWT token | ❌ |
| `POST` | `/api/customer/register` | Register new customer | ❌ |

### Events

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/events` | Fetch all events | ❌ |
| `POST` | `/api/events` | Create a new event | ✅ Admin |
| `GET` | `/api/events/[eventId]` | Fetch single event | ❌ |
| `PUT` | `/api/events/[eventId]` | Update an event | ✅ Admin |
| `DELETE` | `/api/events/[eventId]` | Delete an event | ✅ Admin |

### Bookings

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/bookings` | Create a booking + send email | ❌ |
| `GET` | `/api/bookings` | Fetch all bookings | ✅ Admin |
| `GET` | `/api/customer/bookings` | Fetch current customer's bookings | ✅ Customer |

### Users

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/admin/details` | Fetch logged-in admin's profile | ✅ Admin |
| `GET` | `/api/customer/details` | Fetch logged-in customer's profile | ✅ Customer |

### Utilities

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/send-email` | Manually trigger an email | ✅ Admin |

---

## 🔐 Authentication Wiring

```
┌──────────────────────────────────────────────────────────────┐
│                    Authentication Flow                       │
│                                                              │
│  Login Form ──► POST /api/auth/* ──► bcryptjs.compare()      │
│                                           │                  │
│                                    Valid? ▼                  │
│                              jwt.sign({ id, role })          │
│                                    │                         │
│                              Token returned                  │
│                                    │                         │
│              ┌─────────────────────┴────────────────────┐   │
│              │         Client stores token               │   │
│              │   (localStorage / httpOnly cookie)        │   │
│              └─────────────────────┬────────────────────┘   │
│                                    │                         │
│              Protected Request ──► Authorization: Bearer token
│                                    │                         │
│                            authMiddleware.js                 │
│                                    │                         │
│                         jwt.verify(token, SECRET)            │
│                                    │                         │
│              ┌─────────────────────┴──────────────────┐     │
│              │  Role check: allowedRoles.includes(role)│     │
│              └──────┬─────────────────────────┬───────┘     │
│                     │                         │             │
│               Pass                       Fail               │
│               req.user = decoded         403 Forbidden       │
│               handler(req, res)          401 Unauthorized    │
└──────────────────────────────────────────────────────────────┘
```

---

## 🌐 Environment Variables

Create a `.env.local` file in the project root with the following variables:

```env
# ─── Database ─────────────────────────────
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/event-registration

# ─── Authentication ───────────────────────
JWT_SECRET_KEY=your_super_secret_jwt_key_here

# ─── Email (SendGrid) ─────────────────────
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxxxx

# ─── App Base URL ─────────────────────────
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

> ⚠️ Never commit `.env.local` to version control. It is already included in `.gitignore`.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** `>= 18.0`
- **npm** `>= 9.0`
- A **MongoDB Atlas** cluster (free tier works)
- A **SendGrid** account with a verified sender

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Aryansinha123/Event_Manager.git
cd event-registration

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Then edit .env.local with your credentials

# 4. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

---

## 📦 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project on [vercel.com](https://vercel.com)
3. Add all environment variables in the Vercel dashboard under **Settings → Environment Variables**
4. Deploy — Vercel auto-detects Next.js and configures everything

```bash
# Or deploy via Vercel CLI
npx vercel --prod
```

> ✅ Vercel Analytics (`@vercel/analytics`) is already integrated and will activate automatically on deployment.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'feat: add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

### Pending Features (Good First Issues)

- [ ] Password encryption for Admin passwords (bcrypt)
- [ ] JWT token refresh / expiry handling
- [ ] File upload support for event images
- [ ] Pagination for event listing
- [ ] Dark mode for customer portal
- [ ] Inline form validation with error messages
- [ ] Admin dashboard statistics (total events, bookings)
- [ ] End-to-end testing setup

---

## 📄 License

This project is licensed under the **MIT License**.

---

<div align="center">

Made with ❤️ using **Next.js**, **MongoDB**, and **SendGrid**

⭐ Star this repo if you found it useful!

</div>
