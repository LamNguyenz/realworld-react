import { QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
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
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
