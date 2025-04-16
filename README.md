# 📊 Real-Time Analytics Dashboard

A lightweight full-stack web application for visualizing real-time metrics like active users, session duration, and page views using WebSockets.

## 🔧 Tech Stack

### Frontend:

-   React (v19)
-   Tailwind CSS
-   Recharts (for graphs)
-   Socket.io-client

### Backend:

-   Express.js
-   Socket.io
-   Morgan (logging)
-   CORS

## 📁 Project Structure

```
.
├── backend
│   └── App.js (Express server + Socket.io + metrics API)
├── frontend
│   ├── src/components
│   │   ├── ActiveUsersCard.jsx
│   │   ├── PageViewsChart.jsx
│   │   └── SessionGauge.jsx
│   ├── App.jsx
│   ├── api.js
│   └── index.js
```

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/realtime-analytics.git
cd realtime-analytics
```

### 2. Install Dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd ../frontend
npm install
```

### 3. Run the App

#### Backend

```bash
npm start
```

#### Frontend

```bash
npm start
```

Frontend runs on `http://localhost:3000`, backend on `http://localhost:4000`.

## 🌐 Environment Variables

**backend/.env**

```
PORT=4000
METRICS_INTERVAL_MS=2000
```

**frontend** uses `REACT_APP_API_URL` if configured with Create React App.

## 📈 Features

-   Real-time metric updates via WebSocket
-   Active users, session duration, and page views
-   Minimal, responsive UI with Tailwind
-   Lightweight and easy to deploy

## 🧹 Cleanup Notes

Make sure `.gitignore` includes:

```
node_modules/
dist/
.env
```

## 🧠 Future Improvements

-   Add user/device breakdowns
-   Use real metrics from a DB or analytics source
-   Auth & multi-dashboard support
