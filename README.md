# Airbnb‑style Listing Platform

Full‑stack web app to create, browse, and manage property listings with authentication, image uploads, validation, and a clean EJS UI. Deployed on **Render**.

## 🔗 Live Demo
**Render:** https://wanderlust-9wp7.onrender.com

---

## ✨ Features
- User auth (register/login/logout), sessions, and flash messages
- Create/read/update/delete (CRUD) listings
- Image upload with Cloudinary (secure URLs)*
- Server‑side validation & centralized error handling middleware
- Map token support for showing listing locations*
- MVC structure with Mongoose models and controllers
- Responsive UI with EJS + Bootstrap

\* *If enabled/implemented in your copy — env keys included below.*

---

## 🧱 Tech Stack
- **Backend:** Node.js, Express.js
- **Frontend:** EJS, Bootstrap
- **Database:** MongoDB (Mongoose ODM)
- **Auth/Session:** express-session, passport (or custom middleware)
- **Uploads:** Cloudinary (via `multer`/`multer-storage-cloudinary`)
- **Maps:** Mapbox/Leaflet (via `MAP_TOKEN`)*
- **Utilities:** dotenv, method-override, connect-flash
- **Deployment:** Render

---

## 📂 Project Structure (typical)
```
MAJOR PROJECT/
├─ app.js
├─ package.json
├─ .env                 # not committed
├─ /models
├─ /routes
├─ /controllers
├─ /middleware
├─ /public              # static assets
└─ /views               # EJS templates
```

---

## 🔑 Environment Variables
Create a `.env` file in the root:

```bash
# MongoDB
MONGODB_URI="mongodb+srv://<user>:<pass>@<cluster>/<db>?retryWrites=true&w=majority"

# Sessions
SESSION_SECRET="super-secret-string"

# Cloudinary (if using image upload)
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# Map token (if maps are used)
MAP_TOKEN="your_map_provider_token"
```

> In your EJS, you may expose tokens selectively (e.g., `MAP_TOKEN`) by injecting from `process.env` on server render.

---

## ✅ Prerequisites
- **Node.js 18+** and **npm**
- **MongoDB** (Atlas or local)
- (Optional) **Cloudinary** account for image uploads
- (Optional) **Map provider** token (Mapbox, etc.)

Check:
```bash
node -v
npm -v
```

---

## 🚀 Local Setup
```bash
npm install
# add .env (see above)
npm run dev   # or: npm start
```
Open the printed local URL (e.g., `http://localhost:8080`).

---

## 📜 Scripts (example)
```jsonc
// package.json
{
  "scripts": {
    "dev": "nodemon app.js",
    "start": "node app.js",
    "lint": "eslint ."
  }
}
```

---

## 🛠️ Common Issues
- **MongoDB connection error / whitelist**: Add your IP in Atlas Network Access or use `0.0.0.0/0` for testing.
- **Sessions not persisting**: Ensure `SESSION_SECRET` and cookie/session store are configured.
- **Cloudinary upload fails**: Check Cloudinary credentials; verify multer storage config.
- **CSP / mixed content**: Ensure all external assets use HTTPS.

---

## ☁️ Deploying on Render
1. Push your repo to GitHub.
2. In Render: **New → Web Service → Connect Repo**.
3. Set **Environment** = `Node`.
4. Set **Build Command** = `npm install` (or empty if not needed).
5. Set **Start Command** = `npm start` (or `node app.js`).
6. Add all **Environment Variables** from `.env` in Render dashboard.
7. For **MongoDB**, ensure Render can reach your Atlas cluster (use `0.0.0.0/0` for IP allow-list or add Render egress IP).

---

## 🗺️ Roadmap Ideas
- Role-based permissions (host vs. guest)
- Pagination & search filters
- Image moderation & resizing
- Geocoding & interactive maps
- Rate limiting & helmet for security
- Test suite (Jest + Supertest)

---

## 📄 License
Add a `LICENSE` (e.g., MIT) if you plan to open‑source.
