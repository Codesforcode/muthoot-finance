# Muthoot Finance Website Clone

A full-stack website inspired by the public-facing Muthoot Finance website, built for learning and demonstration purposes.

## Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* JavaScript

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* REST APIs
* API Gateway

## Features

* Responsive navigation header
* Services dropdown and mega menu
* Dynamic homepage banners
* Automatic hero carousel
* Services section powered by MongoDB
* Why Choose Us section
* REST API integration

## Project Structure

```text
MuthootFinance/
├── client/       # React frontend
├── server/       # Node.js backend
├── package.json
└── README.md
```

## Prerequisites

* Node.js and npm
* MongoDB
* Git

## Getting Started

### 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
cd MuthootFinance
```

### 2. Install frontend dependencies

```bash
cd client
npm install
```

### 3. Install backend dependencies

```bash
cd ../server
npm install
```

### 4. Configure environment variables

Create `server/.env` using `server/.env.example` as a reference.

Configure the MongoDB connection URI and service URLs.

### 5. Start the application

Start the backend using the startup script configured in `server/package.json`.

Start the frontend in a separate terminal using:

```bash
cd client
npm run dev
```

## Disclaimer

This is an independent educational project. It is not affiliated with or endorsed by Muthoot Finance. Logos, trademarks, and other third-party assets remain the property of their respective owners.
