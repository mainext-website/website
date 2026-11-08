import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import WorkIndex from "./pages/WorkIndex";
import CaseStudy from "./pages/CaseStudy";
import ServiceLanding from "./pages/ServiceLanding";
import NotFound from "./pages/NotFound";

const Admin = lazy(() => import("./pages/admin/Admin"));

const App = () => (
  <ThemeProvider defaultTheme="dark" storageKey="mainext-theme-v2">
    <MotionConfig reducedMotion="user">
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/work" element={<WorkIndex />} />
            <Route path="/work/:slug" element={<CaseStudy />} />
            <Route path="/services/:slug" element={<ServiceLanding />} />
            <Route
              path="/admin"
              element={
                <Suspense fallback={<div className="grid min-h-screen place-items-center text-muted-foreground">Loading admin…</div>}>
                  <Admin />
                </Suspense>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </MotionConfig>
  </ThemeProvider>
);

export default App;
