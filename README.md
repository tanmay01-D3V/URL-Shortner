
# 🔗 URL Shortener - Full St

https://github.com/user-attachments/assets/7cc9fee3-9232-4d2b-8832-979f922e0cc3

ack Application

A modern, fast, and secure URL shortening service built with a robust React frontend and a powerful Node.js backend. This application provides a seamless user experience for creating short links, tracking analytics, and managing user accounts.

---

## ✨ Features

- **🚀 Instant URL Shortening**: Convert long, cumbersome URLs into short, manageable links.
- **📊 Real-time Analytics**: Track total clicks and detailed visit history for every shortened URL.
- **🔐 Secure Authentication**: Full user signup and login system powered by **JWT (JSON Web Tokens)**.
- **🛡️ Protected Routes**: User-specific dashboard and results pages accessible only to authenticated users.
- **🎨 Premium UI/UX**: Beautiful, responsive interface built with **Tailwind CSS 4** and modern React patterns.
- **⚡ High Performance**: Ultra-fast redirection and API responses using **Express 5** and **MongoDB**.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Routing**: [React Router 7](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **API Client**: [Axios](https://axios-http.com/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express 5](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **Auth**: JWT (JSON Web Tokens) & Cookie-parser
- **ID Generation**: [Nanoid](https://github.com/ai/nanoid) / [Shortid](https://github.com/dylang/shortid)

---

## 📂 Project Structure

```text
URL-Shortner/
├── backend/                # Express.js Server
│   ├── controllers/        # Business logic
│   ├── models/             # MongoDB Schemas
│   ├── Routes/             # API Endpoints
│   ├── middlewares/        # Auth & validation
│   ├── service/            # Helper services (JWT)
│   └── index.js            # Entry point
├── frontend/               # React Application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page views (Home, Login, Signup, Result)
│   │   ├── App.jsx         # Main App logic
│   │   └── api.js          # Axios configuration
│   └── index.html
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Running locally or on Atlas)

### 1. Clone the Repository
```bash
git clone https://github.com/tanmay01-D3V/URL-Shortner.git
cd URL-Shortner
```

### 2. Backend Setup
```bash
cd backend
npm install
# Ensure MongoDB is running on mongodb://localhost:27017/
npm start
```
*The server will start on `http://localhost:8003`*

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```
*The app will be available at `http://localhost:5173`*

---

## 🌐 Live Development Link (Dev Tunnel)

You can access the application remotely via the following link:
🔗 **[https://sll09pc9-5173.inc1.devtunnels.ms/](https://sll09pc9-5173.inc1.devtunnels.ms/)**

---

## 🔌 API Endpoints

### User Authentication
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/user/signup` | Register a new user |
| `POST` | `/api/user/login` | Authenticate user & receive cookie |

### URL Operations
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/url` | Create a shortened URL (Auth Required) |
| `GET` | `/api/url/analytics/:shortId` | Get click analytics |
| `GET` | `/:shortId` | Redirect to original URL |

---

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## ✍️ Author

**Tanmay** - [tanmay01-D3V](https://github.com/tanmay01-D3V)

---

## ⭐️ Support

If you like this project, please give it a star! ⭐
