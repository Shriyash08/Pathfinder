# Pathfinder 🚀

**Pathfinder** is an interactive full-stack career guidance and technology roadmap web application. It features a modern **Next.js** frontend with rich UI animations and a high-performance **FastAPI** backend serving role details and market demand metrics.

---

## 🛠️ Project Structure

```
Pathfinder/
├── backend/          # FastAPI server (Python)
│   ├── main.py       # API endpoints & CORS setup
│   ├── roles_db.json # Career roles database
│   └── requirements.txt
├── frontend/         # Next.js 16 Web Application (React, Tailwind CSS, Framer Motion)
│   ├── src/          # Components & Page layouts
│   └── package.json
└── README.md
```

---

## 🚀 How to Run the Project Locally

Follow these steps to set up and run Pathfinder on your local machine.

### Prerequisites

- **Python 3.8+** installed ([Download Python](https://www.python.org/downloads/))
- **Node.js 18+** & **npm** installed ([Download Node.js](https://nodejs.org/))
- **Git** installed

---

### Step 1: Clone the Repository

```bash
git clone https://github.com/Shriyash08/Pathfinder.git
cd Pathfinder
```

---

### Step 2: Start the Backend (FastAPI)

1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Create and activate a Python virtual environment:
   - **Windows:**
     ```powershell
     python -m venv venv
     .\venv\Scripts\activate
     ```
   - **macOS / Linux:**
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Start the backend server:
   ```bash
   uvicorn main:app --reload --port 8000
   ```
   *The backend API will run at `http://localhost:8000` (interactive API docs available at `http://localhost:8000/docs`).*

---

### Step 3: Start the Frontend (Next.js)

1. Open a **new terminal window** and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install Node dependencies:
   ```bash
   npm install
   ```
3. Start the Next.js development server:
   ```bash
   npm run dev
   ```
4. Open your browser and visit:
   ```
   http://localhost:3000
   ```

---

## 🐳 Running with Docker (Optional)

If you prefer using Docker:

### Backend Docker:
```bash
cd backend
docker build -t pathfinder-backend .
docker run -p 8000:8000 pathfinder-backend
```

### Frontend Docker:
```bash
cd frontend
docker build -t pathfinder-frontend .
docker run -p 3000:3000 pathfinder-frontend
```

---

## ✨ Features & Tech Stack

- **Frontend:** Next.js 16, React 19, Tailwind CSS, Framer Motion, Lucide Icons, Shadcn UI
- **Backend:** FastAPI, Uvicorn, Python
- **Database:** JSON-based dynamic role database with demand scoring algorithms
