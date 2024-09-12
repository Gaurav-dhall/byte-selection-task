import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React from 'react';

export const Home_page = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = async (response) => {
    const token = response.credential;
    await checkYouTubeSubscription(token);
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

      const subscription = response.data.items;
      const isSubscribed = subscription.some(
        (item) => item.snippet.resourceId.channelId === "UCgIzTPYitha6idOdrr7M8sQ"
      );

      if (isSubscribed) {
        console.log("User is subscribed!");
        // Redirect to a private page
        navigate('/private-page'); // Replace with your private page route
      } else {
        console.log("User is not subscribed.");
        // Redirect to unauthorized page
        navigate('/unauthorized'); // Replace with your unauthorized page route
      }
    } catch (error) {
      console.error("Error checking subscription:", error);
    }
  };

  return (
    <>
      <div>
        Welcome to the home page. Click on the button below to see the private page (only for logged-in users).
      </div>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </>
  );
};

export default Home_page;
