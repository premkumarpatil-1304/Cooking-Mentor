import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserButton, SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react';

function HomeNavbar() {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { name: 'Home', path: '/Home' },
        { name: 'Recipes', path: '/recipes' },
        { name: 'AI Mentor', path: '/ai-mentor' },
        { name: 'Community', path: '/community' },
        { name: 'Profile', path: '/profile' }
    ];

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="w-full h-20 fixed top-0 z-50 bg-gradient-to-r from-yellow-400 to-orange-400 shadow-lg backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    {/* Logo/Brand */}
                    <div className="flex-shrink-0">
                        <Link to="/Home" className="text-2xl font-bold text-white hover:text-gray-100 transition-colors duration-200">
                            🍳 Cooking Mentor
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex md:items-center md:space-x-8">
                        <div className="flex items-baseline space-x-8">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className={`px-4 py-2 rounded-full text-lg font-medium transition-all duration-300 transform hover:scale-105 ${location.pathname === item.path
                                            ? 'bg-white text-orange-500 shadow-md'
                                            : 'text-white hover:bg-white/20 hover:text-white'
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>

                        {/* Auth Section for Desktop */}
                        <div className="ml-4 flex items-center space-x-4">
                            <SignedOut>
                                <SignInButton mode="modal">
                                    <button className="bg-white text-orange-500 px-4 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors duration-200">
                                        Sign In
                                    </button>
                                </SignInButton>
                            </SignedOut>

                            <SignedIn>
                                <UserButton
                                    afterSignOutUrl="/"
                                    appearance={{
                                        elements: {
                                            avatarBox: "w-10 h-10 ring-2 ring-white hover:ring-gray-200 transition-all duration-200",
                                            userButtonPopoverCard: "shadow-lg border-0",
                                            userButtonPopoverActionButton: "hover:bg-gray-50"
                                        }
                                    }}
                                    userProfileMode="navigation"
                                    userProfileUrl="/profile"
                                >
                                    <UserButton.MenuItems>
                                        <UserButton.Link
                                            label="Dashboard"
                                            labelIcon={<span>📊</span>}
                                            href="/dashboard"
                                        />
                                        <UserButton.Link
                                            label="My Recipes"
                                            labelIcon={<span>📝</span>}
                                            href="/my-recipes"
                                        />
                                    </UserButton.MenuItems>
                                </UserButton>
                            </SignedIn>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center space-x-2">
                        {/* Mobile Auth Button */}
                        <SignedOut>
                            <SignInButton mode="modal">
                                <button className="bg-white text-orange-500 px-3 py-1 rounded-full text-sm font-medium">
                                    Sign In
                                </button>
                            </SignInButton>
                        </SignedOut>

                        <SignedIn>
                            <UserButton
                                afterSignOutUrl="/"
                                appearance={{
                                    elements: {
                                        avatarBox: "w-8 h-8 ring-2 ring-white"
                                    }
                                }}
                            />
                        </SignedIn>

                        <button
                            onClick={toggleMobileMenu}
                            className="text-white hover:text-gray-200 focus:outline-none focus:text-gray-200 transition-colors duration-200 ml-2"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-gradient-to-r from-yellow-400 to-orange-400 border-t border-white/20">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${location.pathname === item.path
                                        ? 'bg-white text-orange-500'
                                        : 'text-white hover:bg-white/20'
                                    }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}

export default HomeNavbar;
