import Navbar from "@components/Navbar/Navbar";
import LandingPage from "./pages/landing-page/LandingPage";
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./components/ErrorFallback";
import PageLoader from "./components/PageLoader";

const NotFound = lazy(() => import("@components/NotFound"));

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<PageLoader />}>
        <Navbar />
        <LandingPage />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
