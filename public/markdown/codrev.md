# CodRev AI

**CodRev AI** is an advanced, web-based AI coding assistant designed to supercharge developer productivity. It allows users to review, analyze, fix, and execute code in real-time across multiple programming languages.

Leveraging the speed of **Groq (Llama 3)**, it provides instant feedback, detailed explanations, and production-ready code fixes. It also features a built-in Code Compiler to run your snippets instantly.

## 🌟 Features

### 🧠 AI-Powered Analysis
- **Smart Review**: Get a letter grade (A+ to F) for your code quality.
- **Deep Explanation**: Step-by-step breakdown of logic and flow.
- **Auto-Fix**: Automatically detects bugs, syntax errors, and optimizes code with one click.
- **Security Audit**: Identifies vulnerabilities (OWASP Top 10) and suggests fixes.

### ⚡ Real-Time Execution
- **Integrated Compiler**: Run code directly in the browser using the Piston API.
- **Multi-Language Support**: Write and run JavaScript, Python, Java, C++, Go, Rust, and 15+ other languages.

### 🎨 Modern Developer Experience
- **Monaco Editor**: Professional VS Code-like editing experience.
- **Themes**: Seamless Dark/Light mode toggle.
- **Responsive UI**: optimized for readability and workflow.

## 🛠️ Tech Stack

- **Frontend**: React.js (Vite), TailwindCSS
- **Editor**: Monaco Editor (@monaco-editor/react)
- **AI Engine**: Groq SDK (llama-3.3-70b-versatile) / Google Gemini (Fallback)
- **Compiler**: Piston API calling service
- **Animations**: GSAP, React Spinners
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- A free Groq API Key (from console.groq.com)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ujjwal120605/codrev.git
   cd codrev
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   Create a `.env` file in the root directory:
   ```env
   VITE_GROQ_API_KEY=gsk_your_key_here
   ```

4. **Run the App**
   ```bash
   npm run dev
   ```
   Open http://localhost:5173 to view it in the browser.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👤 Author

**Ujjwal Bajpai**

- **GitHub**: [@Ujjwal120605](https://github.com/Ujjwal120605)
- **LinkedIn**: [Ujjwal Bajpai](https://linkedin.com/in/ujjwal-bajpai)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
