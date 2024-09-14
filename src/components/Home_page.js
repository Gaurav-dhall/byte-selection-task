
import React, { useEffect } from "react";
import { gapi } from "gapi-script";
import { useNavigate } from "react-router-dom";

const clientId =
  "609345747653-hgm4ge67j2bjqm5mamc7cf4rrkrf2ckl.apps.googleusercontent.com";
const apiKey = "AIzaSyCA1LUozEnYaJHWp7_mnilqU1pnw0oBAqE";
const scope = "https://www.googleapis.com/auth/youtube.readonly";

export const Home_page = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        apiKey: apiKey,
        clientId: clientId,
        discoveryDocs: [
          "https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest",
        ],
        scope: scope,
      });
    };
    gapi.load("client:auth2", initClient);
  }, []);

  const checkSubscription = async () => {
    try {
      const response = await gapi.client.youtube.subscriptions.list({
        part: "snippet",
        mine: true,
      });
      const subscriptions = response.result.items;
      const isSubscribed = subscriptions.some(
        (item) =>
          item.snippet.resourceId.channelId === "UCgIzTPYitha6idOdrr7M8sQ"
      );
      return isSubscribed;
    } catch (error) {
      console.error("Error checking subscription:", error);
      return false;
    }
  };

  const handlelogin = () => {
    const authInstance = gapi.auth2.getAuthInstance();
    authInstance
      .signIn()
      .then(async () => {
        const isSubscribed = await checkSubscription();
        if (isSubscribed) {
          console.log("User is subscribed");
          navigate("/private"); // Correct usage of navigate
        } else {
          console.log("User is not subscribed");
          navigate("/unauthorized"); // Correct usage of navigate
        }
      })
      .catch((error) => {
        console.error("Login failed: ", error);
      });
  };

  return (
    <div>
      <h1>Welcome to the home page!</h1>
      <p>Click on the button below to login with Google and verify your subscription.</p>
      <button onClick={handlelogin}>Login with Google</button>
    </div>
  );
};

export default Home_page;
