import React from "react";
import HomeNavbar from "../components/HomeNavbar";
import Carousel from "../components/Carousel";
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleRecipeClick = (recipeId) => {
    navigate(`/recipe/${recipeId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <HomeNavbar />

      <main className="pt-20 max-w-[110rem] mx-auto px-4 sm:px-6 lg:px-10 py-10">
        {/* Enhanced Hero Section */}
        <div className="text-center mb-20 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-200/20 to-yellow-200/20 rounded-full blur-3xl"></div>
          <h1 className="relative text-5xl md:text-7xl font-bold text-gray-800 mb-8 leading-tight">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
              Cooking Mentor
            </span>
          </h1>
          <p className="relative text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Your ultimate destination for recipes, AI-powered cooking guidance, and a vibrant culinary community.
          </p>
          <div className="relative flex justify-center mb-8">
            <div className="w-32 h-1 bg-gradient-to-r from-orange-500 to-yellow-400 rounded-full"></div>
          </div>

          {/* Hero Action Buttons */}
          <div className="relative flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => handleRecipeClick(1)}
              className="group relative overflow-hidden bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold text-lg py-4 px-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Start Cooking
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
            <button
              onClick={() => navigate('/recipes')}
              className="group relative overflow-hidden bg-transparent border-2 border-orange-500 text-orange-500 font-semibold text-lg py-4 px-8 rounded-2xl transition-all duration-300 hover:bg-orange-500 hover:text-white hover:scale-105"
            >
              <span className="relative z-10">Browse Recipes</span>
            </button>
          </div>
        </div>

        {/* Featured Recipes Section - Enhanced */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-300 via-orange-400 to-orange-500 shadow-2xl mb-20">
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 w-20 h-20 bg-white/30 rounded-full animate-pulse"></div>
            <div className="absolute top-32 right-20 w-16 h-16 bg-yellow-200/40 rounded-full animate-pulse delay-1000"></div>
            <div className="absolute bottom-20 left-32 w-12 h-12 bg-white/25 rounded-full animate-pulse delay-500"></div>
          </div>

          <div className="relative flex flex-col lg:flex-row items-center min-h-[600px]">
            {/* Enhanced Text Content */}
            <div className="lg:w-1/2 p-8 lg:p-12 order-2 lg:order-1">
              <div className="bg-white/15 backdrop-blur-md rounded-3xl p-8 border border-white/30 shadow-xl">
                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                  Explore Our{" "}
                  <span className="text-yellow-100 relative">
                    Featured Recipes
                    <div className="absolute -bottom-2 left-0 w-full h-1 bg-yellow-200/50 rounded-full"></div>
                  </span>
                </h2>

                <p className="text-lg text-white/90 mb-6 leading-relaxed">
                  Discover a selection of delicious recipes handpicked just for you. From comforting classics to innovative new dishes, we have something for every taste.
                </p>

                <p className="text-lg text-white/90 mb-8 leading-relaxed">
                  Browse through our carousel to get inspired and start cooking today!
                </p>

                {/* Enhanced Button Group */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => navigate('/recipes')}
                    className="group relative overflow-hidden bg-white text-orange-500 font-semibold text-lg py-4 px-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Explore Recipes
                      <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </span>
                  </button>

                  <button
                    onClick={() => navigate('/recipes')}
                    className="group relative overflow-hidden bg-transparent border-2 border-white text-white font-semibold text-lg py-4 px-8 rounded-2xl transition-all duration-300 hover:bg-white hover:text-orange-500 hover:scale-105"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      View Categories
                      <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Enhanced Carousel Side */}
            <div className="lg:w-1/2 p-8 lg:p-12 order-1 lg:order-2">
              <div className="relative">
                <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-6 border border-white/30 shadow-2xl">
                  <div onClick={() => handleRecipeClick(1)} className="cursor-pointer">
                    <Carousel />
                  </div>

                  <div className="mt-6 text-center">
                    <button
                      onClick={() => navigate('/recipes')}
                      className="group relative overflow-hidden bg-gradient-to-r from-orange-600 to-orange-500 text-white font-semibold text-xl py-4 px-10 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:from-orange-700 hover:to-orange-600"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Show More Recipes
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>

                {/* Enhanced Decorative Elements */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-yellow-300/40 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-orange-300/30 rounded-full blur-2xl animate-pulse delay-1000"></div>
              </div>
            </div>
          </div>
        </div>

        {/* New Quick Actions Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {[
            { icon: "🔍", title: "Search Recipes", description: "Find the perfect dish", color: "from-orange-400 to-amber-400" },
            { icon: "⏰", title: "Quick Meals", description: "Ready in 30 minutes", color: "from-amber-400 to-yellow-400" },
            { icon: "💡", title: "AI Suggestions", description: "Personalized for you", color: "from-orange-500 to-orange-400" },
            { icon: "⭐", title: "Top Rated", description: "Community favorites", color: "from-yellow-400 to-amber-400" }
          ].map((action, index) => (
            <div
              key={index}
              onClick={() => handleRecipeClick(index + 1)}
              className={`group bg-gradient-to-br ${action.color} rounded-2xl p-6 text-white cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl`}
            >
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">{action.icon}</div>
              <h3 className="font-bold text-lg mb-2">{action.title}</h3>
              <p className="text-white/90 text-sm">{action.description}</p>
            </div>
          ))}
        </div>

        {/* Enhanced Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            {
              title: "AI Cooking Assistant",
              description: "Get personalized cooking guidance powered by advanced AI technology",
              icon: "🤖",
              features: ["Recipe recommendations", "Cooking tips", "Ingredient substitutions"]
            },
            {
              title: "Recipe Collection",
              description: "Save, organize and share your favorite recipes with the community",
              icon: "📚",
              features: ["Personal cookbook", "Recipe sharing", "Smart categorization"]
            },
            {
              title: "Community Reviews",
              description: "Connect with fellow cooking enthusiasts and share experiences",
              icon: "⭐",
              features: ["User ratings", "Photo sharing", "Cooking discussions"]
            }
          ].map((feature, index) => (
            <div key={index} className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 border border-orange-100">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300 text-center">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6 text-center">
                {feature.description}
              </p>
              <ul className="space-y-2 mb-6">
                {feature.features.map((item, idx) => (
                  <li key={idx} className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-yellow-400 rounded-full mr-3"></div>
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate('/recipes')}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                Learn More
              </button>
              <div className="mt-4 w-full h-1 bg-gradient-to-r from-orange-500 to-amber-400 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>
          ))}
        </div>

        {/* New Statistics Section */}
        <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 rounded-3xl p-8 md:p-12 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Join Our Growing Community
            </h2>
            <p className="text-white/90 text-lg">
              Thousands of home chefs are already cooking with us
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "50K+", label: "Active Users" },
              { number: "10K+", label: "Recipes" },
              { number: "500K+", label: "Meals Cooked" },
              { number: "98%", label: "Satisfaction" }
            ].map((stat, index) => (
              <div key={index} className="text-center text-white">
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-white/90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup Section */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-orange-100">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Stay Updated with New Recipes
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Get weekly recipe recommendations and cooking tips delivered to your inbox
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-2xl border-2 border-orange-200 focus:border-orange-500 focus:outline-none transition-colors duration-300"
              />
              <button className="bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
