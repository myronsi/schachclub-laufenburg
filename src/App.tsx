import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import React, { useEffect } from "react";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import Home from "./pages/Home";
import About from "./pages/About";
import Mannschaften from "./pages/Mannschaften";
import Youth from "./pages/Youth";
import Spiellokal from "./pages/Spiellokal"
import Tournaments from "./pages/tournaments/Tournaments";
import Vereinsmeister from "./pages/tournaments/Vereinsmeister";
import Pokalsieger from "./pages/tournaments/Pokalsieger";
import Nikolausblitz from "./pages/tournaments/Nikolausblitz";
import Blitzsieger from "./pages/tournaments/Blitzsieger";
import Media from "./pages/archive/Media";
import MediaPrivate from "./pages/archive/MediaPrivate";
import Chronik from "./pages/archive/Chronik";
import Galerie from "./pages/archive/Galerie";
import Documents from "./pages/archive/Documents";
import Contact from "./pages/Contact";
import ContactOk from "./pages/ContactOk";
import Calendar from "./pages/Calendar";
import Impressum from "./pages/Impessum";
import Datenschutz from "./pages/Datenschutz";
import Mitgliedwerden from "./pages/Mitgliedweden";
import Login from "./pages/Login";
import AktuellesDetail from "./pages/AktuellesDetail";
import Aktuelles from "./pages/Aktuelles";
import Mitgliederbereich from "./pages/Mitgliederbereich";
import NotFound from "./pages/notFound";

const queryClient = new QueryClient();

const TitleRoute = ({ title, element }: { title?: string; element: React.ReactElement }) => {
  useEffect(() => {
    if (title) {
      document.title = `SC Laufenburg - ${title}`;
    } else {
      document.title = `SC Laufenburg`;
    }
  }, [title]);

  return element;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col">
          <Header />
          <Routes>
            <Route path="/" element={<TitleRoute element={<Home />} />} />
            <Route path="/ueberuns" element={<TitleRoute title={"Über uns"} element={<About />} />} />
            <Route path="/mannschaften" element={<TitleRoute title={"Mannschaften"} element={<Mannschaften />} />} />
            <Route path="/jugend" element={<TitleRoute title={"Jugend"} element={<Youth />} />} />
            <Route path="/spiellokal" element={<TitleRoute title={"Spiellokal"} element={<Spiellokal />} />} />
            <Route path="/turniere" element={<TitleRoute title={"Turniere"} element={<Tournaments />} />} />
            <Route path="/turniere/vereinsmeister" element={<TitleRoute title={"Vereinsmeister"} element={<Vereinsmeister />} />} />
            <Route path="/turniere/pokalsieger" element={<TitleRoute title={"Pokalsieger"} element={<Pokalsieger />} />} />
            <Route path="/turniere/nikolausblitz" element={<TitleRoute title={"Nikolausblitz"} element={<Nikolausblitz />} />} />
            <Route path="/turniere/blitzsieger" element={<TitleRoute title={"Blitzsieger"} element={<Blitzsieger />} />} />
            <Route path="/archiv" element={<TitleRoute title={"Archiv"} element={<Media />} />} />
            <Route path="/archiv/chronik" element={<TitleRoute title={"Chronik"} element={<Chronik />} />} />
            <Route path="/archiv/galerie" element={<TitleRoute title={"Galerie"} element={<Galerie />} />} />
            <Route path="/archiv/galerie/:title" element={<TitleRoute title={"Galerie"} element={<Galerie />} />} />
            <Route path="/archiv/galerie-private" element={<TitleRoute title={"Galerie"} element={<MediaPrivate />} />} />
            <Route path="/archiv/galerie-private/:title" element={<TitleRoute title={"Galerie"} element={<MediaPrivate />} />} />
            <Route path="/archiv/dokumente" element={<TitleRoute title={"Dokumente"} element={<Documents />} />} />
            <Route path="/kontakt" element={<TitleRoute title={"Kontakt"} element={<Contact />} />} />
            <Route path="/kontakt-ok" element={<TitleRoute title={"Kontakt - Bestätigt"} element={<ContactOk />} />} />
            <Route path="/kalender" element={<TitleRoute title={"Kalender"} element={<Calendar />} />} />
            <Route path="/kalender/*" element={<TitleRoute title={"Kalender"} element={<Calendar />} />} />
            <Route path="/mitgliedwerden" element={<TitleRoute title={"Mitglied werden"} element={<Mitgliedwerden />} />} />
            <Route path="/mitgliederbereich" element={<TitleRoute title={"Mitgliederbereich"} element={<Mitgliederbereich />} />} />
            <Route path="/aktuelles/:slug" element={<TitleRoute title={"Aktuelles"} element={<AktuellesDetail />} />} />
            <Route path="/aktuelles" element={<TitleRoute title={"Aktuelles"} element={<Aktuelles />} />} />
            <Route path="/login" element={<TitleRoute title={"Login"} element={<Login />} />} />
            <Route path="/impressum" element={<TitleRoute title={"Impressum"} element={<Impressum />} />} />
            <Route path="/datenschutz" element={<TitleRoute title={"Datenschutz"} element={<Datenschutz />} />} />
            <Route path="*" element={<TitleRoute title={"404"} element={<NotFound />} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;