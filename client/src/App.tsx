import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Home from "@/pages/home";
import Lots from "@/pages/lots";
import Availability from "@/pages/availability";
import Progress from "@/pages/progress";
import Contact from "@/pages/contact";
import Admin from "@/pages/admin";
import NotFound from "@/pages/not-found";

// /admin no muestra el Header ni Footer — es una vista interna
const ADMIN_ROUTES = ["/admin"];

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/lotes" component={Lots} />
      <Route path="/disponibilidad" component={Availability} />
      <Route path="/contacto" component={Contact} />
      <Route path="/avance" component={Progress} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [location] = useLocation();
  const isAdminRoute = ADMIN_ROUTES.some((r) => location.startsWith(r));

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <div className="flex flex-col min-h-screen">
            {!isAdminRoute && <Header />}
            <main className={`flex-1 ${!isAdminRoute ? "pt-16 md:pt-20" : ""}`}>
              <Router />
            </main>
            {!isAdminRoute && <Footer />}
          </div>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
