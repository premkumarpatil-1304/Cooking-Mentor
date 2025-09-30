import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeNavbar from '../components/HomeNavbar';
import { Clock, Users, Star, ChefHat, Search } from 'lucide-react';

const RecipesList = () => {
    const navigate = useNavigate();
    const [recipes, setRecipes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    useEffect(() => {
        // Mock recipes data - replace with FastAPI call
        const mockRecipes = [
            {
                id: 1,
                title: "Mediterranean Herb-Crusted Salmon",
                description: "A delicious and healthy salmon recipe with Mediterranean flavors",
                "image": "../assets/images/Mediterranean.png",
                prepTime: 15,
                cookTime: 20,
                servings: 4,
                difficulty: "Medium",
                rating: 4.8,
                category: "seafood",
                tags: ["Healthy", "Mediterranean", "Quick"]
            },
            {
                id: 2,
                title: "Creamy Garlic Pasta",
                description: "Rich and creamy pasta with roasted garlic and herbs",
                image: "/api/placeholder/400/300",
                prepTime: 10,
                cookTime: 15,
                servings: 2,
                difficulty: "Easy",
                rating: 4.6,
                category: "pasta",
                tags: ["Vegetarian", "Quick", "Comfort Food"]
            },
            {
                id: 3,
                title: "Spicy Thai Chicken Curry",
                description: "Authentic Thai red curry with tender chicken and vegetables",
                image: "/api/placeholder/400/300",
                prepTime: 20,
                cookTime: 30,
                servings: 4,
                difficulty: "Medium",
                rating: 4.9,
                category: "curry",
                tags: ["Spicy", "Thai", "Authentic"]
            },
            {
                id: 4,
                title: "Classic Chocolate Chip Cookies",
                description: "Soft and chewy homemade chocolate chip cookies",
                image: "/api/placeholder/400/300",
                prepTime: 15,
                cookTime: 12,
                servings: 24,
                difficulty: "Easy",
                rating: 4.7,
                category: "dessert",
                tags: ["Sweet", "Baking", "Family Favorite"]
            },
            {
                id: 5,
                title: "Fresh Garden Salad",
                description: "Crisp mixed greens with seasonal vegetables and homemade dressing",
                image: "/api/placeholder/400/300",
                prepTime: 10,
                cookTime: 0,
                servings: 2,
                difficulty: "Easy",
                rating: 4.4,
                category: "salad",
                tags: ["Healthy", "Fresh", "Vegetarian"]
            },
            {
                id: 6,
                title: "BBQ Pulled Pork Sandwich",
                description: "Slow-cooked pork with tangy BBQ sauce on brioche buns",
                image: "/api/placeholder/400/300",
                prepTime: 30,
                cookTime: 240,
                servings: 8,
                difficulty: "Hard",
                rating: 4.8,
                category: "bbq",
                tags: ["BBQ", "Slow Cooked", "Comfort Food"]
            }
        ];
        setRecipes(mockRecipes);
    }, []);

    const handleRecipeClick = (recipeId) => {
        navigate(`/recipe/${recipeId}`);
    };
    const handleAddRecipe = () => {
        navigate('/add-recipe');
    };

    const filteredRecipes = recipes.filter(recipe => {
        const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || recipe.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const categories = ['all', 'seafood', 'pasta', 'curry', 'dessert', 'salad', 'bbq'];

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
            <HomeNavbar />

            <main className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
                        Our <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">Recipe Collection</span>

                    </h1>

                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Discover amazing recipes for every occasion, skill level, and taste preference
                    </p>
                    <button onClick={handleAddRecipe}
                        className="ml-4 bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors duration-200">
                        Add Recipe
                    </button>
                </div>

                {/* Search and Filter Section */}
                <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-orange-200 p-6 mb-8 shadow-lg">
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        <button onClick={handleAddRecipe}
                            className="ml-4 bg-orange-500 text-white px-4 py-2.5 rounded-md hover:bg-orange-600 transition-colors duration-200">
                            Add Recipe
                        </button>
                        {/* Search Bar */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                                type="text"
                                placeholder="Search recipes..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
                            />
                        </div>

                        {/* Category Filter */}
                        <div className="flex flex-wrap gap-2">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-4 py-2 rounded-full transition-all duration-200 font-medium ${selectedCategory === category
                                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg transform scale-105'
                                        : 'bg-orange-100 text-orange-700 hover:bg-orange-200 hover:scale-105'
                                        }`}
                                >
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Results Count */}
                <div className="mb-6">
                    <p className="text-gray-600 text-lg">
                        Showing <span className="font-bold text-orange-600">{filteredRecipes.length}</span> {filteredRecipes.length === 1 ? 'recipe' : 'recipes'}
                    </p>
                </div>

                {/* Recipes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {filteredRecipes.map((recipe) => (
                        <div
                            key={recipe.id}
                            onClick={() => handleRecipeClick(recipe.id)}
                            className="group cursor-pointer transform hover:-translate-y-2 transition-all duration-300"
                        >
                            <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-orange-200 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                                <div className="relative overflow-hidden">
                                    <img
                                        src={recipe.image}
                                        alt={recipe.title}
                                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1 shadow-md">
                                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                        <span className="text-sm font-semibold text-gray-700">{recipe.rating}</span>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors line-clamp-2">
                                        {recipe.title}
                                    </h3>
                                    <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">{recipe.description}</p>

                                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                        <div className="flex items-center space-x-1">
                                            <Clock className="h-4 w-4" />
                                            <span>{recipe.prepTime + recipe.cookTime}m</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Users className="h-4 w-4" />
                                            <span>{recipe.servings}</span>
                                        </div>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${recipe.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                                            recipe.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                            {recipe.difficulty}
                                        </span>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {recipe.tags.slice(0, 3).map((tag, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 text-xs rounded-full font-medium"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* No Results Message */}
                {filteredRecipes.length === 0 && (
                    <div className="text-center py-16">
                        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-12 border border-orange-200 shadow-lg max-w-md mx-auto">
                            <ChefHat className="h-20 w-20 text-orange-300 mx-auto mb-6" />
                            <h3 className="text-2xl font-bold text-gray-700 mb-4">No recipes found</h3>
                            <p className="text-gray-600 mb-6">
                                We couldn't find any recipes matching your search criteria.
                            </p>
                            <button
                                onClick={() => {
                                    setSearchTerm('');
                                    setSelectedCategory('all');
                                }}
                                className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                            >
                                Clear Filters
                            </button>
                        </div>
                    </div>
                )}
            </main>
            <button onClick={handleAddRecipe}
                className="fixed bottom-5 right-2 bg-orange-500 text-white px-6 py-3 shadow-lg hover:bg-orange-600 transition-colors duration-200 ai-style-change-1">
                Add Recipe
            </button>



        </div>
    );
};

export default RecipesList;
