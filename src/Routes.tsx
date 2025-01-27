import { Suspense } from "react";
import {Navigate, Route, Routes } from "react-router-dom";
import StepPage1 from "./pages/StepPage1";
import Home from "./pages/home";
import { GamePage } from "./pages/game"; // Named import

export function ProjectRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<StepPage1 />} />
          <Route path="/home" element={<Home />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </Suspense>
  );
}
