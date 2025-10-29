export const navItems = [
    { path: "/aktuelles", label: "Aktuelles" },
    { path: "/ueberuns", label: "Über uns" },
    { path: "/mitgliedwerden", label: "Mitglied werden" },
    { path: "/mannschaften", label: "Mannschaften" },
    // { path: "/kalender", label: "Kalender" },
    { 
      path: "/turniere", 
      label: "Turniere" 
    , children: [
        { path: "/nikolausblitz", label: "Nikolausblitz" },
        { path: "/vereinsmeister", label: "Vereinsmeister" },
        { path: "/pokalsieger", label: "Pokalsieger" },
        { path: "/blitzsieger", label: "Blitzsieger" },
      ]
    },
    {
      path: "/archiv",
      label: "Archiv",
      children: [
        { path: "/chronik", label: "Chronik" },
        { path: "/galerie", label: "Galerie" },
        { path: "/dokumente", label: "Dokumente" },
      ],
    },
    { path: "/kontakt", label: "Kontakt" },
  ];