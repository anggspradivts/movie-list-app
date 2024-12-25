import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import TanstackProvider from "./context/TanstackProvider.tsx";
import { router } from "./router.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TanstackProvider>
      <RouterProvider router={router} />
    </TanstackProvider>
  </StrictMode>
);