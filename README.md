# Road-Safety-Hackathon-IITM-Genz-Alpha-Coders

# 🛣️ Road Sahayak 24/7 & Sadak Sathi AI Chatbot

> **IIT Madras Road Safety Hackathon 2026 Submission** > *Built by Team: GEN Z ALPHA CODERS*

An AI-powered, offline-capable emergency response and triage system designed to eliminate critical delays during road accidents. Road Sahayak integrates a centralized emergency dashboard with **Sadak Sathi**, a voice-activated, multilingual AI assistant powered by Google's Gemini 1.5 Flash.

---

## ✨ Key Features
* **One-Tap SOS:** Instantly dispatches alerts and routes to the nearest police and ambulance services.
* **Sadak Sathi AI Chatbot:** Conversational AI that performs emergency triage, guides bystanders with first-aid, and operates via voice (Web Speech API).
* **Multilingual Support:** Fully functional across 6 languages (English, Hindi, Tamil, Telugu, Odia, Marathi).
* **Hallucination-Free Geolocation:** Merges live user GPS data with a robust local JSON database to provide accurate distances to verified trauma centers.
* **Offline-First Architecture:** Caches critical contact data and UI elements to remain functional in highway network dead zones.

---

## 🛠️ Tech Stack
* **Frontend:** HTML5, CSS3 (Glassmorphism UI), Vanilla JavaScript (ES6 Modules)
* **Build Tool:** [Vite](https://vitejs.dev/) for ultra-fast compilation and asset bundling.
* **AI/NLP Engine:** Google Gemini API (`@google/generative-ai` SDK).
* **Data Parsing:** Python (`xlsx` libraries) to compile raw regional data into highly optimized `data.json` local storage.

---

## ⚙️ Local Installation & Setup

Follow these steps to run the project locally on your machine.

### Prerequisites
Make sure you have the following installed on your system:
* [Node.js](https://nodejs.org/) (v16.0 or higher)
* [Git](https://git-scm.com/)
* A free [Google Gemini API Key](https://aistudio.google.com/)

### 1. Clone the Repository
Open your terminal and run:
```bash
git clone [https://github.com/YOUR_USERNAME/road-sahayak-247.git](https://github.com/YOUR_USERNAME/road-sahayak-247.git)
cd road-sahayak-247

```

### 2. Install Dependencies

Since the project uses Vite, install the required node modules:

```bash
npm install

```

### 3. Configure the Environment Variables (API Key)

To keep the Gemini API key secure, we use environment variables.

1. Create a new file in the root directory named `.env`.
2. Add your Gemini API key to the file like this:

```env
VITE_GEMINI_API_KEY="AIzaSyYourActualKeyHere..."

```

*(Note: The `.env` file is included in `.gitignore` and will not be pushed to GitHub to protect your credentials.)*

### 4. Run the Development Server

Start the Vite development server:

```bash
npm run dev

```

Open your browser and navigate to the URL provided in the terminal (usually `http://localhost:5173/`).

---

## 📂 Project Structure

```text
road-sahayak-247/
├── index.html              # Main application dashboard
├── src/
│   ├── style.css           # Global styles and UI design
│   ├── app.js              # Core SOS logic and UI state management
│   ├── chatbot.js          # Sadak Sathi AI integration and prompt engineering
│   └── data.json           # Offline database of verified emergency contacts
├── scripts/
│   └── excel_to_json.py    # Python script used for backend data parsing
├── .env.example            # Template for environment variables
├── package.json            # Node.js dependencies and scripts
└── README.md               # Project documentation

```

---

## 🧪 Testing the Application

1. **Triggering SOS:** Click the main SOS button to see the geolocation routing logic in action.
2. **Chatbot Triage:** Open the Sadak Sathi module and type or speak: *"There is a severe crash, the driver is bleeding."* The AI will parse the intent, provide first-aid instructions, and pull the nearest hospital from the `data.json` file.
3. **Language Switching:** Toggle the language settings in the UI to test the multilingual NLP capabilities.

---

## 👥 The Team

**GEN Z ALPHA CODERS**

* Kumar Harshvardhan
* Damanlovedeep Singh
* Vibhor Srivastava
* Rudra Kumar Shrivastava
* Somil Khandelwal
* Rehman Saini

*Passionate about making Indian roads safer through intelligent technology.*

```

***

### A Quick Tip Before You Submit:
Make sure you replace `https://github.com/YOUR_USERNAME/road-sahayak-247.git` in the **Clone the Repository** step with the actual link to your GitHub repository! 
 Good luck with the IIT Madras Hackathon submission!

```
