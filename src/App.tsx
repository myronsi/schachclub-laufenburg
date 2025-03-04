import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import Home from "./pages/Home";
import About from "./pages/About";
import Mannschaften from "./pages/Mannschaften";
import Youth from "./pages/Youth";
import Tournaments from "./pages/Tournaments";
import Media from "./pages/Media";
import Contact from "./pages/Contact";
import Impressum from "./pages/Impessum";
import Datenschutz from "./pages/Datenschutz";
import Footer from "@/components/Footer";
import NotFound from "./pages/notFound";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ueberuns" element={<About />} />
            <Route path="/mannschaften" element={<Mannschaften />} />
            <Route path="/jugend" element={<Youth />} />
            <Route path="/turniere" element={<Tournaments />} />
            <Route path="/archiv" element={<Media />} />
            <Route path="/kontakt" element={<Contact />} />
            <Route path="/impressum" element={<Impressum />} />
            <Route path="/datenschutz" element={<Datenschutz />} />
            <Route path="/index_NEW.html" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;