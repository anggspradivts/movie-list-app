import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./styles/darkmode.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "./components/ui/toaster.tsx";
import TanstackProvider from "./context/TanstackProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TanstackProvider>
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </TanstackProvider>
  </StrictMode>
);
