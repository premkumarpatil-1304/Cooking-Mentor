import { SignIn, SignUp, SignedIn, SignedOut } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

export function AuthenticationPage() {
    return (
        <div className="auth-container min-h-screen justify-center items-center flex p-8 bg-gradient-to-br from-orange-50 to-yellow-50">
            <SignedOut>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <SignIn
                        routing="path"
                        path="/sign-in"
                        afterSignInUrl="/Home"
                        appearance={{
                            elements: {
                                formButtonPrimary: "bg-orange-500 hover:bg-orange-600",
                                card: "shadow-none"
                            }
                        }}
                    />
                    <SignUp
                        routing="path"
                        path="/sign-up"
                        afterSignUpUrl="/Home"
                        appearance={{
                            elements: {
                                formButtonPrimary: "bg-orange-500 hover:bg-orange-600",
                                card: "shadow-none"
                            }
                        }}
                    />
                </div>
            </SignedOut>

            <SignedIn>
                <Navigate to="/Home" replace />
            </SignedIn>
        </div>
    );
}
