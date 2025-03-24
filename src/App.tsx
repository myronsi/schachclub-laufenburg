import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import Home from "./pages/Home";
import About from "./pages/About";
import Mannschaften from "./pages/Mannschaften";
import Youth from "./pages/Youth";
import Tournaments from "./pages/Tournaments";
import Media from "./pages/Media";
import Contact from "./pages/Contact";
import ContactOk from "./pages/ContactOk";
import Impressum from "./pages/Impessum";
import Datenschutz from "./pages/Datenschutz";
import Footer from "@/components/Footer";
import NotFound from "./pages/notFound";

const queryClient = new QueryClient();

const PageRouter = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");

  const validPages = [
    "ueberuns",
    "mannschaften",
    "jugend",
    "turniere",
    "archiv",
    "kontakt",
    "kontakt-ok",
    "impressum",
    "datenschutz",
    "index.html"
  ];

  if (page && !validPages.includes(page)) {
    return <NotFound />;
  }

  switch (page) {
    case "ueberuns":
      return <About />;
    case "mannschaften":
      return <Mannschaften />;
    case "jugend":
      return <Youth />;
    case "turniere":
      return <Tournaments />;
    case "archiv":
      return <Media />;
    case "kontakt":
      return <Contact />;
    case "kontakt-ok":
      return <ContactOk />;
    case "impressum":
      return <Impressum />;
    case "datenschutz":
      return <Datenschutz />;
    case "index.html":
      return <Home />;
    default:
      return <Home />;
  }
};

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
            <Route path="/" element={<PageRouter />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;