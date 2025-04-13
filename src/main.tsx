import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/global.scss";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "@/components/ErrorFallback/ErrorFallback";
import { BrowserRouter } from "react-router-dom";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("No root element found!");

createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
