This React application allows users to search GitHub profiles by username.  
It displays **avatar**, **username**, and a **link to the GitHub profile**.

It also integrates **Firebase Firestore** to save searches and uses **localStorage** to remember the last 5 searches.

## Features

- Search GitHub users by username.
- Display avatar, username, and profile link.
- Load More button for pagination.
- Scroll-to-top button appears when scrolling down.
- Last 5 searches stored in **localStorage**.
- Firebase integration for storing search queries in Firestore.

---

## Step-by-Step Setup (From Scratch)

### 1️⃣ Create React App

1. Open your terminal.
2. Create a new React project:

npx create-react-app github-search-app
cd github-search-app
Start the development server to confirm it works:

npm start
The app should open at http://localhost:3000

2️⃣ Set Up Firebase
Go to https://console.firebase.google.com/ and create a new project.

**Enable Firestore Database.**
In the project settings → General → Your apps → Web, copy the Firebase config keys.

In your React project root, create a .env file:

**env**
Copy code
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
Restart your React server whenever you change .env.

4️⃣ Implement Search Component
Use Search.js to handle:

GitHub API requests (https://api.github.com/search/users?q=username)

Display **avatars, usernames, profile links**

Firebase Firestore logging
Last 5 searches in localStorage

6️⃣ Inspecting and Debugging
While running the app in your browser (http://localhost:3000):

Open Developer Tools (Right-click → Inspect or F12).

**Console Tab:**

Check for errors, logs, or console.log("FIREBASE CHECK", firebaseConfig) to verify Firebase keys.

Network Tab:
Inspect GitHub API requests.
Make sure requests are returning 200 OK.

**Application Tab → Local Storage:**

Key: lastSearches

You can view or modify the last 5 searched usernames.

Firestore (Firebase Console):

Check the searches collection.

Confirm each search query is saved with a timestamp.

7️⃣ Running the App

npm start
Enter a GitHub username and hit Search.

Scroll down for Load More.

Scroll down further to see Scroll-to-top button.

Click the last search buttons to repeat searches quickly.

**Notes**
Uses React hooks (useState, useEffect) for state and lifecycle.

GitHub API is dynamic, no hardcoded users.

Firebase Firestore stores each search query.

localStorage keeps last 5 searches, even after page reloads.

Hover effects and responsive grid for a better UI.
