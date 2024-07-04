import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home, MessageSquare, User } from "lucide-react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SidebarLayout from "./layouts/sidebar"; // Use the sidebar layout
import Index from "./pages/Index.jsx";
import Discussion from "./pages/Discussion.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import Register from "./pages/Register.jsx";

const queryClient = new QueryClient();

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <Home className="h-4 w-4" />,
  },
  {
    title: "Discussions",
    to: "/discussions",
    icon: <MessageSquare className="h-4 w-4" />,
  },
  {
    title: "Profile",
    to: "/profile",
    icon: <User className="h-4 w-4" />,
  },
];

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router>
          <Routes>
            <Route path="/" element={<SidebarLayout />}>
              <Route index element={<Index />} />
              <Route path="discussions" element={<Discussion />} />
              <Route path="profile" element={<UserProfile />} />
              <Route path="/register" element={<Register />} />
            </Route>
          </Routes>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;