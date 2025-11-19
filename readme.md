# 🍽️ Tastify – Full-Stack Food Delivery Platform

Tastify is a production-ready, full-stack food delivery application built using the MERN stack (MongoDB, Express.js, React, Node.js). It provides a seamless experience similar to Swiggy, allowing users to browse restaurants, explore menus, manage carts, place online orders, track order history, and securely handle authentication and payments.

This project follows modern engineering best-practices, uses clean state management, ensures strong security, and integrates real payment and communication services including Razorpay, Resend, Twilio, and Google OAuth.

---

## ✨ Features

### 🔐 Authentication & Security
- User registration with email/phone verification  
- OTP delivery via:
  - **Resend (Email)**
  - **Twilio Voice Calls (Phone)**
- Login via:
  - Email + Password  
  - Google OAuth  
- Password reset via secure emailed token  
- JWT authentication stored in **httpOnly secure cookies**
- Automatic expiration, OTP limits, bcrypt hashing, and signature validation

### 🍔 Restaurant & Menu Browsing
- Real-time restaurant data fetched from Swiggy API via CORS proxy  
- Infinite scrolling with shimmer loading effects  
- Detailed menu pages with:
  - Category-based listing  
  - Search through items & categories  
  - Advanced filters:
    - Veg / Non-Veg  
    - Price range  
    - Rating  
    - Bestsellers  
  - Sorting options (Price low → high / high → low)

### 🛒 Cart & Checkout System
- Persistent cart using Redux Toolkit  
- Add, remove, increment, decrement items  
- Real-time price updates  
- Delivery cost & tax calculation:
  - Delivery Fee: ₹49  
  - Tax: 5%

### 💳 Payment Processing
- **Cash on Delivery (COD)**  
- **Online Payments using Razorpay**
  - Payment verification with HMAC-SHA256 signature validation  
  - Supports UPI, cards, wallets, and net banking

### 👤 User Profile & Dashboard
- View and update personal details  
- Manage multiple saved delivery addresses  
- See full order history including:
  - Items
  - Address
  - Total
  - Payment method  
  - Timestamp

### 🖥️ Modern Frontend Experience
- Built with **React + Vite**
- Styled using **Tailwind CSS**
- Smooth animations with **Framer Motion**
- Form validation using **React Hook Form + Zod**
- Redux Toolkit for state management
- Toast notifications and professional UI

---

## 🧠 Tech Stack

### Frontend
- React  
- React Router DOM  
- Redux Toolkit  
- Tailwind CSS  
- Framer Motion  
- Lucide React / React Icons  
- React Hook Form + Zod  
- Vite  
- Axios

### Backend
- Node.js  
- Express.js  
- MongoDB + Mongoose  
- JWT  
- Bcrypt  
- Razorpay  
- Resend (Email)  
- Twilio (Voice OTP)  
- Google OAuth via Google APIs  
- Node-Cron  
- Cookie Parser & CORS

### Deployment
- **Frontend:** Vercel  
- **Backend:** Render  
- **Database:** MongoDB (likely MongoDB Atlas)

---

## 📁 Folder Structure

### Frontend (Client)
