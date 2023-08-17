import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./index.css";
import SignInPage from "./Components/Users/Pages/SignInPage";
import HomePage from "./Components/Users/Pages/HomePage";
import NotFound from "./Components/Users/Pages/NotFound";
import SignUp from "./Components/Users/Pages/SignUpPage";
import Profile from "./Components/Users/Pages/Profile";
import GenrePage from "./Components/Users/Pages/GenrePage";
import MyAccountPage from "./Components/Users/Pages/MyAccountPage";

const App = () => {
  //To protect private routes
  const PrivateRoute = ({ children }) => {
    const isAuth = localStorage.getItem("jwtToken");
    console.log(isAuth);
    return isAuth ? children : <Navigate to="/signin" />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" exact={true} element={<NotFound />} />

        {/* Prototype */}
        {/* <Route path="/api/genre/:id/series" element={<GenrePage />} /> */}

        {/* ProtectedRoutes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/account"
          element={
            <PrivateRoute>
              <MyAccountPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/api/genre/:id/series"
          element={
            <PrivateRoute>
              <GenrePage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
