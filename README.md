# Pathfinder 🚀

<div align="center">

![Pathfinder Logo](https://img.shields.io/badge/Pathfinder-Career%20Intelligence-6366f1?style=for-the-badge&logo=compass)
![Next.js](https://img.shields.io/badge/Frontend-Next.js%2016-000000?style=for-the-badge&logo=nextdotjs)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi)
![Docker](https://img.shields.io/badge/Containers-Docker%20Ready-2496ed?style=for-the-badge&logo=docker)

**Instant In-Browser Execution & One-Click Cloud Deployment**

Precision roadmaps • Real salaries • 47 Career Paths • Zero-installation Cloud Demo

</div>

---

## ⚡ Instant 1-Click Access (No Local Setup Required)

Launch and run Pathfinder directly in your web browser with a single click:

| Provider | Access Mode | Action |
| :--- | :--- | :--- |
| **GitHub Codespaces** | 🚀 **Instant In-Browser App** | [![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/Shriyash08/Pathfinder) |
| **Vercel** | ⚡ **Deploy Frontend** | [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Shriyash08/Pathfinder&root-directory=frontend) |
| **Render** | 🌐 **Deploy Full-Stack** | [![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/Shriyash08/Pathfinder) |
| **Gitpod** | ☁️ **Cloud IDE Workspace** | [![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/Shriyash08/Pathfinder) |

---

## 🌟 Features

- **Cinematic UI/UX:** Built with Next.js 16, React 19, Framer Motion, and Tailwind CSS.
- **Dynamic Demand Scoring:** Real-time Python/FastAPI backend calculating market confidence & demand trends.
- **Interactive Roadmap Engine:** 47 comprehensive technical workflows, tier-based salary matrices, and curated learning paths.
- **Zero-Config Fallback:** Integrated static fallback mode so the frontend runs seamlessly online even without a backend API.
- **Cloud-Native & Containerized:** Ships with Docker Compose, `.devcontainer`, Render Blueprint, and Vercel configs out-of-the-box.

---

## 🛠️ Architecture & Deployment Modes

### 1. ☁️ GitHub Codespaces (Recommended for Instant Browser Testing)
Click the **[Open in GitHub Codespaces](https://codespaces.new/Shriyash08/Pathfinder)** button. Codespaces will automatically:
1. Provision a container environment.
2. Install all Python & Node dependencies.
3. Start the FastAPI backend and Next.js frontend servers.
4. Launch the preview directly inside your browser window.

---

### 2. 🐳 Docker Compose (1-Command Container Setup)
Run both backend and frontend locally in isolated Docker containers:
```bash
docker-compose up --build
```
- **Frontend App:** `http://localhost:3000`
- **Backend API:** `http://localhost:8000`

---

### 3. 💻 Manual Local Setup

#### Backend (FastAPI):
```bash
cd backend
python -m venv venv
# Windows: .\venv\Scripts\activate | Mac/Linux: source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

#### Frontend (Next.js):
```bash
cd frontend
npm install
npm run dev
```

---

## 📂 Project Structure

```
Pathfinder/
├── .devcontainer/       # 🚀 One-click GitHub Codespaces configuration
│   └── devcontainer.json
├── backend/             # 🐍 FastAPI backend server
│   ├── main.py
│   ├── roles_db.json
│   └── requirements.txt
├── frontend/            # ⚛️ Next.js 16 React frontend
│   ├── src/
│   ├── public/
│   └── vercel.json      # ⚡ Vercel deployment configuration
├── docker-compose.yml   # 🐳 Multi-container orchestration
├── render.yaml          # 🌐 Render Infrastructure-as-Code Blueprint
└── README.md
```
