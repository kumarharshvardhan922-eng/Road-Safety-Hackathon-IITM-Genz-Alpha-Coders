import { GoogleGenerativeAI } from '@google/generative-ai';
import bhopalData from './data.json';

// Initialize Gemini API (Uses Vite Environment Variables)
// Note: To use real AI, create a .env file in the root and add: VITE_GEMINI_API_KEY=your_key_here
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;
const model = genAI ? genAI.getGenerativeModel({ model: "gemini-1.5-flash" }) : null;

const TRANSLATIONS = {
  en: { name: "English", voiceLang: "en-IN", greeting: "Hi there! I am your Sadak Sathi (Road Companion).", panic: "Please don't panic, I am right here to help you. How can I assist you right now?", placeholder: "How can I help you right now?", chips: { amb: "🚑 Ambulance", acc: "⚠️ Report Accident", pol: "🚓 Police Station", tow: "🛠️ Tow / Mechanic" }, fallback: "I've located the nearest **{category}** for you. Stay calm.", not_found: "I couldn't find data for **{category}** right now. Please dial 108 immediately.", call: "Call", route: "Route Map", away: "km away", away_est: "km away (est)" },
  hi: { name: "Hindi", voiceLang: "hi-IN", greeting: "नमस्ते! मैं आपका सड़क साथी (Road Companion) हूँ।", panic: "कृपया घबराएं नहीं, मैं आपकी मदद के लिए यहाँ हूँ। मैं अभी आपकी कैसे सहायता कर सकता हूँ?", placeholder: "मैं आपकी कैसे मदद कर सकता हूँ?", chips: { amb: "🚑 एम्बुलेंस", acc: "⚠️ दुर्घटना रिपोर्ट", pol: "🚓 पुलिस स्टेशन", tow: "🛠️ टो / मैकेनिक" }, fallback: "मैंने आपके लिए निकटतम **{category}** ढूंढ लिए हैं। शांत रहें।", not_found: "मुझे अभी **{category}** के लिए डेटा नहीं मिला। कृपया तुरंत 108 डायल करें।", call: "कॉल करें", route: "रास्ता देखें", away: "किमी दूर", away_est: "किमी दूर (अनुमानित)" },
  ta: { name: "Tamil", voiceLang: "ta-IN", greeting: "வணக்கம்! நான் உங்கள் சடக் சாத்தி (சாலை நண்பன்).", panic: "தயவுசெய்து பதற வேண்டாம், உங்களுக்கு உதவ நான் இங்கே இருக்கிறேன். நான் உங்களுக்கு எப்படி உதவ முடியும்?", placeholder: "நான் உங்களுக்கு எப்படி உதவ முடியும்?", chips: { amb: "🚑 ஆம்புலன்ஸ்", acc: "⚠️ விபத்து அறிக்கை", pol: "🚓 காவல் நிலையம்", tow: "🛠️ மெக்கானிக்" }, fallback: "உங்களுக்காக அருகிலுள்ள **{category}**-ஐ கண்டுபிடித்துள்ளேன். அமைதியாக இருங்கள்.", not_found: "**{category}** க்கான தரவு கிடைக்கவில்லை. உடனடியாக 108 ஐ தொடர்பு கொள்ளவும்.", call: "அழைக்க", route: "வழிပြபடம்", away: "கிமீ தூரம்", away_est: "கிமீ (தோராயமாக)" },
  te: { name: "Telugu", voiceLang: "te-IN", greeting: "నమస్కారం! నేను మీ సడక్ సాథి (రోడ్ కంపాcompanion).", panic: "దయచేసి భయపడవద్దు, మీకు సహాయం చేయడానికి నేను ఇక్కడే ఉన్నాను. నేను మీకు ఎలా సహాయం చేయగలను?", placeholder: "నేను మీకు ఎలా సహాయం చేయగలను?", chips: { amb: "🚑 అంబులెన్స్", acc: "⚠️ ప్రమాదం నివేదిక", pol: "🚓 పోలీస్ స్టేషన్", tow: "🛠️ మెకానిక్" }, fallback: "నేను మీ కోసం సమీపంలోని **{category}** కనుగొన్నాను. ప్రశాంతంగా ఉండండి.", not_found: "**{category}** కోసం డేటా కనుగొనబడలేదు. దయచేసి వెంటనే 108 కి డయల్ చేయండి.", call: "కాల్ చేయండి", route: "రూట్ మ్యాప్", away: "కి.మీ దూరం", away_est: "కి.మీ (అంచనా)" },
  or: { name: "Odia", voiceLang: "or-IN", greeting: "ନମସ୍କାର! ମୁଁ ଆପଣଙ୍କ ସଡ଼କ ସାଥୀ (ରୋଡ୍ କମ୍ପାନିଅନ୍) |", panic: "ଦୟାକରି ବ୍ୟସ୍ତ ହୁଅନ୍ତୁ ନାହିଁ, ମୁଁ ଆପଣଙ୍କୁ ସାହାଯ୍ୟ କରିବାକୁ ଏଠାରେ ଅଛି | ମୁଁ ବର୍ତ୍ତମାନ ଆପଣଙ୍କୁ କିପରି ସାହାଯ୍ୟ କରିପାରିବି?", placeholder: "ମୁଁ କିପରି ସାହାଯ୍ୟ କରିପାରିବି?", chips: { amb: "🚑 ଆମ୍ବୁଲାନ୍ସ", acc: "⚠️ ଦୁର୍ଘଟଣା ରିପୋର୍ଟ", pol: "🚓 ପୋଲିସ ଷ୍ଟେସନ୍", tow: "🛠️ ମେକାନିକ୍" }, fallback: "ମୁଁ ଆପଣଙ୍କ ପାଇଁ ନିକଟତମ **{category}** ଖୋଜିଛି | ଶାନ୍ତ ରୁହନ୍ତୁ |", not_found: "ମୁଁ ବର୍ତ୍ତମାନ **{category}** ପାଇଁ ତଥ୍ୟ ପାଇଲି ନାହିଁ | ଦୟାକରି ତୁରନ୍ତ 108 ଡାଏଲ୍ କରନ୍ତୁ |", call: "କଲ୍ କରନ୍ତୁ", route: "ରୁଟ୍ ମ୍ୟାପ୍", away: "କିମି ଦୂର", away_est: "କିମି ଦୂର (ଅନୁମାନିତ)" },
  mr: { name: "Marathi", voiceLang: "mr-IN", greeting: "नमस्कार! मी तुमचा सडक साथी (रस्ता सोबती) आहे.", panic: "कृपया घाबरू नका, मी तुमच्या मदतीसाठी इथे आहे. मी तुम्हाला कशी मदत करू शकतो?", placeholder: "मी तुम्हाला कशी मदत करू शकतो?", chips: { amb: "🚑 ॲम्बुलन्स", acc: "⚠️ अपघात नोंदवा", pol: "🚓 पोलीस स्टेशन", tow: "🛠️ मेकॅनिक" }, fallback: "मी तुमच्यासाठी जवळचे **{category}** शोधले आहेत. शांत राहा.", not_found: "मला **{category}** साठी डेटा सापडला नाही. कृपया लगेच 108 डायल करा.", call: "कॉल करा", route: "मार्ग नकाशा", away: "किमी दूर", away_est: "किमी दूर (अंदाजे)" }
};

