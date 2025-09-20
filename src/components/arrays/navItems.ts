export const navItems = [
    { path: "/", label: "Aktuelles" },
    { path: "/ueberuns", label: "Über uns" },
    { path: "/mannschaften", label: "Mannschaften" },
    { path: "/jugend", label: "Jugend" },
    { path: "/turniere", label: "Turniere" },
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