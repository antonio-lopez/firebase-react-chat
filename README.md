<h1 align="center">Welcome to Firebase Chat App 👋</h1>
<p>
</p>

> A React chat app using Firebase for the backend and Google Sign-In for authenticating users.

### 🏠 [Homepage](https://recollects.netlify.app)

![screenshot](https://github.com/antonio-lopez/firebase-react-chat/blob/main/uploads/firebase-chat-app-screenshot.png?raw=true)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Create a Firebase project and get your project's [unique configuration object](https://firebase.google.com/docs/web/setup). Save the `firebaseConfig` object for later use. The format should be look like this.
  ```
  var firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "PROJECT_ID.firebaseapp.com",
  databaseURL: "https://PROJECT_ID.firebaseio.com",
  projectId: "PROJECT_ID",
  storageBucket: "PROJECT_ID.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID",
  measurementId: "G-MEASUREMENT_ID",
  };
  ```
- Enable authentication using Google Sign In. Go to your projects `Athentication` tab, select `Sign-in Method`, and `enable` Google.

## Features

- Google sign In
- Realtime update
- Firebase database

## Install

Clone respository: `https://github.com/antonio-lopez/firebase-react-chat.git`

```
cd firebase-react-chat/
npm install
```

Create a `.env` file in the root `firebase-react-chat` directory and add the following.

```
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTHDOMAIN=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGEBUCKET=
REACT_APP_FIREBASE_MSSGINGSENDER_ID=
REACT_APP_FIREBASE_APP_ID=
REACT_APP_FIREBASE_MEASUREMENT_ID=
```

Fill in the values with your Firebase project's config values.

## Usage

```
cd firebase-react-chat/
npm start
```

## Author

👤 **Antonio Lopez**

- Website: [Antonio Lopez](https://www.antoniolopez.me/)
- Github: [@antonio-lopez](https://github.com/antonio-lopez)
