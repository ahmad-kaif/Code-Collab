import { SignInButton, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Landing = () => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  if (isSignedIn) {
    navigate("/dashboard");
    return null;
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold">Welcome to CodeCollab</h1>
      <p className="mt-2 text-gray-400">Collaborate on code in real-time.</p>
      <SignInButton>
        <Button className="mt-4 px-6 py-3 text-lg bg-blue-600 hover:bg-blue-700">
          Sign In to Continue
        </Button>
      </SignInButton>
    </div>
  );
};

export default Landing;
