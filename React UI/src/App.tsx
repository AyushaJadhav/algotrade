// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./lib/store";
import { RBACProvider } from "./lib/rbac/RBACProvider";
import { Role } from "./lib/rbac/types";

import Index from "./pages/Index";
import InlineEditorPage from "./pages/InlineEditorPage";
import NotFound from "./pages/NotFound";
import StreamingPage from "./pages/StreamingPage";
import BusinessCaseStreamer from "./pages/BusinessCaseStreamer";
import ProjectCharter from "./pages/ProjectCharter";

import ProtectedRoute from "./components/templates/ProtectedRoute";

import { FluentProvider, webLightTheme } from '@fluentui/react-components';

<FluentProvider theme={webLightTheme}>
 
</FluentProvider>


// Demo user for RBAC - in a real app this would come from authentication
const demoUser = {
  id: "1",
  name: "Demo User",
  roles: ["editor" as Role],
};

const queryClient = new QueryClient();

const App = () => (
  <ReduxProvider store={store}>
    <RBACProvider initialUser={demoUser}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />

              <Route
                path="/inline-editor"
                element={
                  <ProtectedRoute requiredRoles={["admin", "editor"]}>
                    <InlineEditorPage />
                  </ProtectedRoute>
                }
              />

              <Route path="/streaming" element={<StreamingPage />} />
<Route path="/project-charter-streaming" element={<ProjectCharter />} />

              

              {/* Catch-all route for 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </RBACProvider>
  </ReduxProvider>
);

export default App;
