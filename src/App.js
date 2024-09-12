import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Home_page } from './components/Home_page';
import Unauthorized_page from './components/Unauthorized_page';
import Private_page from './components/Private_page';
import { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import React from 'react';

function App() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const clientId = "609345747653-5k662r648golqp32e9ahigfk44aslof3.apps.googleusercontent.com"; // Correct client ID

  const handleLoginSuccess = async (response) => {
    const token = response.credential;
    const subscribed = await checkYouTubeSubscription(token);
    setIsSubscribed(subscribed); // update the state
  };

  const checkYouTubeSubscription = async (token) => {
    try {
      const response = await axios.get("https://www.googleapis.com/youtube/v3/subscriptions", {
        params: {
          part: 'snippet',
          mine: true,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const subscriptions = response.data.items;
      const subscribed = subscriptions.some(
        (subscription) => subscription.snippet.resourceId.channelId === "UCgIzTPYitha6idOdrr7M8sQ"
      );
      return subscribed;
    } catch (error) {
      console.error("Error checking subscription:", error);
      return false;
    }
  };

  return (
    <Router>
      <GoogleOAuthProvider clientId={clientId}>
        <div>
          <h1>Login with Google to verify subscription status</h1>
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>
        <Routes>
          <Route path="/" element={<Home_page onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/unauthorized" element={isSubscribed ? <Navigate to="/private" /> : <Unauthorized_page />} />
          <Route path="/private" element={<Private_page />} />
        </Routes>
      </GoogleOAuthProvider>
    </Router>
  );
}

export default App;
