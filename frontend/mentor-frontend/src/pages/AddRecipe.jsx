import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeNavbar from '../components/HomeNavbar';
import {
  ChefHat,
  Clock,
  Users,
  Star,
  Plus,
  Trash2,
  Save,
  Send,
  ArrowLeft,
  Image as ImageIcon,
  BookOpen,
  ShoppingCart,
  X,
  AlertCircle
} from 'lucide-react';

const AddRecipe = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPreview, setShowPreview] = useState(false);

  // Main recipe form state
  const [recipeData, setRecipeData] = useState({
    title: '',
    description: '',
    image: '',
    category: '',
    prepTime: 0,
    cookTime: 0,
    servings: 1,
    difficulty: 'Easy',
    ingredients: [
      {
        group: 'Main Ingredients',
        items: [{ amount: '', unit: 'cup', name: '', notes: '' }]
      }
    ],
    instructions: [
      { step: 1, instruction: '', time: 0, tip: '' }
    ],
    tags: '',
    nutrition: { calories: 0, protein: 0, carbs: 0, fat: 0 },
    notes: ''
  });

  // Auto-save draft every 30 seconds
  useEffect(() => {
    const autoSave = setInterval(() => {
      if (recipeData.title || recipeData.description) {
        localStorage.setItem('recipe-draft', JSON.stringify(recipeData));
      }
    }, 30000);
    return () => clearInterval(autoSave);
  }, [recipeData]);

  // Load draft on mount
  useEffect(() => {
    const draft = localStorage.getItem('recipe-draft');
    if (draft) {
      const parsedDraft = JSON.parse(draft);
      if (parsedDraft.title || parsedDraft.description) {
        const loadDraft = window.confirm('Continue from saved draft?');
        if (loadDraft) {
          setRecipeData(parsedDraft);
        }
      }
    }
  }, []);

  // Handle basic field changes
  const handleFieldChange = (field, value) => {
    setRecipeData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Add new ingredient to a group
  const addIngredient = (groupIndex) => {
    const newIngredients = [...recipeData.ingredients];
    newIngredients[groupIndex].items.push({ amount: '', unit: 'cup', name: '', notes: '' });
    setRecipeData(prev => ({ ...prev, ingredients: newIngredients }));
  };

  // Remove ingredient
  const removeIngredient = (groupIndex, itemIndex) => {
    const newIngredients = [...recipeData.ingredients];
    newIngredients[groupIndex].items.splice(itemIndex, 1);
    setRecipeData(prev => ({ ...prev, ingredients: newIngredients }));
  };

  // Update ingredient
  const updateIngredient = (groupIndex, itemIndex, field, value) => {
    const newIngredients = [...recipeData.ingredients];
    newIngredients[groupIndex].items[itemIndex][field] = value;
    setRecipeData(prev => ({ ...prev, ingredients: newIngredients }));
  };

  // Add new ingredient group
  const addIngredientGroup = () => {
    const newIngredients = [...recipeData.ingredients];
    newIngredients.push({
      group: `Group ${newIngredients.length + 1}`,
      items: [{ amount: '', unit: 'cup', name: '', notes: '' }]
    });
    setRecipeData(prev => ({ ...prev, ingredients: newIngredients }));
  };

  // Remove ingredient group
  const removeIngredientGroup = (groupIndex) => {
    const newIngredients = recipeData.ingredients.filter((_, index) => index !== groupIndex);
    setRecipeData(prev => ({ ...prev, ingredients: newIngredients }));
  };

  // Update group name
  const updateGroupName = (groupIndex, newName) => {
    const newIngredients = [...recipeData.ingredients];
    newIngredients[groupIndex].group = newName;
    setRecipeData(prev => ({ ...prev, ingredients: newIngredients }));
  };

  // Add new instruction step
  const addStep = () => {
    const newInstructions = [...recipeData.instructions];
    newInstructions.push({
      step: newInstructions.length + 1,
      instruction: '',
      time: 0,
      tip: ''
    });
    setRecipeData(prev => ({ ...prev, instructions: newInstructions }));
  };

  // Remove instruction step
  const removeStep = (stepIndex) => {
    const newInstructions = recipeData.instructions
      .filter((_, index) => index !== stepIndex)
      .map((inst, index) => ({ ...inst, step: index + 1 }));
    setRecipeData(prev => ({ ...prev, instructions: newInstructions }));
  };

  // Update instruction
  const updateInstruction = (stepIndex, field, value) => {
    const newInstructions = [...recipeData.instructions];
    newInstructions[stepIndex][field] = value;
    setRecipeData(prev => ({ ...prev, instructions: newInstructions }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!recipeData.title.trim()) {
      newErrors.title = 'Recipe title is required';
    }
    if (!recipeData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!recipeData.category) {
      newErrors.category = 'Please select a category';
    }

    const hasValidIngredient = recipeData.ingredients.some(group =>
      group.items.some(item => item.name.trim())
    );
    if (!hasValidIngredient) {
      newErrors.ingredients = 'Add at least one ingredient';
    }

    const hasValidInstruction = recipeData.instructions.some(inst =>
      inst.instruction.trim()
    );
    if (!hasValidInstruction) {
      newErrors.instructions = 'Add at least one instruction step';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Save as draft
  const saveDraft = () => {
    localStorage.setItem('recipe-draft', JSON.stringify(recipeData));
    alert('Draft saved successfully!');
  };

  // Submit recipe
  const handleSubmit = async () => {
    if (!validateForm()) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      // Format data for API
      const formattedData = {
        ...recipeData,
        totalTime: parseInt(recipeData.prepTime) + parseInt(recipeData.cookTime),
        rating: 0,
        reviewCount: 0,
        tags: recipeData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        ingredients: recipeData.ingredients.filter(group =>
          group.items.some(item => item.name.trim())
        ),
        instructions: recipeData.instructions.filter(inst => inst.instruction.trim())
      };

      // Replace with your actual API endpoint
      const response = await fetch('http://localhost:8000/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add auth token if needed
        },
        body: JSON.stringify(formattedData)
      });

      if (response.ok) {
        const newRecipe = await response.json();
        localStorage.removeItem('recipe-draft');
        setShowSuccessModal(true);

        // Navigate to new recipe after 2 seconds
        setTimeout(() => {
          navigate(`/recipe/${newRecipe.id || 1}`);
        }, 2000);
      } else {
        alert('Failed to post recipe. Please try again.');
      }
    } catch (error) {
      console.error('Error posting recipe:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = ['seafood', 'pasta', 'curry', 'dessert', 'salad', 'bbq', 'healthy', 'italian'];
  const units = ['tsp', 'tbsp', 'cup', 'oz', 'lb', 'g', 'kg', 'ml', 'l', 'pieces', 'whole'];
  const difficulties = ['Easy', 'Medium', 'Hard'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <HomeNavbar />

      {/* Top Action Bar */}
      <div className="fixed top-20 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-orange-200 shadow-sm">
        <div className="max-w-8xl  mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 text-gray-600 hover:text-orange-500 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back</span>
            </button>

            <div className="flex items-center space-x-3">
              {/* Mobile Preview Toggle */}
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="md:hidden flex items-center space-x-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-lg hover:bg-orange-200 transition-colors"
              >
                {showPreview ? 'Edit' : 'Preview'}
              </button>

              <button
                onClick={saveDraft}
                className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Save className="h-4 w-4" />
                <span className="hidden sm:inline">Save Draft</span>
              </button>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
                <span>{isSubmitting ? 'Posting...' : 'Post Recipe'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-50 pb-12 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Left Column - Form (Mobile: hidden when preview shown) */}
          <div className={`lg:col-span-2 space-y-6 ${showPreview ? 'hidden lg:block' : ''}`}>

            {/* Basic Information */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-orange-200 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <ChefHat className="h-5 w-5 text-orange-500 mr-2" />
                Basic Information
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Recipe Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={recipeData.title}
                    onChange={(e) => handleFieldChange('title', e.target.value)}
                    placeholder="e.g., Mediterranean Herb-Crusted Salmon"
                    className={`w-full px-4 py-2 rounded-xl border ${errors.title ? 'border-red-500' : 'border-orange-200'
                      } focus:outline-none focus:ring-2 focus:ring-orange-500`}
                  />
                  {errors.title && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.title}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={recipeData.description}
                    onChange={(e) => handleFieldChange('description', e.target.value)}
                    placeholder="Describe your recipe..."
                    rows="3"
                    className={`w-full px-4 py-2 rounded-xl border ${errors.description ? 'border-red-500' : 'border-orange-200'
                      } focus:outline-none focus:ring-2 focus:ring-orange-500`}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.description}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image URL
                  </label>
                  <div className="flex items-center space-x-2">
                    <ImageIcon className="h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={recipeData.image}
                      onChange={(e) => handleFieldChange('image', e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      className="flex-1 px-4 py-2 rounded-xl border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={recipeData.category}
                    onChange={(e) => handleFieldChange('category', e.target.value)}
                    className={`w-full px-4 py-2 rounded-xl border ${errors.category ? 'border-red-500' : 'border-orange-200'
                      } focus:outline-none focus:ring-2 focus:ring-orange-500`}
                  >
                    <option value="">Select a category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.category}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Cooking Details */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-orange-200 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Clock className="h-5 w-5 text-orange-500 mr-2" />
                Cooking Details
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prep Time (min)
                  </label>
                  <input
                    type="number"
                    value={recipeData.prepTime}
                    onChange={(e) => handleFieldChange('prepTime', e.target.value)}
                    min="0"
                    className="w-full px-4 py-2 rounded-xl border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cook Time (min)
                  </label>
                  <input
                    type="number"
                    value={recipeData.cookTime}
                    onChange={(e) => handleFieldChange('cookTime', e.target.value)}
                    min="0"
                    className="w-full px-4 py-2 rounded-xl border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Servings
                  </label>
                  <input
                    type="number"
                    value={recipeData.servings}
                    onChange={(e) => handleFieldChange('servings', e.target.value)}
                    min="1"
                    className="w-full px-4 py-2 rounded-xl border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Difficulty
                  </label>
                  <select
                    value={recipeData.difficulty}
                    onChange={(e) => handleFieldChange('difficulty', e.target.value)}
                    className="w-full px-4 py-2 rounded-xl border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    {difficulties.map(diff => (
                      <option key={diff} value={diff}>{diff}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Ingredients */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-orange-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <ShoppingCart className="h-5 w-5 text-orange-500 mr-2" />
                  Ingredients
                </h2>
                <button
                  onClick={addIngredientGroup}
                  className="text-sm text-orange-600 hover:text-orange-700 font-medium"
                >
                  + Add Group
                </button>
              </div>

              {errors.ingredients && (
                <p className="text-red-500 text-sm mb-3 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.ingredients}
                </p>
              )}

              <div className="space-y-6">
                {recipeData.ingredients.map((group, groupIndex) => (
                  <div key={groupIndex} className="border-l-4 border-orange-300 pl-4">
                    <div className="flex items-center justify-between mb-3">
                      <input
                        type="text"
                        value={group.group}
                        onChange={(e) => updateGroupName(groupIndex, e.target.value)}
                        className="font-semibold text-orange-700 bg-transparent border-b border-orange-200 focus:outline-none focus:border-orange-500"
                      />
                      {recipeData.ingredients.length > 1 && (
                        <button
                          onClick={() => removeIngredientGroup(groupIndex)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>

                    <div className="space-y-2">
                      {group.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={item.amount}
                            onChange={(e) => updateIngredient(groupIndex, itemIndex, 'amount', e.target.value)}
                            placeholder="2"
                            className="w-16 px-2 py-1 text-sm rounded-lg border border-orange-200 focus:outline-none focus:ring-1 focus:ring-orange-500"
                          />
                          <select
                            value={item.unit}
                            onChange={(e) => updateIngredient(groupIndex, itemIndex, 'unit', e.target.value)}
                            className="w-20 px-2 py-1 text-sm rounded-lg border border-orange-200 focus:outline-none focus:ring-1 focus:ring-orange-500"
                          >
                            {units.map(unit => (
                              <option key={unit} value={unit}>{unit}</option>
                            ))}
                          </select>
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => updateIngredient(groupIndex, itemIndex, 'name', e.target.value)}
                            placeholder="Ingredient name"
                            className="flex-1 px-3 py-1 text-sm rounded-lg border border-orange-200 focus:outline-none focus:ring-1 focus:ring-orange-500"
                          />
                          <input
                            type="text"
                            value={item.notes}
                            onChange={(e) => updateIngredient(groupIndex, itemIndex, 'notes', e.target.value)}
                            placeholder="Notes"
                            className="w-20 px-2 py-1 text-sm rounded-lg border border-orange-200 focus:outline-none focus:ring-1 focus:ring-orange-500"
                          />
                          {group.items.length > 1 && (
                            <button
                              onClick={() => removeIngredient(groupIndex, itemIndex)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => addIngredient(groupIndex)}
                      className="mt-2 text-sm text-orange-600 hover:text-orange-700 flex items-center"
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Add Ingredient
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-orange-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <BookOpen className="h-5 w-5 text-orange-500 mr-2" />
                  Instructions
                </h2>
              </div>

              {errors.instructions && (
                <p className="text-red-500 text-sm mb-3 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.instructions}
                </p>
              )}

              <div className="space-y-4">
                {recipeData.instructions.map((instruction, index) => (
                  <div key={index} className="border-l-4 border-orange-300 pl-4">
                    <div className="flex items-start space-x-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                        {instruction.step}
                      </div>
                      <div className="flex-1">
                        <textarea
                          value={instruction.instruction}
                          onChange={(e) => updateInstruction(index, 'instruction', e.target.value)}
                          placeholder="Describe this step..."
                          rows="3"
                          className="w-full px-3 py-2 rounded-lg border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                        />
                      </div>
                      {recipeData.instructions.length > 1 && (
                        <button
                          onClick={() => removeStep(index)}
                          className="text-red-500 hover:text-red-700 flex-shrink-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3 ml-11">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Time (minutes)</label>
                        <input
                          type="number"
                          value={instruction.time}
                          onChange={(e) => updateInstruction(index, 'time', e.target.value)}
                          placeholder="0"
                          min="0"
                          className="w-full px-3 py-1 text-sm rounded-lg border border-orange-200 focus:outline-none focus:ring-1 focus:ring-orange-500"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-xs text-gray-600 mb-1">Pro Tip (optional)</label>
                        <input
                          type="text"
                          value={instruction.tip}
                          onChange={(e) => updateInstruction(index, 'tip', e.target.value)}
                          placeholder="Add a helpful tip..."
                          className="w-full px-3 py-1 text-sm rounded-lg border border-orange-200 focus:outline-none focus:ring-1 focus:ring-orange-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  onClick={addStep}
                  className="w-full py-2 border-2 border-dashed border-orange-300 rounded-lg text-orange-600 hover:bg-orange-50 transition-colors flex items-center justify-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Step</span>
                </button>
              </div>
            </div>

            {/* Additional Details */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-orange-200 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Additional Details</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={recipeData.tags}
                    onChange={(e) => handleFieldChange('tags', e.target.value)}
                    placeholder="e.g., Healthy, Mediterranean, Quick"
                    className="w-full px-4 py-2 rounded-xl border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nutrition Information (optional)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      value={recipeData.nutrition.calories}
                      onChange={(e) => setRecipeData(prev => ({
                        ...prev,
                        nutrition: { ...prev.nutrition, calories: e.target.value }
                      }))}
                      placeholder="Calories"
                      className="px-3 py-2 text-sm rounded-lg border border-orange-200 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                    <input
                      type="number"
                      value={recipeData.nutrition.protein}
                      onChange={(e) => setRecipeData(prev => ({
                        ...prev,
                        nutrition: { ...prev.nutrition, protein: e.target.value }
                      }))}
                      placeholder="Protein (g)"
                      className="px-3 py-2 text-sm rounded-lg border border-orange-200 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                    <input
                      type="number"
                      value={recipeData.nutrition.carbs}
                      onChange={(e) => setRecipeData(prev => ({
                        ...prev,
                        nutrition: { ...prev.nutrition, carbs: e.target.value }
                      }))}
                      placeholder="Carbs (g)"
                      className="px-3 py-2 text-sm rounded-lg border border-orange-200 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                    <input
                      type="number"
                      value={recipeData.nutrition.fat}
                      onChange={(e) => setRecipeData(prev => ({
                        ...prev,
                        nutrition: { ...prev.nutrition, fat: e.target.value }
                      }))}
                      placeholder="Fat (g)"
                      className="px-3 py-2 text-sm rounded-lg border border-orange-200 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Chef's Notes
                  </label>
                  <textarea
                    value={recipeData.notes}
                    onChange={(e) => handleFieldChange('notes', e.target.value)}
                    placeholder="Any additional notes or tips..."
                    rows="3"
                    className="w-full px-4 py-2 rounded-xl border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Live Preview (Mobile: shown when preview toggled) */}
          <div className={`lg:col-span-3 ${showPreview ? 'block' : 'hidden lg:block'}`}>
            <div className="sticky top-36">
              <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-orange-200 overflow-hidden shadow-lg">
                <div className="bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-3">
                  <h3 className=" text-white font-bold text-center">Live Preview</h3>
                </div>

                <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
                  {/* Hero Preview */}
                  {recipeData.image && (
                    <div className="relative h-180 rounded-xl overflow-hidden mb-6">
                      <img
                        src={recipeData.image}
                        alt={recipeData.title || 'Recipe preview'}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = '/api/placeholder/400/300';
                        }}
                      />
                      {recipeData.title && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end">
                          <h2 className="text-white font-bold text-2xl p-4">{recipeData.title}</h2>
                        </div>
                      )}
                    </div>
                  )}

                  {!recipeData.image && recipeData.title && (
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">{recipeData.title}</h2>
                  )}

                  {recipeData.description && (
                    <p className="text-gray-600 mb-6">{recipeData.description}</p>
                  )}

                  {/* Metadata */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {recipeData.prepTime > 0 && (
                      <div className="bg-gradient-to-br from-orange-100 to-amber-100 rounded-xl p-3 text-center">
                        <Clock className="h-4 w-4 text-orange-500 mx-auto mb-1" />
                        <div className="text-xs text-gray-600">Prep</div>
                        <div className="text-sm font-semibold text-orange-700">{recipeData.prepTime}m</div>
                      </div>
                    )}
                    {recipeData.cookTime > 0 && (
                      <div className="bg-gradient-to-br from-orange-100 to-amber-100 rounded-xl p-3 text-center">
                        <Clock className="h-4 w-4 text-orange-500 mx-auto mb-1" />
                        <div className="text-xs text-gray-600">Cook</div>
                        <div className="text-sm font-semibold text-orange-700">{recipeData.cookTime}m</div>
                      </div>
                    )}
                    {recipeData.servings > 0 && (
                      <div className="bg-gradient-to-br from-orange-100 to-amber-100 rounded-xl p-3 text-center">
                        <Users className="h-4 w-4 text-orange-500 mx-auto mb-1" />
                        <div className="text-xs text-gray-600">Servings</div>
                        <div className="text-sm font-semibold text-orange-700">{recipeData.servings}</div>
                      </div>
                    )}
                  </div>

                  {/* Ingredients Preview */}
                  {recipeData.ingredients.some(g => g.items.some(i => i.name)) && (
                    <div className="mb-6">
                      <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                        <ShoppingCart className="h-5 w-5 text-orange-500 mr-2" />
                        Ingredients
                      </h3>
                      {recipeData.ingredients.map((group, gIndex) => {
                        const validItems = group.items.filter(item => item.name.trim());
                        if (validItems.length === 0) return null;

                        return (
                          <div key={gIndex} className="mb-4">
                            <h4 className="font-semibold text-orange-700 text-sm mb-2 border-b border-orange-200 pb-1">
                              {group.group}
                            </h4>
                            <div className="space-y-1">
                              {validItems.map((item, iIndex) => (
                                <div
                                  key={iIndex}
                                  className="overflow-x-auto"
                                >
                                  <div className="inline-flex items-center text-sm text-gray-700 space-x-2 min-w-max">
                                    <input
                                      type="checkbox"
                                      className="mt-1 h-3 w-3 text-orange-500 rounded flex-shrink-0"
                                      disabled
                                    />
                                    <span className="whitespace-nowrap">
                                      {item.amount && `${item.amount} `}
                                      {item.unit && `${item.unit} `}
                                      {item.name}
                                      {item.notes && ` (${item.notes})`}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        );

                      })}
                    </div>
                  )}


                  {/* Instructions Preview */}
                  {recipeData.instructions.some(inst => inst.instruction.trim()) && (
                    <div className="mb-6">
                      <div></div>
                      <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                        <BookOpen className="h-5 w-5 text-orange-500 mr-2" />
                        Instructions
                      </h3>
                      <div className="space-y-4">
                        {recipeData.instructions
                          .filter(inst => inst.instruction.trim())
                          .map((instruction, index) => (
                            <div key={index} className="border-l-4 border-orange-300 pl-4">
                              <div className="flex items-start space-x-3">
                                <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                                  {instruction.step}
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm text-gray-800">{instruction.instruction}</p>
                                  {instruction.time > 0 && (
                                    <div className="flex items-center text-xs text-orange-600 mt-1">
                                      <Clock className="h-3 w-3 mr-1" />
                                      <span>{instruction.time} minutes</span>
                                    </div>
                                  )}
                                  {instruction.tip && (
                                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-2 text-xs text-amber-700 mt-2">
                                      <strong>Pro Tip:</strong> {instruction.tip}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Tags Preview */}
                  {recipeData.tags && (
                    <div className="flex flex-wrap gap-2">
                      {recipeData.tags.split(',').map((tag, index) => {
                        const trimmedTag = tag.trim();
                        if (!trimmedTag) return null;
                        return (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 text-xs rounded-full font-medium"
                          >
                            {trimmedTag}
                          </span>
                        );
                      })}
                    </div>
                  )}

                  {/* Empty State */}
                  {!recipeData.title && !recipeData.description && (
                    <div className="text-center py-12 text-gray-400">
                      <ChefHat className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p>Start filling in the form to see your recipe preview</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center animate-bounce">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <ChefHat className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Recipe Published!</h2>
            <p className="text-gray-600 mb-4">
              Your delicious recipe has been shared with the community.
            </p>
            <div className="bg-gradient-to-r from-orange-100 to-amber-100 rounded-lg p-4 text-sm text-gray-700">
              Redirecting to your recipe...
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddRecipe;
