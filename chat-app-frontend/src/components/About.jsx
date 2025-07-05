import React from 'react';
import chatIcon from '../assets/chat.png';
import aboutImg from '../assets/about-img.svg'; // Add any cool illustration here

const About = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="p-8 dark:border-gray-700 border w-full max-w-3xl rounded dark:bg-gray-900 shadow flex flex-col gap-6">
        <div className="flex justify-center">
          <img src={chatIcon} className="w-20" alt="Chat Logo" />
        </div>
        <h1 className="text-3xl font-bold text-center">About Chatori Charcha</h1>
        <p className="text-center text-gray-700 dark:text-gray-300">
          Chatori Charcha is a fun, spontaneous group chat app where anyone can create or join chat rooms to connect, vibe, and talk freely. Whether you're in the mood for serious discussions or just random bakbak — we've got you covered. ⚡
        </p>
        <img src={aboutImg} alt="People chatting" className="w-full max-h-72 object-contain" />
      </div>
    </div>
  );
};

export default About;