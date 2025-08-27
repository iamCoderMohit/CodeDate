import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Feed from "./pages/Feed";
import { useSelector } from "react-redux";
import Profile from "./pages/Profile";
import UserProfile from "./pages/UserProfile";
import Chat from "./pages/Chat";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/feed"
          element={
            <ProtectedRoute isAuthenticated={isLoggedIn}>
              <Feed />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute isAuthenticated={isLoggedIn}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/:username"
          element={
            <ProtectedRoute isAuthenticated={isLoggedIn}>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat/:username"
          element={
            <ProtectedRoute isAuthenticated={isLoggedIn}>
              <Chat />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
