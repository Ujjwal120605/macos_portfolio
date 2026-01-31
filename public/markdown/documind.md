# 🧠 DocuMind

**AI-Powered Document Understanding with Gemini**

🚀 [Live Demo](https://rag-henna.vercel.app/) • 📖 [GitHub Repository](https://github.com/Ujjwal120605/rag)

DocuMind is an interactive AI Document Analyzer built with Streamlit and Google Gemini, allowing you to chat with your PDFs, extract insights, and summarize complex documents in seconds.

## 🚀 Features

*   **Chat with Data**: Upload a PDF and ask questions in natural language.
*   **Deep Insights**: Extract text content and summarize complex documents.
*   **Interactive UI**: Built with Streamlit for a seamless chat-like experience.
*   **Production Ready**: Optimized and deployed for fast global access.

## 🛠️ Tech Stack

| Component | Technology Used |
| :--- | :--- |
| **Frontend/UI** | Streamlit |
| **Backend LLM** | Google Gemini API |
| **Environment** | python-dotenv |
| **Text Extraction** | PyPDF2 / pdfminer / langchain |
| **Vector Storage** | ChromaDB or FAISS |
| **Language** | Python 3.10+ |

## 🧠 How It Works

1.  **Upload a PDF**: The app extracts text content from your document.
2.  **Chunk & Embed**: Text is split into chunks and stored for efficient retrieval.
3.  **Ask Questions**: The Gemini model uses context to answer queries intelligently.
4.  **Get Answers**: Real-time responses in a chat interface.

## 🧾 Example Use Cases

*   Research paper summarization
*   Legal document understanding
*   Resume screening
*   Policy and report comparison

## 🚀 Getting Started

1.  **Clone the repository**
    ```bash
    git clone https://github.com/Ujjwal120605/rag.git
    cd rag
    ```

2.  **Create a virtual environment**
    ```bash
    python3 -m venv venv
    source venv/bin/activate
    ```

3.  **Install dependencies**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Add your Gemini API key**
    Create a `.env` file:
    ```ini
    GOOGLE_API_KEY=your_google_gemini_api_key
    ```

5.  **Run the app**
    ```bash
    streamlit run app.py
    ```

## 👥 Author

**Ujjwal Bajpai**
*   GitHub: [@Ujjwal120605](https://github.com/Ujjwal120605)
*   LinkedIn: [Ujjwal Bajpai](https://www.linkedin.com/in/ujjwal-bajpai-9aa242289/)
