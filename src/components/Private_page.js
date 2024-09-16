import { React}from "react";



export const Private_page = () => {

  return (
    <>
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-3xl font-bold text-center m-3 ">"Welcome to the VIP Lounge -Mogambo khush hua!😎" </div>
      <div className="text-3xl font-semibold text-center m-3 animate-pulse">
      Mere paas maa hai, tumhare paas🥹?-Oh right, premium content only for our subscribed users!Click below!
      </div>
      <a className="text-3xl font-bold text-center m-3 bg-purple-600 hover:bg-blue-500 hover:scale-105 text-white font-bold py-2 px-4 rounded-full m-4 animate-bounce" href="https://byte-site.vercel.app/"target="_blank">Exclusive Content</a>
      </div>
    </>
  );
};
export default Private_page;
