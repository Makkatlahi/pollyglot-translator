# PollyGlot Translator 🦜

A simple web app for translating text into multiple languages using GitHub's AI models API. Built with vanilla JavaScript and Vite, this project demonstrates client-side API integration and a clean, responsive UI.

---

## Features

- **Translate text** into Spanish, French, German, or Italian
- **Radio button** language selection
- **Copy to clipboard** for translated text
- **Responsive design** for desktop and mobile
- **Direct API integration** with GitHub AI models

---

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Build Tool:** Vite
- **API:** GitHub AI Models (GPT-4.1)

---

## Project Structure

```
pollyglot-translator/
├── assets/
│   ├── parrot.png
│   └── worldmap.png
├── index.html
├── index.js
├── index.css
├── package.json
├── .env
├── .gitignore
└── README.md
```

---

## Setup & Installation

### Prerequisites

- Node.js (v18 or higher)
- GitHub Personal Access Token with access to GitHub AI models

### Steps

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd pollyglot-translator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Create a `.env` file in the root directory:
     ```env
     VITE_OPENAI_API_KEY=your_github_personal_access_token_here
     ```
   - (Your `.env` should look like this:)
     ```
     VITE_OPENAI_API_KEY=github_pat_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
     ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   - Open [http://localhost:5173](http://localhost:5173) in your browser.

5. **Build for production**
   ```bash
   npm run build
   ```
   - The output will be in the `dist/` folder.

---

## Usage

1. Enter the text you want to translate.
2. Select the target language using the radio buttons.
3. Click the "Translate" button.
4. The translated text will appear below, with an option to copy it to your clipboard.

---

## Environment Variables

| Variable               | Description                                | Required |
|------------------------|--------------------------------------------|----------|
| `VITE_OPENAI_API_KEY`  | GitHub Personal Access Token for AI models | Yes      |

**Note:** The API key is exposed in the client bundle. For production or sensitive use, consider a backend proxy.

---

## API Details

- **Endpoint:** `https://models.github.ai/inference/chat/completions`
- **Model:** `openai/gpt-4.1`
- **Authentication:** Bearer token (GitHub PAT)

---

## Security Notice

- ⚠️ The API key is visible in the client-side code after build.
- For public or production deployments, use a backend to keep your key secret.

---

## Troubleshooting

- **API errors:** Check your browser console for error messages.
- **Invalid API key:** Make sure your GitHub PAT is valid and has access to AI models.
- **Build errors:** Ensure Node.js is v18+ and dependencies are installed.

---

## License

MIT

---

Made with ❤️ for language lovers!