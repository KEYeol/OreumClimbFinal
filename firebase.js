const firebaseConfig = {
    apiKey: "AIzaSyDOWjh-_yaiqLxbR8WgP9txbUnUCLbbWQM",
    authDomain: "sparta-f1a11.firebaseapp.com",
    projectId: "sparta-f1a11",
    storageBucket: "sparta-f1a11.appspot.com",
    messagingSenderId: "722486950372",
    appId: "1:722486950372:web:6e7b7fd43c9d867fb26ff1",
    measurementId: "G-CRLVPL64L7",
  };
  
  // Firebase 초기화
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();