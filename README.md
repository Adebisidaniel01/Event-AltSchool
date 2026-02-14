# Eventful Backend

Eventful is a ticketing platform backend built with **Node.js + TypeScript**.

## Features

- Authentication (JWT + Refresh Token)
- Role-based access (CREATOR / EVENTEE)
- Event creation & listing
- Ticket purchase
- QR code generation & scanning
- Paystack payment integration
- Notifications & reminders (cron-based)
- Analytics (global & per-event)
- Redis caching
- Rate limiting
- Swagger / OpenAPI documentation
- Unit & integration tests

## Project Structure


- `modules/` → domain-driven design (auth, events, tickets, payments, QR, notifications, analytics)
- `middlewares/` → authentication, authorization, error handling, rate limiting
- `config/` → environment, database, cache, Paystack, logging

## Setup

1. Clone the repo
2. Install dependencies:

```bash
npm install
