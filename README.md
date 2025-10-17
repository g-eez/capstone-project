```markdown
# 🧠 MedAssist AI - Your AI-powered symptom analysis assistant

This project implements a **Retrieval-Augmented Generation (RAG)** system designed to provide **medical diagnostic measures** based on user-submitted symptoms through an interactive web-based AI chatbot.

The system combines **workflow automation**, **semantic vector retrieval**, and **AI-powered text generation** to deliver accurate and contextually relevant medical insights.

---

## ⚙️ System Overview

The system operates through two interconnected pipelines:

- **Ingestion Pipeline** – Handles data processing, embedding, and storage in a vector database.  
- **Retrieval Pipeline (RAG Query)** – Processes user input, retrieves relevant medical data, and generates a diagnostic response using the Gemini API.

Core components include:

- **n8n (Dockerized):** Workflow automation and orchestration.  
- **Supabase:** Vector storage and semantic search using `pgvector`.  
- **Node.js/Vite:** Frontend and backend logic for user interaction.  
- **Gemini API:** Large Language Model (LLM) for generating diagnostic recommendations.

---

## 🧩 Architecture Overview

The RAG system consists of two main pipelines:

### 1. Ingestion Pipeline

**Purpose:**  
Converts structured medical data into machine-readable embeddings and stores them for retrieval.

**Process:**
1. **Data Source:** Preprocessed CSV file (`preprocessed.csv`) containing columns:
   - `Disease`
   - `Symptoms`
   - `Diagnostic_Measures`
2. **n8n (Dockerized):** Automates the ingestion workflow and embedding process.
3. **Embedding Model:** Transforms textual data into dense vectors capturing semantic meaning.
4. **Supabase (pgvector):** Stores both embeddings and their corresponding text for efficient retrieval.

**In short:**  
The ingestion pipeline handles all data processing and embedding operations. It takes structured medical data (disease names, symptoms, and diagnostic measures), converts them into numerical vector representations, and stores them in the Supabase vector database.

---

### 2. Retrieval Pipeline (RAG Query)

**Purpose:**  
Processes user symptom input and returns the most relevant diagnostic recommendations.

**Process:**
1. **Frontend (Node.js/Vite):** Users enter symptoms into a chatbot interface.
2. **Webhook Trigger:** The Node.js backend sends the user input to an n8n Webhook URL.
3. **n8n Workflow 2:** Executes the RAG logic:
   - Converts user input into an embedding vector.
   - Performs a *k*-nearest neighbors (k-NN) search in Supabase to find similar cases.
   - Retrieves the most relevant disease and diagnostic information.
   - Constructs a context block combining retrieved data and user input.
   - Sends the prompt to the **Gemini API (LLM)** for final text generation.
4. **Response Delivery:** The generated response is returned to the frontend and displayed to the user as a readable diagnosis.

**In short:**  
The Retrieval Pipeline embeds the user query, retrieves semantically similar entries from the vector database, and uses the Gemini API (LLM) to generate a natural-language diagnostic recommendation.

---

## 🧱 Technical Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Data Source** | `preprocessed.csv` | Structured input data for embedding |
| **Workflow Orchestration** | **n8n (Dockerized)** | Manages ingestion and retrieval logic |
| **Vector Database** | **Supabase (pgvector)** | Stores and searches semantic embeddings |
| **Frontend / Backend** | **Node.js + Vite** | User interface and API communication |
| **AI Core** | **Gemini API (LLM)** | Generates final diagnostic text |

---

## 🚀 How It Works (End-to-End)

1. The system administrator uploads a cleaned and formatted dataset (`preprocessed.csv`) containing diseases, symptoms, and diagnostic measures.
2. The **Ingestion Pipeline** in n8n processes the data, generates embeddings, and stores them in Supabase.
3. A user interacts with the chatbot through the **web interface** built with Node.js and Vite.
4. Upon symptom submission, the **Retrieval Pipeline** is triggered via an n8n Webhook.
5. The pipeline embeds the user’s input, performs a vector search in Supabase, retrieves relevant matches, and sends the data to the **Gemini API**.
6. The **Gemini API** generates a clear, human-readable diagnostic measure which is then returned to the chatbot and displayed to the user.

---

## 🧠 Example Workflow

**User Input:**  
> "I have a cough, fever, and chest pain."

**System Actions:**  
1. Input is embedded and sent to Supabase.  
2. Supabase retrieves diseases with similar symptom vectors (e.g., Pneumonia, Bronchitis).  
3. The context and user input are sent to the Gemini API.  
4. Gemini generates an output such as:  
   > "Based on the described symptoms, possible conditions include Pneumonia or Acute Bronchitis. Recommended diagnostic measures: Chest X-ray, sputum test, and complete blood count."

---

## 🧩 Key Features

- **Automated ETL:** n8n workflows streamline ingestion and retrieval operations.  
- **Semantic Search:** Supabase with `pgvector` enables context-aware matching.  
- **AI-Driven Generation:** Gemini API produces coherent, natural-language diagnostics.  
- **Scalable Architecture:** Easily extendable for new datasets or additional pipelines.  
- **Web Integration:** Node.js/Vite interface provides a seamless user experience.

---

## 📁 Folder Structure 

```

/CAPSTONE-PROJECT
│
├── DATA/
│   ├── preprocessed.csv
│   └── respiratory symptoms and treatment...
│
├── med-ask-buddy-main/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   ├── .gitignore
│   ├── bun.lockb
│   ├── components.json
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── README.md
│   ├── tailwind.config.ts
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
│
├── n8n/
│   ├── binaryData/
│   ├── git/
│   ├── nodes/
│   ├── ssh/
│   ├── config
│   ├── crash.journal
│   ├── database.sqlite
│   ├── n8nEventLog-1.log
│   ├── n8nEventLog-2.log
│   ├── n8nEventLog-3.log
│   └── n8nEventLog.log
│
├── Notebooks/
│   └── data understanding and preprocessi...
│
├── .gitignore
└── Group 4 Project proposal.pdf

```

---


## 🏁 Summary

The Symptom Diagnosis RAG System represents a practical AI-powered medical assistant combining automation, retrieval, and generation into a unified pipeline.  
By leveraging **n8n**, **Supabase**, **Node.js**, and the **Gemini API**, the system delivers accurate, contextually aware diagnostic recommendations — bridging the gap between users and accessible, low-cost medical guidance.

---
```
Group 4 members
Mohamed Abdi Sheikh
George Kariuki
Deborah Omondi
