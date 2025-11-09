ZenAI_AI_Backend/
│
├── app/ # Backend (FastAPI)
│ ├── agents/ # AI agent logic
│ ├── core/ # Config, env, and settings
│ ├── db/ # Database layer (PostgreSQL / SQLite)
│ ├── integrations/ # Notion, APIs, or third-party connectors
│ ├── models/ # Pydantic data models
│ ├── routes/ # API routes
│ ├── services/ # Core business logic
│ ├── utils/ # Helper utilities
│ ├── websocket/ # Real-time communication layer
│ └── main.py # App entrypoint
│
├── zenai-frontend/ # Frontend (React + Vite)
│ ├── src/
│ │ ├── api/ # Axios API calls
│ │ ├── components/ # Reusable React components
│ │ ├── styles/ # CSS and UI styling
│ │ ├── App.jsx # Main App wrapper
│ │ └── main.jsx # React entrypoint
│ └── package.json
│
├── .env # Environment configuration
├── requirements.txt # Python dependencies
├── README.md # Project documentation
├── main_prod.py # Production entrypoint
└── changelog.md # Development updates


---

## ⚙️ Tech Stack

| Layer | Technologies |
|-------|---------------|
| **Backend** | FastAPI, LangChain, Groq, Pydantic, AsyncIO |
| **Frontend** | React (Vite), Zustand, TailwindCSS, Framer Motion |
| **Database** | PostgreSQL / SQLite |
| **AI Features** | Whisper (STT), Coqui / ElevenLabs (TTS), LangChain memory |
| **Tools** | GitHub, VSCode, Uvicorn, Python 3.12 |

---

## 🔌 Setup & Installation

### 🧠 Backend Setup

```bash
# Clone the repository
git clone https://github.com/Kasinathan006/ZenAI_AI_Backend.git
cd ZenAI_AI_Backend

# Create a virtual environment
python -m venv venv
venv\Scripts\activate    # (Windows)
# or
source venv/bin/activate # (Mac/Linux)

# Install dependencies
pip install -r requirements.txt

# Start the backend
uvicorn app.main:app --reload