import React from "react";

export const Unauthorized_page = () => {
  return (
    <>
      {" "}
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-3xl text-center font-bold  m-3">
      "Rishte mein toh hum tumhare baap lagte hain, naam hai Google😂! - But even we can't let you in without subscribing byte's youtube channel!"
      </div>
      <p className="text-3xl font-semibold  m-3 animate-pulse">Click below to jump to Byte's Youtube Channel and subscribe it with the same email id to get exclusive content</p>
      <a className="text-3xl font-bold text-center m-3 bg-purple-600 hover:bg-blue-500 hover:scale-105 text-white font-bold py-2 px-4 rounded-full m-4 animate-bounce"href="https://youtube.com/@byte-mait?feature=shared"target="_blank">Byte's Youtube Channel</a>
   </div> 
   </>
  );
};
export default Unauthorized_page;
