
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/navbar/Navbar';
import { Dashboard } from './components/dashboard/Dashboard';
import { ExerciseList } from './components/exercises/ExerciseList';
import { WorkoutTracker } from './components/workouts/WorkoutTracker';
import { WorkoutSessionDetail } from './components/workouts/WorkoutSessionDetail';
import { Profile } from './components/profile/Profile';
import { LoginPage, RegisterPage } from './components/auth/AuthPages';
import { authService } from './services/authService';

// Guardia de ruta simple para React
const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  return authService.isAuthenticated() ? children : <Navigate to="/login" />;
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white flex flex-col">
        <Navbar />
        <main className="flex-1 max-w-7xl mx-auto w-full">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            <Route path="/dashboard" element={
              <PrivateRoute><Dashboard /></PrivateRoute>
            } />
            
            <Route path="/exercises" element={
              <PrivateRoute><ExerciseList /></PrivateRoute>
            } />
            
            <Route path="/workouts" element={
              <PrivateRoute><WorkoutTracker /></PrivateRoute>
            } />

            <Route path="/workouts/:id" element={
              <PrivateRoute><WorkoutSessionDetail /></PrivateRoute>
            } />

            <Route path="/profile" element={
              <PrivateRoute><Profile /></PrivateRoute>
            } />

            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="*" element={<div className="p-20 text-center font-black text-4xl italic uppercase">404 - RUTA INEXISTENTE EN LA FORJA</div>} />
          </Routes>
        </main>
        
        <footer className="bg-black border-t border-gray-900 py-16 px-4 text-center">
          <div className="flex justify-center gap-4 mb-4">
            <div className="w-8 h-1 bg-yellow-500"></div>
            <div className="w-8 h-1 bg-yellow-500"></div>
            <div className="w-8 h-1 bg-yellow-500"></div>
          </div>
          <p className="text-white font-black tracking-[0.3em] text-sm uppercase italic">
            IRON<span className="text-yellow-500">FORGE</span>
          </p>
          <p className="text-gray-700 font-bold tracking-widest text-[10px] uppercase mt-2">
            © 2024 ELITE PERFORMANCE TRACKING - POWERED BY SPRING BOOT & REACT
          </p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
