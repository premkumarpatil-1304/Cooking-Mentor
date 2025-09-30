import { ClerkProviderWithRoutes } from "./auth_comp/ClerkProviderWithRoutes.jsx";
import { Route, Routes } from "react-router-dom";
import { AuthenticationPage } from "./auth_comp/Authentication";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import LandingPage from "./pages/LandingPage.jsx";
import Home from "./pages/Home";
import RecipePage from "./pages/RecipePage.jsx";
import RecipesList from "./pages/RecipesList.jsx";
import AddRecipe from "./pages/AddRecipe.jsx";

function App() {
  return (
    <ClerkProviderWithRoutes>
      <Routes>
        <Route path="/sign-in/*" element={<AuthenticationPage />} />
        <Route path="/sign-up/*" element={<AuthenticationPage />} />

        {/* Public route */}
        <Route path="/" element={<LandingPage />} />

        {/* Protected routes - only accessible when signed in */}
        <Route
          path="/Home"
          element={
            <SignedIn>
              <Home />
            </SignedIn>
          }
        />

        {/* Recipes list page */}
        <Route
          path="/recipes"
          element={
            <SignedIn>
              <RecipesList />
            </SignedIn>
          }
        />

        {/* Recipe detail page */}
        <Route
          path="/recipe/:id"
          element={
            <SignedIn>
              <RecipePage />
            </SignedIn>
          }
        />

        {/* Add recipe page - MOVED INSIDE <Routes> */}
        <Route
          path="/add-recipe"
          element={
            <SignedIn>
              <AddRecipe />
            </SignedIn>
          }
        />

        <Route
          path="/ai-mentor"
          element={
            <SignedIn>
              <div className="pt-20 p-8">AI Mentor Page Coming Soon!</div>
            </SignedIn>
          }
        />
        <Route
          path="/community"
          element={
            <SignedIn>
              <div className="pt-20 p-8">Community Page Coming Soon!</div>
            </SignedIn>
          }
        />
        <Route
          path="/profile"
          element={
            <SignedIn>
              <div className="pt-20 p-8">Profile Page Coming Soon!</div>
            </SignedIn>
          }
        />
      </Routes>  {/* ← Route should be BEFORE this closing tag */}
    </ClerkProviderWithRoutes>
  );
}

export default App;
