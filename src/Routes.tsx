import { Suspense } from "react";
import {Navigate, useLocation, Route, Routes } from "react-router-dom";
import StepPage1 from "./pages/StepPage1";
import StepPage2 from "./pages/home";
import { GamePage } from "./pages/game"; // Named import
import Result from "./components/Result"; // Corrected to default import

export function ProjectRoutes() {
  const location = useLocation(); 
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<StepPage1 />} />
          <Route path="/home" element={<StepPage2 />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/result" element={<Result {...location.state} />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
    </Suspense>
  );
}
