# AssetVerse - Corporate Asset Management System

A B2B web application for managing company physical assets and employee assignments.

## Live URL
[Your Vercel Link Here]

HR:hr@testcompany.com / password: 123456
Employee:employee@test.com / password: 123456

## Key Features
- Role-based access (HR & Employee)
- Asset tracking with request/approve workflow
- Stripe payment for package upgrade
- Recharts analytics dashboard
- Responsive design with DaisyUI
- Firebase Authentication
- Server-side pagination
- PDF print for assets

## npm packages used
- react, react-router-dom
- @tanstack/react-query
- axios
- firebase
- daisyui, tailwindcss
- framer-motion
- recharts
- react-to-print

## Setup Instructions
1. Clone repo
2. npm install
3. Add .env with VITE_ prefixed Firebase config
4. npm run dev

## Environment Variables
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
...