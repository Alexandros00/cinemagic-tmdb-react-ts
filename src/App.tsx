import Navbar from "@components/Navbar/Navbar";
import LandingPage from "./pages/landing-page/LandingPage";
import { Route, Routes } from "react-router-dom";
import { lazy } from "react";

const NotFound = lazy(() => import("@components/NotFound"));

function App() {
  return (
    <>
      <Navbar />
      <LandingPage />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
