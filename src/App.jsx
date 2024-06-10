import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterVehiclePage from "./pages/RegisterVehiclePage";
import EntryPage from "./pages/EntryPage";
import StatusPage from "./pages/StatusPage";
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from "./contexts/AuthContext";
import { ParkingProvider } from "./contexts/ParkingContext";
import "./styles/global.css";

const App = () => (
  <AuthProvider>
    <ParkingProvider>
      <Router>
        <div className="container">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/register"
              element={
                <ProtectedRoute>
                  <RegisterVehiclePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/entry"
              element={
                <ProtectedRoute>
                  <EntryPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/status"
              element={
                <ProtectedRoute>
                  <StatusPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </ParkingProvider>
  </AuthProvider>
);

export default App;
