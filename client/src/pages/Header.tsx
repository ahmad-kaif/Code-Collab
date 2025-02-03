import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { SignOutButton, useUser, UserButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  className?: string; // Add the className prop
}

const Navbar = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useUser(); // Get the user's authentication status

  return (
    <nav className=" dark:bg-gray-900 dark:text-white shadow-lg fixed top-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo (Left) */}
        <div
          className="text-2xl font-bold cursor-pointer"
          onClick={() => navigate(isSignedIn ? "/dashboard" : "/")}
        >
          🌍 Code Collab
        </div>

        {/* Right Section: Logout Button & UserButton */}
        <div className="flex items-center space-x-4">
          {isSignedIn && (
            <SignOutButton>
              <Button className="bg-red-600 hover:bg-red-700">
                Sign Out
              </Button>
            </SignOutButton>
          )}
          <UserButton afterSignOutUrl="/login" />
          <ModeToggle/>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
