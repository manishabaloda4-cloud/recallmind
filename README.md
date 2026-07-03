\# 🧠 RecallMind — AI That Never Forgets



> Built for the \*\*WeMakeDevs "Where's My Context?" Cognee Hackathon\*\*



RecallMind is a self-improving AI research assistant that gives AI agents \*\*permanent memory\*\* using Cognee's hybrid graph-vector knowledge engine. No more amnesia. No more "what happened last night?"



!\[RecallMind UI](./screenshots/ui.png)



\## 🎯 The Problem

Every LLM call is stateless. AI agents forget everything between sessions — losing context, repeating mistakes, and starting from zero every time.



\## ✅ The Solution

RecallMind uses \*\*Cognee\*\* to build a permanent, self-hosted knowledge graph so your AI remembers everything across infinite sessions.



\## ✨ Features

\- 📝 \*\*Remember\*\* — Feed any knowledge into the memory graph

\- 🔍 \*\*Recall\*\* — Semantic search across all stored memories

\- 🗑️ \*\*Forget\*\* — Selectively clear specific memories

\- ⚡ \*\*Improve\*\* — Self-optimize memory connections

\- 🔀 \*\*Session Management\*\* — Multiple isolated memory sessions

\- 🌐 \*\*REST API\*\* — Full FastAPI backend with auto docs



\## 🛠️ Tech Stack

| Layer | Technology |

|-------|-----------|

| Memory Engine | Cognee 1.2.2 |

| LLM | Gemini 2.0 Flash |

| Embeddings | HuggingFace sentence-transformers |

| Backend | FastAPI + Python |

| Frontend | React + Vite + Tailwind |

| Graph DB | Cognee's hybrid graph-vector store |



\## 🚀 Quick Start



\### 1. Clone the repo

```bash

git clone https://github.com/manishabaloda4-cloud/recallmind.git

cd recallmind

```



\### 2. Setup Backend

```bash

cd backend

pip install cognee fastapi uvicorn python-dotenv sentence-transformers google-auth

cp .env.example .env

\# Add your Gemini API key to .env

python -m uvicorn main:app --reload --port 8002

```



\### 3. Setup Frontend

```bash

cd frontend

npm install

npm install axios

npx vite

```



\### 4. Open in browser

http://localhost:3001/



\## 🔌 API Endpoints

| Method | Endpoint | Description |

|--------|----------|-------------|

| POST | `/remember` | Store knowledge in memory graph |

| POST | `/recall` | Semantic search across memories |

| POST | `/forget` | Clear specific memories |

| POST | `/improve` | Self-optimize memory connections |

| GET | `/stats` | System status |



\## 🧠 How Cognee Powers RecallMind

1\. \*\*`cognee.add()`\*\* — Ingests text into the knowledge pipeline

2\. \*\*`cognee.cognify()`\*\* — Builds a hybrid graph-vector representation

3\. \*\*`cognee.search()`\*\* — Semantic retrieval across the knowledge graph

4\. \*\*`cognee.improve()`\*\* — Self-distills and strengthens memory connections



\## 👩‍💻 Built By

\*\*Manisha Baloda\*\* — B.Tech AI/ML

\- GitHub: \[@manishabaloda4-cloud](https://github.com/manishabaloda4-cloud)

\- LinkedIn: \[Manisha Baloda](https://linkedin.com/in/manisha-baloda-11a254393)

