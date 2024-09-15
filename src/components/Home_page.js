
import React, { useEffect } from "react";
import { gapi } from "gapi-script";
import { useNavigate } from "react-router-dom";
// import gIcon from '../assets/g-icon.png';

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
    <div className="flex flex-col ">
      <div className="text-5xl font-bold m-4 hover:scale-105 text-center ">Welcome to youtube subscription verification app!</div>
      <div className="text-4xl font-semibold m-4 text-center">This app verifies that whether a person who use youtube has subscribed to <a className="text-blue-500 hover:underline hover:scale-150  " href="https://youtube.com/@byte-mait?feature=shared" target="_blank">Byte</a> 's youtube channel or not </div>
      <p className="text-3xl font-semibold m-4 text-center">However this model is limited to only few test users and verify youtube subscription of only few test users but this app can be made available to public once verification of the app is well settled with google. </p>
      <hr className="border-2 border-black"/>
      <p className="text-3xl m-4 font-semibold text-center">You can test this app with the follwowing credentials</p>
      <ul className="text-3xl text-blue-300 hover:scale-105 m-4 font-semibold m-4 text-center animate-pulse">
      <li>Email:-taskbyte@gmail.com</li>
      <li>Password:-byte@mait</li></ul>
      <hr className="border-2 border-black" />
      <p className="text-3xl m-4 font-semibold text-center">Click on the button below to login with Google and verify your subscription.</p>
     <div className="flex justify-center"> <button className="bg-purple-600 hover:bg-blue-500 hover:scale-105 text-white font-bold py-2 px-4 rounded-full m-4 animate-bounce" onClick={handlelogin}>Login with Google</button></div>
    </div>
  );
};

export default Home_page;
