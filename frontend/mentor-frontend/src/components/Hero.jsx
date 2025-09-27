import React from 'react';
import Hero_Video from '../assets/Hero_Video.mp4';
import Video from './Video';

function Hero() {
  return (
    <div className="hero flex   allign-items-top p-10 gap-20 bg-[#e2edeb] h-[90vh] ">
      <div className="text-black space-y-6 py-3 max-w-120">
        <h1 className="text-5xl font-bold text-orange-600">Welcome to Virtual Cooking Mentor</h1>
        <p className="text-3xl font-semibold">Your journey to culinary mastery starts here.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit voluptas amet omnis repellendus non corporis, tempore distinctio quia qui eaque odio ipsum pariatur eius quaerat repudiandae sapiente illum! Fuga, esse.</p>
      </div >
      <div className="w-full h-150 rounded-lg overflow-hidden position-relative shadow-3g">
        <Video className="" />
      </div>
    </div>
  );
}

export default Hero;
