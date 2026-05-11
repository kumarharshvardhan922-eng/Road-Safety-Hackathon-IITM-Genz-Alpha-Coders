# 🏆 Sadak Sathi AI: Hackathon Pitch & Testing Guide

When you present your project to the IIT Madras judges, they will be looking for **accuracy**, **speed**, **UX (User Experience)**, and **innovation**. Here is the exact script and testing flow you should follow to blow them away.

## Phase 1: The UI & UX Test
*Judges want to see if the interface is intuitive and accessible during a high-stress emergency.*

1. **The Entrance:** Show them the clean website. Point out the floating red Chatbot bubble. Explain that it is non-intrusive but always available in the bottom corner of every page.
2. **The Greeting:** Click the bubble. Show the judges the empathetic greeting: *"Hi there! I am your Sadak Sathi... Please don't panic."* Explain that in trauma situations, psychological comfort is a critical feature.
3. **Responsiveness:** If possible, resize your browser window to mobile width. Show them that the chat window perfectly scales down for mobile phones (since emergencies happen on the road, mobile UX is mandatory).

## Phase 2: The Text & Intent Recognition Test
*Judges will test if your AI actually understands natural language, rather than just clicking hardcoded buttons.*

**Test 1: Direct Request**
*   **You Type:** *"Where is the nearest police station?"*
*   **Expected Result:** The bot should instantly pull up Narela, Birasia, MP Nagar, etc., with precise locations and `Call 100` buttons.

**Test 2: Implicit Emergency (The "Smart" Test)**
*   **You Type:** *"My friend is bleeding heavily!"* or *"There was a massive crash!"*
*   **Expected Result:** The AI should recognize the word "bleeding" or "crash", understand that this requires a Hospital/Trauma Center or Ambulance, and instantly display the nearest ones like AIIMS Bhopal or JP Hospital. 
*   **What to tell judges:** *"Notice how the user didn't have to type 'Hospital'. The Gemini AI understood the context of 'bleeding' and automatically fetched the Trauma Centers."*

**Test 3: Non-Standard Emergency**
*   **You Type:** *"My car broke down and I'm stuck on the highway."*
*   **Expected Result:** It should fetch the Vehicle Rescue Services or Service Centres.

## Phase 3: The Voice UI Test (The "WOW" Factor)
*This is where you secure your winning points. Judges love accessibility.*

1. Tell the judges: *"In a severe accident, a victim might have shaking hands, poor vision, or be trapped. Typing is not an option."*
2. Click the **Microphone Icon**.
3. **Speak clearly into your laptop:** *"I need an ambulance immediately."*
4. **Expected Result:** The mic button will pulse red, the browser will instantly convert your speech to text, put it in the chat box, and fetch the Ambulance Services. 
5. *Note: Ensure you are in a relatively quiet room for the pitch, or speak directly into the microphone.*

## Phase 4: The Data Accuracy Test
*Judges will ask: "Is this real data or just ChatGPT making things up?"*

1. Explain to the judges that LLMs (like ChatGPT/Gemini) are known to "hallucinate" fake phone numbers and fake hospitals. 
2. **Your Winning Pitch:** *"We solved AI hallucination. Our Gemini AI is only used to understand the user's intent. The actual data displayed (Coordinates, Hospitals, Phone Numbers) is strictly pulled from the verified Excel dataset compiled by our 6 team members across all 8 zones of Bhopal."*
3. Show them how clicking the **"Call"** button attempts to open the phone dialer. 

## 🚨 Final Checklist Before the Pitch
- [ ] Make sure `npm run dev` is running without errors.
- [ ] Make sure your `.env` file has your valid Google Gemini API Key.
- [ ] Make sure you have clicked "Allow Microphone" when the browser prompts you for voice access.
- [ ] Keep your `dataset` folder full of your team's real Excel files, so the bot has a rich amount of data to display.
