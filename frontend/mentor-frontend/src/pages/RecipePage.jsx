import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
    Clock,
    Users,
    Star,
    ChefHat,
    Printer,
    Share2,
    Calculator,
    ShoppingCart,
    Play,
    Check,
    Plus,
    Minus,
    Camera,
    MessageCircle,
    BookOpen,
    ArrowLeft
} from 'lucide-react';
import HomeNavbar from '../components/HomeNavbar';
import chickenbowl from '../assets/chickenbowl.png';

const RecipePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState(null);
    const [servings, setServings] = useState(4);
    const [checkedIngredients, setCheckedIngredients] = useState(new Set());
    const [currentStep, setCurrentStep] = useState(1);
    const [userRating, setUserRating] = useState(0);
    const [isSticky, setIsSticky] = useState(false);

    // Mock recipe data - replace with FastAPI call
    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                // Replace with actual FastAPI endpoint
                // const response = await fetch(`/api/recipes/${id}`);
                // const data = await response.json();

                // Mock data for demonstration
                const mockRecipe = {
                    id: parseInt(id),
                    title: "Mediterranean Herb-Crusted Salmon",
                    description: "A delicious and healthy salmon recipe with Mediterranean flavors",
                    image: chickenbowl,
                    prepTime: 15,
                    cookTime: 20,
                    totalTime: 35,
                    servings: 4,
                    difficulty: "Medium",
                    rating: 4.8,
                    reviewCount: 142,
                    calories: 320,
                    protein: 28,
                    carbs: 12,
                    fat: 18,
                    ingredients: [
                        {
                            group: "Main Ingredients",
                            items: [
                                { name: "Salmon fillets", amount: 4, unit: "pieces", notes: "6oz each" },
                                { name: "Olive oil", amount: 2, unit: "tbsp" },
                                { name: "Fresh herbs", amount: 0.25, unit: "cup", notes: "mixed parsley, dill, thyme" }
                            ]
                        },
                        {
                            group: "Seasoning",
                            items: [
                                { name: "Sea salt", amount: 1, unit: "tsp" },
                                { name: "Black pepper", amount: 0.5, unit: "tsp" },
                                { name: "Garlic powder", amount: 1, unit: "tsp" }
                            ]
                        }
                    ],
                    instructions: [
                        {
                            step: 1,
                            instruction: "Preheat your oven to 400°F (200°C). Line a baking sheet with parchment paper.",
                            time: 5,
                            tip: "Make sure your oven is fully preheated for even cooking"
                        },
                        {
                            step: 2,
                            instruction: "Pat salmon fillets dry and brush both sides with olive oil.",
                            time: 2,
                            tip: "Removing moisture helps achieve a better crust"
                        },
                        {
                            step: 3,
                            instruction: "Mix all herbs and seasonings in a small bowl. Press mixture onto salmon fillets.",
                            time: 3,
                            tip: "Press firmly so the herb crust adheres well"
                        },
                        {
                            step: 4,
                            instruction: "Bake for 12-15 minutes until fish flakes easily with a fork.",
                            time: 15,
                            tip: "Don't overcook - salmon should be slightly pink in the center"
                        }
                    ],
                    tags: ["Healthy", "Mediterranean", "Quick", "Gluten-Free"],
                    relatedRecipes: [
                        { id: 2, title: "Lemon Garlic Shrimp", image: "/api/placeholder/300/200" },
                        { id: 3, title: "Greek Chicken Bowl", image: "/api/placeholder/300/200" },
                        { id: 4, title: "Mediterranean Quinoa", image: "/api/placeholder/300/200" }
                    ]
                };

                setRecipe(mockRecipe);
                setServings(mockRecipe.servings);
            } catch (error) {
                console.error('Error fetching recipe:', error);
            }
        };

        fetchRecipe();
    }, [id]);

    // Handle sticky navigation
    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleIngredient = (index) => {
        const newChecked = new Set(checkedIngredients);
        if (newChecked.has(index)) {
            newChecked.delete(index);
        } else {
            newChecked.add(index);
        }
        setCheckedIngredients(newChecked);
    };

    const adjustServings = (change) => {
        const newServings = Math.max(1, servings + change);
        setServings(newServings);
    };

    const calculateAmount = (originalAmount, originalServings) => {
        return ((originalAmount * servings) / originalServings).toFixed(2);
    };

    const handlePrint = () => {
        window.print();
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: recipe.title,
                    text: recipe.description,
                    url: window.location.href,
                });
            } catch (error) {
                console.log('Error sharing:', error);
            }
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Recipe link copied to clipboard!');
        }
    };

    const scrollToRecipe = () => {
        document.getElementById('recipe-content').scrollIntoView({ behavior: 'smooth' });
    };

    if (!recipe) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
                <HomeNavbar />
                <div className="pt-24 flex items-center justify-center min-h-screen">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
            {/* Navigation Bar */}
            <HomeNavbar />

            {/* Back Button */}
            <div className="pt-24 pb-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 transition-colors mb-4"
                >
                    <ArrowLeft className="h-5 w-5" />
                    <span>Back to Recipes</span>
                </button>
            </div>

            {/* Hero Section */}
            <div className="relative h-96 md:h-[500px] overflow-hidden">
                <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 text-white">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4">{recipe.title}</h1>
                    <p className="text-lg md:text-xl opacity-90 max-w-2xl">{recipe.description}</p>
                </div>
            </div>

            {/* Recipe Metadata */}
            <div className="bg-white/80 backdrop-blur-md border-b border-orange-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center">
                        <div className="bg-gradient-to-br from-orange-100 to-amber-100 rounded-xl p-4">
                            <Clock className="h-6 w-6 text-orange-500 mx-auto mb-2" />
                            <div className="text-sm text-gray-600">Prep Time</div>
                            <div className="font-semibold text-orange-700">{recipe.prepTime}m</div>
                        </div>
                        <div className="bg-gradient-to-br from-orange-100 to-amber-100 rounded-xl p-4">
                            <Clock className="h-6 w-6 text-orange-500 mx-auto mb-2" />
                            <div className="text-sm text-gray-600">Cook Time</div>
                            <div className="font-semibold text-orange-700">{recipe.cookTime}m</div>
                        </div>
                        <div className="bg-gradient-to-br from-orange-100 to-amber-100 rounded-xl p-4">
                            <Users className="h-6 w-6 text-orange-500 mx-auto mb-2" />
                            <div className="text-sm text-gray-600">Servings</div>
                            <div className="font-semibold text-orange-700">{recipe.servings}</div>
                        </div>
                        <div className="bg-gradient-to-br from-orange-100 to-amber-100 rounded-xl p-4">
                            <ChefHat className="h-6 w-6 text-orange-500 mx-auto mb-2" />
                            <div className="text-sm text-gray-600">Difficulty</div>
                            <div className="font-semibold text-orange-700">{recipe.difficulty}</div>
                        </div>
                        <div className="bg-gradient-to-br from-orange-100 to-amber-100 rounded-xl p-4">
                            <Star className="h-6 w-6 text-orange-500 mx-auto mb-2" />
                            <div className="text-sm text-gray-600">Rating</div>
                            <div className="font-semibold text-orange-700">{recipe.rating}/5</div>
                        </div>
                        <div className="bg-gradient-to-br from-orange-100 to-amber-100 rounded-xl p-4">
                            <div className="text-sm text-gray-600">Calories</div>
                            <div className="font-semibold text-orange-700">{recipe.calories}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions Bar */}
            <div className={`${isSticky ? 'fixed top-20 left-0 right-0 z-30 shadow-lg' : ''} bg-white/90 backdrop-blur-md border-b border-orange-200 transition-all duration-300`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                        <button
                            onClick={scrollToRecipe}
                            className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                        >
                            <BookOpen className="h-4 w-4" />
                            <span>Jump to Recipe</span>
                        </button>
                        <button
                            onClick={handlePrint}
                            className="flex items-center space-x-2 bg-white/80 text-orange-700 border border-orange-200 px-4 py-2 rounded-lg hover:bg-orange-50 transition-colors"
                        >
                            <Printer className="h-4 w-4" />
                            <span>Print</span>
                        </button>
                        <button
                            onClick={handleShare}
                            className="flex items-center space-x-2 bg-white/80 text-orange-700 border border-orange-200 px-4 py-2 rounded-lg hover:bg-orange-50 transition-colors"
                        >
                            <Share2 className="h-4 w-4" />
                            <span>Share</span>
                        </button>
                        <div className="flex items-center space-x-2 bg-white/80 border border-orange-200 rounded-lg px-4 py-2">
                            <Calculator className="h-4 w-4 text-orange-500" />
                            <span className="text-sm text-gray-600">Servings:</span>
                            <button
                                onClick={() => adjustServings(-1)}
                                className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200 transition-colors flex items-center justify-center"
                            >
                                <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-8 text-center font-semibold text-orange-700">{servings}</span>
                            <button
                                onClick={() => adjustServings(1)}
                                className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200 transition-colors flex items-center justify-center"
                            >
                                <Plus className="h-3 w-3" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div id="recipe-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Ingredients Section */}
                    <div className="lg:col-span-1">
                        <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-orange-200 p-6 sticky top-32">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                                <ShoppingCart className="h-6 w-6 text-orange-500 mr-2" />
                                Ingredients
                            </h2>

                            {recipe.ingredients.map((group, groupIndex) => (
                                <div key={groupIndex} className="mb-6">
                                    <h3 className="font-semibold text-orange-700 mb-3 border-b border-orange-200 pb-2">
                                        {group.group}
                                    </h3>
                                    <div className="space-y-3">
                                        {group.items.map((ingredient, index) => {
                                            const globalIndex = `${groupIndex}-${index}`;
                                            return (
                                                <label key={index} className="flex items-start space-x-3 cursor-pointer group">
                                                    <input
                                                        type="checkbox"
                                                        checked={checkedIngredients.has(globalIndex)}
                                                        onChange={() => toggleIngredient(globalIndex)}
                                                        className="mt-1 h-4 w-4 text-orange-500 rounded border-orange-300 focus:ring-orange-500"
                                                    />
                                                    <div className={`flex-1 transition-all ${checkedIngredients.has(globalIndex) ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                                                        <span className="font-medium">
                                                            {calculateAmount(ingredient.amount, recipe.servings)} {ingredient.unit}
                                                        </span>
                                                        <span className="ml-2">{ingredient.name}</span>
                                                        {ingredient.notes && (
                                                            <div className="text-sm text-gray-500 mt-1">({ingredient.notes})</div>
                                                        )}
                                                    </div>
                                                </label>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}

                            <button className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2">
                                <ShoppingCart className="h-5 w-5" />
                                <span>Add to Shopping List</span>
                            </button>
                        </div>
                    </div>

                    {/* Instructions Section */}
                    <div className="lg:col-span-2">
                        <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-orange-200 p-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                                <BookOpen className="h-6 w-6 text-orange-500 mr-2" />
                                Instructions
                            </h2>

                            <div className="space-y-6">
                                {recipe.instructions.map((instruction, index) => (
                                    <div
                                        key={index}
                                        className={`border-l-4 ${currentStep === instruction.step ? 'border-orange-500 bg-orange-50' : 'border-gray-200'} pl-6 py-4 transition-all duration-200`}
                                    >
                                        <div className="flex items-start space-x-4">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${currentStep === instruction.step
                                                    ? 'bg-orange-500 text-white'
                                                    : 'bg-gray-200 text-gray-600'
                                                }`}>
                                                {instruction.step}
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-gray-800 leading-relaxed mb-2">
                                                    {instruction.instruction}
                                                </p>
                                                {instruction.time && (
                                                    <div className="flex items-center text-sm text-orange-600 mb-2">
                                                        <Clock className="h-4 w-4 mr-1" />
                                                        <span>{instruction.time} minutes</span>
                                                    </div>
                                                )}
                                                {instruction.tip && (
                                                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-700">
                                                        <strong>Pro Tip:</strong> {instruction.tip}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setCurrentStep(instruction.step)}
                                            className="mt-3 ml-12 text-sm text-orange-600 hover:text-orange-700 font-medium"
                                        >
                                            {currentStep === instruction.step ? 'Current Step' : 'Go to Step'}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Video/Photo Upload Section */}
                        <div className="mt-8 bg-white/80 backdrop-blur-md rounded-2xl border border-orange-200 p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Share Your Creation</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <button className="flex items-center justify-center space-x-2 bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 py-3 px-4 rounded-xl border-2 border-dashed border-orange-300 hover:border-orange-400 transition-colors">
                                    <Camera className="h-5 w-5" />
                                    <span>Upload Photo</span>
                                </button>
                                <button className="flex items-center justify-center space-x-2 bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 py-3 px-4 rounded-xl border-2 border-dashed border-orange-300 hover:border-orange-400 transition-colors">
                                    <Play className="h-5 w-5" />
                                    <span>Upload Video</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Rating & Reviews Section */}
            <div className="bg-white/60 backdrop-blur-sm border-y border-orange-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Rate This Recipe</h2>
                        <div className="flex justify-center space-x-2 mb-4">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    onClick={() => setUserRating(star)}
                                    className={`text-2xl transition-colors ${star <= userRating ? 'text-yellow-400' : 'text-gray-300'
                                        }`}
                                >
                                    <Star className="h-8 w-8 fill-current" />
                                </button>
                            ))}
                        </div>
                        <p className="text-gray-600">
                            {recipe.reviewCount} reviews • Average rating: {recipe.rating}/5
                        </p>
                    </div>

                    {/* Comments Section */}
                    <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-orange-200 p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                            <MessageCircle className="h-6 w-6 text-orange-500 mr-2" />
                            Community Reviews
                        </h3>
                        <div className="space-y-4">
                            <div className="border-b border-gray-200 pb-4">
                                <div className="flex items-start space-x-3">
                                    <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full flex items-center justify-center text-white font-semibold">
                                        JD
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-2 mb-1">
                                            <span className="font-semibold text-gray-800">Jane Doe</span>
                                            <div className="flex space-x-1">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <Star key={star} className="h-4 w-4 fill-current text-yellow-400" />
                                                ))}
                                            </div>
                                            <span className="text-sm text-gray-500">2 days ago</span>
                                        </div>
                                        <p className="text-gray-700">
                                            Amazing recipe! The herb crust was perfectly crispy and the salmon was so tender.
                                            My family loved it and asked for seconds!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Recipes */}
            <div className="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">You Might Also Like</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {recipe.relatedRecipes.map((related) => (
                            <div key={related.id} className="group cursor-pointer" onClick={() => handleRecipeClick(related.id)}>
                                <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-orange-200 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                                    <img
                                        src={related.image}
                                        alt={related.title}
                                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="p-4">
                                        <h3 className="font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">
                                            {related.title}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">Never Miss a Recipe!</h2>
                    <p className="text-orange-100 mb-8 max-w-2xl mx-auto">
                        Subscribe to our newsletter and get weekly recipes, cooking tips, and exclusive content
                        delivered straight to your inbox.
                    </p>
                    <div className="max-w-md mx-auto flex">
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className="flex-1 px-4 py-3 rounded-l-xl border-0 focus:ring-2 focus:ring-white focus:outline-none"
                        />
                        <button className="bg-white text-orange-600 px-6 py-3 rounded-r-xl font-semibold hover:bg-gray-50 transition-colors">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-800 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center">
                        <div className="flex justify-center items-center space-x-2 mb-4">
                            <ChefHat className="h-6 w-6 text-orange-500" />
                            <span className="text-xl font-bold">Cooking Mentor</span>
                        </div>
                        <p className="text-gray-400">© 2024 Cooking Mentor. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default RecipePage;
