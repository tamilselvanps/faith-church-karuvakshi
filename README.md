Church React-Bootstrap Website (Fullstack)

Frontend:
  folder: frontend
  tech: React, Vite, React-Bootstrap, react-i18next
  run:
    cd frontend
    npm install
    npm run dev

Server:
  folder: server
  tech: Express, JWT
  run:
    cd server
    npm install
    npm start

Notes:
  - Frontend talks to server on http://localhost:4000 (api.js baseURL)
  - Admin login via /api/login returns JWT; store in localStorage token
  - Change JWT_SECRET in production
