import { ClerkProviderWithRoutes } from "./auth_comp/ClerkProviderWithRoutes.jsx";
import { Route, Routes } from "react-router-dom";
import { AuthenticationPage } from "./auth_comp/Authentication";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage.jsx";

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
            <SignedIn>\\
              <Home />
            </SignedIn>
          }
        />
        <Route
          path="/recipes"
          element={
            <SignedIn>
              <div className="pt-20 p-8">Recipes Page Coming Soon!</div>
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
      </Routes>
    </ClerkProviderWithRoutes>
  );
}

export default App;
