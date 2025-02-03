import { Route, Routes } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Room from "./pages/Room";
import AllRooms from "./pages/AllRooms";
import Navbar from "./pages/Header";


const App = () => {


  return (
    <>
      <div className="flex flex-col">
        {/* Apply the hidden class conditionally */}
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/dashboard"
            element={
              <SignedIn>
                <Dashboard />
              </SignedIn>
            }
          />
          <Route
            path="/room/:roomId"
            element={
              <SignedIn>
                <Room />
              </SignedIn>
            }
          />
          <Route
            path="*"
            element={
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            }
          />
          <Route
            path="/allrooms"
            element={
              <>
                <SignedIn>
                  <AllRooms />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />
        </Routes>
      </div>
    </>
  );
};

export default App;
