import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import Home from "./pages/Home";
import About from "./pages/About";
import Mannschaften from "./pages/Mannschaften";
import Youth from "./pages/Youth";
import Tournaments from "./pages/tournaments/Tournaments";
import Vereinsmeister from "./pages/tournaments/Vereinsmeister";
import Pokalsieger from "./pages/tournaments/Pokalsieger";
import Nikolausblitz from "./pages/tournaments/Nikolausblitz";
import Blitzsieger from "./pages/tournaments/Blitzsieger";
import Media from "./pages/archive/Media";
import Chronik from "./pages/archive/Chronik";
import Galerie from "./pages/archive/Galerie";
import Documents from "./pages/archive/Documents";
import Contact from "./pages/Contact";
import ContactOk from "./pages/ContactOk";
import Calendar from "./pages/Calendar";
import Impressum from "./pages/Impessum";
import Datenschutz from "./pages/Datenschutz";
import Mitgliedwerden from "./pages/Mitgliedweden";
import Footer from "@/components/Footer";
import NotFound from "./pages/notFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
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
            <Route path="/turniere/vereinsmeister" element={<Vereinsmeister />} />
            <Route path="/turniere/pokalsieger" element={<Pokalsieger />} />
            <Route path="/turniere/nikolausblitz" element={<Nikolausblitz />} />
            <Route path="/turniere/blitzsieger" element={<Blitzsieger />} />
            <Route path="/archiv" element={<Media />} />
            <Route path="/archiv/chronik" element={<Chronik />} />
            <Route path="/archiv/galerie" element={<Galerie />} />
            <Route path="/archiv/dokumente" element={<Documents />} />
            <Route path="/kontakt" element={<Contact />} />
            <Route path="/kontakt-ok" element={<ContactOk />} />
            <Route path="/kalender" element={<Calendar />} />
            <Route path="/mitgliedwerden" element={<Mitgliedwerden />} />
            <Route path="/impressum" element={<Impressum />} />
            <Route path="/datenschutz" element={<Datenschutz />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;