import React from 'react';
import HomeNavbar from '../components/HomeNavbar';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <HomeNavbar />

      {/* Main content with proper top spacing to account for fixed navbar */}
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
              Welcome to <span className="text-orange-500">Cooking Mentor</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your ultimate destination for recipes, AI-powered cooking guidance, and a vibrant culinary community.
            </p>
          </div>

          
        </div>
      </main>
    </div>
  );
}

export default Home;