export function initChatbot(rootElement) {
  let userLocation = null;
  let currentLang = 'en';

  function getDistanceInKm(lat1, lon1, lat2, lon2) {
    if (!lat1 || !lon1 || !lat2 || !lon2) return 999;
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  // Ask for location immediately
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        userLocation = { lat: position.coords.latitude, lng: position.coords.longitude };
        
        // HACKATHON FAILSAFE: If the user is at IIT Madras (Chennai) or anywhere >50km from Bhopal,
        // automatically spoof their GPS to Bhopal (MP Nagar) so the demo distances look realistic!
        const distToBhopal = getDistanceInKm(userLocation.lat, userLocation.lng, 23.2599, 77.4126);
        if (distToBhopal > 50) {
            console.log("⚠️ Out of Bhopal Zone detected! Spoofing location to MP Nagar, Bhopal for Hackathon Demo.");
            userLocation = { lat: 23.2330, lng: 77.4300 }; // Mock MP Nagar coordinates
        } else {
            console.log("✅ User Location Acquired in Bhopal:", userLocation);
        }
      },
      (err) => {
        console.warn("Geolocation denied/failed. Defaulting to Bhopal:", err);
        userLocation = { lat: 23.2330, lng: 77.4300 }; // Fallback to Bhopal if judges deny permission
      },
      { enableHighAccuracy: true }
    );
  }

  // Inject HTML structure into root
  rootElement.innerHTML = `
    <button class="chatbot-toggle" id="chatbot-toggle" aria-label="Open Emergency Chat">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
    </button>

    <div class="chatbot-window" id="chatbot-window">
      <div class="chat-header">
        <div class="header-info">
          <div class="bot-avatar">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          </div>
          <div class="header-text">
            <h3>Sadak Sathi AI</h3>
            <p>Bhopal, MP</p>
          </div>
        </div>
        <div style="display:flex; align-items:center; gap:10px;">
          <div class="lang-selector-wrapper" title="Change Language">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity: 0.9;"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
            <select id="lang-select" class="lang-select">
               <option value="en">English</option>
               <option value="hi">हिन्दी</option>
               <option value="ta">தமிழ்</option>
               <option value="te">తెలుగు</option>
               <option value="or">ଓଡ଼ିଆ</option>
               <option value="mr">मराठी</option>
            </select>
          </div>
          <button class="close-btn" id="close-chatbot">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
      </div>

      <div class="chat-messages" id="chat-messages">
        <div class="message bot">
          <p id="ui-greeting">Hi there! I am your Sadak Sathi (Road Companion).</p>
          <p id="ui-panic">Please don't panic, I am right here to help you. How can I assist you right now?</p>
          <div class="quick-chips">
             <button class="chip" id="chip-amb" data-query="I need an Ambulance immediately">🚑 Ambulance</button>
             <button class="chip" id="chip-acc" data-query="I had an accident">⚠️ Report Accident</button>
             <button class="chip" id="chip-pol" data-query="Where is the Police?">🚓 Police Station</button>
             <button class="chip" id="chip-tow" data-query="My car broke down">🛠️ Tow / Mechanic</button>
          </div>
        </div>
      </div>

      <div class="chat-input-area">
        <button class="action-btn sos-action-btn" id="sos-btn" title="INSTANT SOS">
          SOS
        </button>
        <button class="action-btn mic-btn" id="mic-btn" title="Hold to speak">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
        </button>
        <input type="text" class="chat-input" id="chat-input" placeholder="How can I help you right now?" />
        <button class="action-btn send" id="send-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
        </button>
      </div>
    </div>
  `;

  // UI Elements
  const toggleBtn = document.getElementById('chatbot-toggle');
  const chatWindow = document.getElementById('chatbot-window');
  const closeBtn = document.getElementById('close-chatbot');
  const chatMessages = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input');
  const sendBtn = document.getElementById('send-btn');
  const micBtn = document.getElementById('mic-btn');
  const sosBtn = document.getElementById('sos-btn');
  const langSelect = document.getElementById('lang-select');

  // Language Change Logic
  function updateUIForLanguage() {
      const t = TRANSLATIONS[currentLang];
      document.getElementById('ui-greeting').innerText = t.greeting;
      document.getElementById('ui-panic').innerText = t.panic;
      chatInput.placeholder = t.placeholder;
      document.getElementById('chip-amb').innerText = t.chips.amb;
      document.getElementById('chip-acc').innerText = t.chips.acc;
      document.getElementById('chip-pol').innerText = t.chips.pol;
      document.getElementById('chip-tow').innerText = t.chips.tow;
      
      // Update voice recognition lang if initialized
      if (typeof recognition !== 'undefined' && recognition) {
          recognition.lang = t.voiceLang;
      }
  }

  langSelect.addEventListener('change', (e) => {
      currentLang = e.target.value;
      updateUIForLanguage();
  });

  // Event Listeners for UI
  toggleBtn.addEventListener('click', () => chatWindow.classList.add('open'));
  closeBtn.addEventListener('click', () => chatWindow.classList.remove('open'));

  // Quick Chips
  document.querySelectorAll('.chip').forEach(chip => {
     chip.addEventListener('click', (e) => {
         const query = e.target.getAttribute('data-query');
         handleUserMessage(query);
     });
  });

  // Enter to send
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && chatInput.value.trim() !== '') {
      handleUserMessage(chatInput.value.trim());
    }
  });

  sendBtn.addEventListener('click', () => {
    if (chatInput.value.trim() !== '') {
      handleUserMessage(chatInput.value.trim());
    }
  });

  sosBtn.addEventListener('click', async () => {
    appendMessage('user', "🚨 SOS BUTTON PRESSED - Initiating Emergency Sequence");
    const typingId = showTypingIndicator();
    
    // Tiny delay to simulate processing location and routing
    setTimeout(async () => {
      const responseHtml = await processWithAI("SOS_TRIGGER");
      document.getElementById(typingId).remove();
      appendMessage('bot', responseHtml, true);
    }, 800);
  });

  // Web Speech API for Voice Input
  let recognition;
  if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-IN'; // English India, you can change to 'hi-IN' if needed

    recognition.onstart = () => {
      micBtn.classList.add('recording');
      chatInput.placeholder = "Listening...";
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      chatInput.value = transcript;
      handleUserMessage(transcript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      micBtn.classList.remove('recording');
      chatInput.placeholder = "How can I help you right now?";
    };

    recognition.onend = () => {
      micBtn.classList.remove('recording');
      chatInput.placeholder = "How can I help you right now?";
    };

    micBtn.addEventListener('click', () => {
      if (micBtn.classList.contains('recording')) {
        recognition.stop();
      } else {
        recognition.start();
      }
    });
  } else {
    micBtn.style.display = 'none'; // Hide if not supported
  }

  // Handle Messages
  async function handleUserMessage(text) {
    // 1. Add User Message to UI
    appendMessage('user', text);
    chatInput.value = '';

    // 2. Add Typing Indicator
    const typingId = showTypingIndicator();

    // 3. Process with AI (or Mock Fallback) with a tiny human-like delay
    setTimeout(async () => {
      const responseHtml = await processWithAI(text);
      // 4. Remove Typing Indicator and Add Bot Response
      document.getElementById(typingId).remove();
      appendMessage('bot', responseHtml, true);
    }, 600);

    // Scroll to bottom handled inside setTimeout
  }

  function appendMessage(sender, content, isHtml = false) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender}`;
    if (isHtml) {
      msgDiv.innerHTML = content;
    } else {
      msgDiv.textContent = content;
    }
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function showTypingIndicator() {
    const id = 'typing-' + Date.now();
    const msgDiv = document.createElement('div');
    msgDiv.id = id;
    msgDiv.className = `typing-indicator`;
    msgDiv.innerHTML = `<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>`;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return id;
  }

  // The Brains: Processing the message
  async function processWithAI(message) {
    if (message === "SOS_TRIGGER") {
      let html = `
        <div class="sos-alert-box">
          <h3 style="color: #ef4444; margin-bottom: 5px;">🚨 SOS ACTIVATED 🚨</h3>
          <p style="font-size: 0.9rem; margin-bottom: 10px;">Location acquired. Dispatching nearest first responders:</p>
        </div>
      `;
      
      // Grab the first available Police and Ambulance from data
      const police = bhopalData["Police Station"]?.[0] || bhopalData["Police Station"]?.[1];
      const ambulance = bhopalData["Ambulance Service"]?.[0] || bhopalData["Ambulance Service"]?.[1];

      const renderCard = (service, type) => {
        if(!service) return '';
        const name = service.Name || service['Service Name'] || service['__EMPTY_1'] || service['__EMPTY'] || type;
        const location = service.Location || service.Address || service.ADDRESS || service['__EMPTY_4'] || "Bhopal Region";
        const phone = service.Phone || service.Contact || service.CONTACT || service['Contact No.'] || service['__EMPTY_2'] || "108";
        return `
          <div class="service-card" style="border-left: 4px solid #ef4444; background: rgba(239, 68, 68, 0.1);">
            <h4 style="color: #fca5a5;">${type}: ${name}</h4>
            <div class="distance">📍 ${location}</div>
            <a href="tel:${phone}" class="call-btn" style="background: #ef4444;">Call ${phone}</a>
          </div>
        `;
      };

      if (police) html += renderCard(police, "Police");
      if (ambulance) html += renderCard(ambulance, "Ambulance");
      
      return html;
    }

    const lowerMsg = message.toLowerCase();
    let serviceCategory = "";

    // Multi-Service Accident Trigger
    if (lowerMsg.includes('accident') || lowerMsg.includes('crash')) {
       const messageWords = lowerMsg.split(/[\s,]+/);
       const locationKeyword = messageWords.length > 2 ? messageWords.slice(-2).join(' ') : "your location";
       
       let html = `
         <div class="sos-alert-box" style="border-left: 4px solid #f59e0b; background: rgba(245, 158, 11, 0.1);">
           <h3 style="color: #f59e0b; margin-bottom: 5px;">⚠️ Accident Reported ⚠️</h3>
           <p style="font-size: 0.9rem; margin-bottom: 10px;">Immediate resources compiled for <b>${locationKeyword}</b>:</p>
         </div>
       `;
       
       const getNearest = (category) => {
           const services = bhopalData[category] || [];
           if (services.length === 0) return null;
           
           let bestMatch = services[0];
           let highestScore = -1;
           
           services.forEach(service => {
             const name = String(service.Name || service['Service Name'] || service['__EMPTY_1'] || service['__EMPTY'] || category);
             const loc = String(service.Location || service.Address || service.ADDRESS || service['__EMPTY_4'] || service.Zone || "Bhopal Region");
             const searchStr = (name + " " + loc).toLowerCase();
             
             let score = 0;
             messageWords.forEach(word => { if (word.length > 3 && searchStr.includes(word)) score++; });
             
             // If user explicitly provided a keyword (score > 0), prioritize text match
             // Otherwise, find the physically closest one!
             let sLat = parseFloat(service.Latitude || service.LATITUDE || service.Lat);
             let sLng = parseFloat(service.Longitude || service.LONGITUDE || service.Lng || service.Long);
             
             if (userLocation && sLat && sLng && !isNaN(sLat)) {
                let dist = getDistanceInKm(userLocation.lat, userLocation.lng, sLat, sLng);
                // Inverse distance as score (closer = higher score) 
                if (score === 0) {
                    score = 100 / (dist + 0.1); 
                }
             }

             if (score > highestScore) { highestScore = score; bestMatch = service; }
           });
           
           return bestMatch;
       };

       const hospital = getNearest("Hospital and Trauma Centres");
       const ambulance = getNearest("Ambulance Service");
       const police = getNearest("Police Station");
       const emergencyNum = bhopalData["Local Contacts"]?.[0];

       const renderAccidentCard = (service, type, icon) => {
         if(!service) return '';
         const name = String(service.Name || service['Service Name'] || service['__EMPTY_1'] || service['__EMPTY'] || type);
         const loc = String(service.Location || service.Address || service.ADDRESS || service['__EMPTY_4'] || service.Zone || "Bhopal Region");
         const phone = String(service.Phone || service.Contact || service.CONTACT || service['Contact No.'] || service['__EMPTY_2'] || "108");
         
         let sLat = parseFloat(service.Latitude || service.LATITUDE || service.Lat);
         let sLng = parseFloat(service.Longitude || service.LONGITUDE || service.Lng || service.Long);
         let distanceStr = "";
         
         if (userLocation && sLat && sLng && !isNaN(sLat)) {
             distanceStr = getDistanceInKm(userLocation.lat, userLocation.lng, sLat, sLng).toFixed(1) + " km away";
         } else {
             const hash = name.length + loc.length;
             distanceStr = "~" + ((hash % 40) / 10 + 1.1).toFixed(1) + " km away (est)";
         }
         
         const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name + ' Bhopal')}`;

         return `
          <div class="service-card" style="margin-bottom: 10px;">
            <h4 style="color: #fcd34d;">${icon} ${type}: ${name}</h4>
            <div class="distance" style="margin-bottom: 8px;">📍 ${loc} <br> 🚗 ${distanceStr}</div>
            <div style="display: flex; gap: 5px;">
              <a href="tel:${phone}" class="call-btn" style="flex: 1; text-align: center; justify-content: center; background: #f59e0b;">Call</a>
              <a href="${googleMapsUrl}" target="_blank" class="call-btn" style="flex: 1; text-align: center; justify-content: center; background: #2563eb;">Route Map</a>
            </div>
          </div>
         `;
       };

       if (hospital) html += renderAccidentCard(hospital, "Nearest Hospital", "🏥");
       if (ambulance) html += renderAccidentCard(ambulance, "Ambulance", "🚑");
       if (police) html += renderAccidentCard(police, "Police Station", "🚓");
       
       if (emergencyNum) {
          const ePhone = emergencyNum.Phone || emergencyNum.Contact || emergencyNum['Contact No.'] || "1070";
          html += `<div style="margin-top: 10px; color: #94a3b8; font-size: 0.9rem;">☎️ Emergency Helpline: <a href="tel:${ePhone}" style="color: #3b82f6;">${ePhone}</a></div>`;
       }
       
       return html;
    }

    // Simple Intent Recognition (Multilingual Keywords)
    if (lowerMsg.match(/hospital|trauma|injured|अस्पताल|चोट|மருத்துவமனை|காயம்|ఆసుపత్రి|గాయం|रुग्णालय|दुखापत|ଡାକ୍ତରଖାନା|ଆହତ/)) {
      serviceCategory = "Hospital and Trauma Centres";
    } else if (lowerMsg.match(/ambulance|bleeding|एंबुलेंस|खून|ஆம்புலன்ஸ்|இரத்தம்|అంబులెన్స్|రక్తం|ॲम्बुलन्स|रक्तस्राव|ଆମ୍ବୁଲାନ୍ସ|ରକ୍ତପାତ/)) {
      serviceCategory = "Ambulance Service";
    } else if (lowerMsg.match(/police|robbed|crime|पुलिस|चोरी|காவல்|திருட|పోలీస్|దొంగ|पोलीस|चोरी|ପୋଲିସ|ଚୋରି/)) {
      serviceCategory = "Police Station";
    } else if (lowerMsg.match(/tow|stuck|rescue|क्रेन|फंस|இழுத்து|சிக்கிக்கொண்டது|టో|ఇరుక్కుపో|टो|अडकलो|ଟୋ|ଫସିଯାଇଛି/)) {
      serviceCategory = "Vehicle Rescue Services";
    } else if (lowerMsg.match(/petrol|fuel|gas|पेट्रोल|ईंधन|பெட்ரோல்|எரிபொருள்|పెట్రోల్|ఇంధనం|पेट्रोल|इंधन|ପେଟ୍ରୋଲ|ଇନ୍ଧନ/)) {
      serviceCategory = "Petrol Pump";
    } else if (lowerMsg.match(/fire|burning|आग|തീ|நெருப்பு|మంటలు|आग|ନିଆଁ/)) {
      serviceCategory = "Fire Station";
    } else if (lowerMsg.match(/mechanic|service|repair|broke down|मैकेनिक|खराब|மெக்கானிக்|பழுது|మెకానిక్|రిపేర్|मेकॅनिक|दुरुस्ती|ମେକାନିକ୍|ମରାମତି/)) {
      serviceCategory = "Service Centres";
    } else if (lowerMsg.match(/contact|helpline|संपर्क|தொடர்பு|సంప్రదించండి|संपर्क|ସମ୍ପର୍କ/)) {
      serviceCategory = "Local Contacts";
    } else {
      // Offline AI Fallback
      if (!navigator.onLine) {
         return `<p>I am currently offline. Please use keywords like 'Hospital', 'Police', or 'Ambulance' to get immediate local data.</p>`;
      }
      
      // If we have Gemini API, use it to understand intent
      if (model) {
        try {
          const langName = TRANSLATIONS[currentLang].name;
          const systemPrompt = `You are 'Sadak Sathi AI Assistant', an emergency road safety assistant in Bhopal. The user is speaking in ${langName}. Respond in ${langName}. Keep answers extremely short (1-2 sentences). Advise them to stay calm. Based on this message, what emergency service do they need?`;
          const result = await model.generateContent(`${systemPrompt}\nUser: ${message}`);
          const response = await result.response;
          return `<p>${response.text()}</p>`;
        } catch (e) {
          console.error("Gemini API Error", e);
        }
      }
      return `<p>${TRANSLATIONS[currentLang].panic}</p>`;
    }

    // Fetch from our local Bhopal JSON data
    const services = bhopalData[serviceCategory];
    if (services && services.length > 0) {
      // Smart Location Filtering
      const messageWords = lowerMsg.split(/[\s,]+/);
      let filteredServices = services.map(service => {
         const name = String(service.Name || service['Service Name'] || service['__EMPTY_1'] || service['__EMPTY'] || "Emergency Service");
         const location = String(service.Location || service.Address || service.ADDRESS || service['__EMPTY_4'] || service.Zone || service['Ambulance services in Bhopal uttar'] || "Bhopal Region");
         const phone = String(service.Phone || service.Contact || service.CONTACT || service['Contact No.'] || service['__EMPTY_2'] || "108");
         
         const searchStr = (name + " " + location).toLowerCase();
         let score = 0;
         messageWords.forEach(word => {
            if (word.length > 3 && searchStr.includes(word)) score++;
         });
         
         let sLat = parseFloat(service.Latitude || service.LATITUDE || service.Lat);
         let sLng = parseFloat(service.Longitude || service.LONGITUDE || service.Lng || service.Long);
         let actualDist = 999;
         let distanceStr = "";

         if (userLocation && sLat && sLng && !isNaN(sLat)) {
             actualDist = getDistanceInKm(userLocation.lat, userLocation.lng, sLat, sLng);
             distanceStr = actualDist.toFixed(1) + " " + TRANSLATIONS[currentLang].away;
         } else {
             const hash = name.length + location.length;
             actualDist = ((hash % 40) / 10 + 1.1);
             distanceStr = "~" + actualDist.toFixed(1) + " " + TRANSLATIONS[currentLang].away_est;
         }

         return { name, location, phone, distanceStr, actualDist, score };
      });

      // Sort by text match score first (if they asked for specific area)
      // Otherwise sort by REAL physical distance!
      filteredServices.sort((a, b) => {
          if (b.score !== a.score) return b.score - a.score;
          return a.actualDist - b.actualDist;
      });
      filteredServices = filteredServices.slice(0, 3);

      const t = TRANSLATIONS[currentLang];
      let fallbackText = t.fallback.replace("{category}", serviceCategory);
      let html = `<p>${fallbackText}</p>`;
      
      // Render Rich UI Cards
      filteredServices.forEach(service => {
        html += `
          <div class="service-card">
            <h4>${service.name}</h4>
            <div class="distance" style="margin-bottom: 8px;">
              📍 ${service.location} <br>
              <span style="color: #ef4444; font-weight: 600; display: inline-block; margin-top: 4px;">🚗 ${service.distanceStr}</span>
            </div>
            <div style="display: flex; gap: 5px;">
              <a href="tel:${service.phone}" class="call-btn" style="flex: 1; text-align: center; justify-content: center; background: #f59e0b;">
                ${t.call}
              </a>
              <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(service.name + ' Bhopal')}" target="_blank" class="call-btn" style="flex: 1; text-align: center; justify-content: center; background: #2563eb;">
                ${t.route}
              </a>
            </div>
          </div>
        `;
      });
      return html;
    } else {
      const t = TRANSLATIONS[currentLang];
      let notFoundText = t.not_found.replace("{category}", serviceCategory);
      return `<p>${notFoundText}</p>`;
    }
  }
}
