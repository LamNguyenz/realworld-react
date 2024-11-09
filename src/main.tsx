import { QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { NuqsAdapter } from "nuqs/adapters/react";

import App from "./App.tsx";
import queryClient from "./queries/queryClient.ts";

import "react-toastify/dist/ReactToastify.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <NuqsAdapter>
          <App />
        </NuqsAdapter>
        <ToastContainer position="bottom-right" />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
