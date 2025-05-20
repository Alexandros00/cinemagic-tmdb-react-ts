import Navbar from "@components/Navbar/Navbar";
import LandingPage from "@pages/landing-page/LandingPage";
import { Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "@components/ErrorFallback/ErrorFallback";
import PageLoader from "@/components/PageLoader/PageLoader";
import GoToTopButton from "./components/GoToTopButton/GoToTopButton";

const NotFound = lazy(() => import("@/components/NotFound/NotFound"));

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<PageLoader />}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/movies" replace />} />
          <Route path="/movies/:id?" element={<LandingPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <GoToTopButton />
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
