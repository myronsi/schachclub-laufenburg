import { useState, useCallback, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const location = useLocation();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('auth_username');
    const storedSession = localStorage.getItem('auth_session_id');
    
    if (!storedUser || !storedSession) {
      setAuthenticated(false);
      setCheckingAuth(false);
      return;
    }

    (async () => {
      try {
        const res = await fetch('https://sc-laufenburg.de/api/auth.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'check', username: storedUser, session_id: storedSession })
        });
        const data = await res.json();
        if (res.ok && data.success) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
          localStorage.removeItem('auth_username');
          localStorage.removeItem('auth_session_id');
        }
      } catch (err) {
        setAuthenticated(false);
      } finally {
        setCheckingAuth(false);
      }
    })();
  }, [location.pathname]);

  const navItems = [
    { path: "/aktuelles", label: "Aktuelles" },
    { path: "/ueberuns", label: "Über uns" },
    authenticated 
      ? { path: "/mitgliederbereich", label: "Mitgliederbereich" }
      : { path: "/mitgliedwerden", label: "Mitglied werden" },
    { path: "/kalender", label: "Kalender" },
    { path: "/mannschaften", label: "Mannschaften" },
    { 
      path: "/turniere", 
      label: "Turniere",
      children: [
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
    { path: "/impressum", label: "Impressum" }
  ];
  
  const isActive = (path: string) => {
    if (!path) return false;
    if (location.pathname === path) return true;
    return location.pathname.startsWith(path.endsWith('/') ? path : `${path}/`);
  };

  const resolvePath = (parentPath: string, childPath: string) => {
    if (!childPath) return parentPath;
    if (childPath.startsWith(parentPath)) return childPath;
    const child = childPath.startsWith("/") ? childPath.slice(1) : childPath;
    const parent = parentPath.endsWith("/") ? parentPath.slice(0, -1) : parentPath;
    return `${parent}/${child}`;
  };

  const getActiveParentPath = () => {
    const parent = navItems.find(item => item.children && (isActive(item.path) || item.children.some(c => isActive(resolvePath(item.path, c.path)))));
    return parent ? parent.path : null;
  };

  useEffect(() => {
  }, []);

  useEffect(() => {
  }, [openSubmenu]);

  useEffect(() => {
    setOpenSubmenu(null);
  }, [location.pathname]);

  const handleMenuClick = () => {
    setIsMenuOpen((prevState) => {
      const next = !prevState;
      if (next && !openSubmenu) {
        const activeParent = getActiveParentPath();
        if (activeParent) setOpenSubmenu(activeParent);
      }
      return next;
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 bg-club-primary text-white w-full z-50" style={{ boxShadow: '0 -12px 24px rgba(0,0,0,0.24), 0 6px 12px rgba(0,0,0,0.06)' }}>
      <div className="absolute left-0 inset-y-0 pl-4 flex items-center pointer-events-auto">
        <Link to="/" aria-label="Startseite">
          <img src="/photos/logo.jpg" alt="Schachclub Laufenburg" className="h-full max-h-16 object-contain" />
        </Link>
      </div>

      <div className="hidden mdl:flex absolute left-20 inset-y-0 items-center pointer-events-auto">
        <Link to="/" className="text-2xl font-bold whitespace-nowrap">
          Schachclub Laufenburg e. V.
        </Link>
      </div>

      <div className="absolute right-0 inset-y-0 pr-4 hidden mdl:flex items-center pointer-events-none">
        <img src="/photos/part.png" alt="Part" className="h-full max-h-16 object-contain" />
      </div>

      <div className="container mx-auto px-4 py-4 pl-20 pr-16 mdl:pl-18 mdl:pr-18">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <Link to="/" className="mds:hidden text-2xl font-bold">
              Schachclub Laufenburg
            </Link>
          </div>

          <div className="flex-1 flex items-center mds:justify-center mdl:justify-end">
            <nav className="hidden mds:flex gap-8 relative mdl:mr-[10px]">
            {navItems.map((item) => {
              const parentActive = isActive(item.path) || (item.children?.some((c) => isActive(resolvePath(item.path, c.path))));

              if (item.children) {
                return (
                  <div key={item.label} className="relative group">
                    <Link
                      to={item.path}
                      className={`relative inline-block py-2 flex items-center gap-2 ${parentActive ? "text-club-accent" : "text-white"}`}
                      aria-haspopup="true"
                      aria-expanded={parentActive}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform group-hover:rotate-180 `} />
                    </Link>
                    <div className="absolute left-0 top-full w-44 bg-club-primary text-white rounded shadow-mdl opacity-0 -translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 transform transition-all duration-300 ease-out pointer-events-none group-hover:pointer-events-auto origin-top">
                      {item.children.map((sub) => {
                        const fullPath = resolvePath(item.path, sub.path);
                        return (
                          <Link
                            key={fullPath}
                            to={fullPath}
                            className={`block px-4 py-2 hover:bg-club-accent/10 ${isActive(fullPath) ? 'text-club-accent' : 'text-white'}`}
                            role="menuitem"
                          >
                            {sub.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`relative group py-2 ${isActive(item.path) ? "text-club-accent" : "text-white"}`}
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-club-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                </Link>
              );
            })}
          </nav>
          </div>

          <button
            onClick={handleMenuClick}
            className="mds:hidden absolute right-4 top-1/2 -translate-y-1/2 p-3 hover:text-club-accent transition-colors z-50"
            aria-label="Menü öffnen"
          >
            {isMenuOpen ? (
              <X size={24} className="w-6 h-6" />
            ) : (
              <Menu size={24} className="w-6 h-6" />
            )}
          </button>

          {/* Mobile Navigation */}
          <div
            ref={mobileMenuRef}
            className={`absolute left-0 right-0 top-full w-full bg-club-primary mds:hidden overflow-auto transition-all duration-300 ease-in-out transform shadow-mdl z-[100] ${
              isMenuOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
          >
            <nav className="flex flex-col items-center py-4 gap-2 px-4">
              {navItems.map((item, index) =>
                item.children ? (
                  <div
                    key={item.label}
                    className="w-full"
                    style={{
                      transitionDelay: `${index * 50}ms`,
                      opacity: isMenuOpen ? 1 : 0,
                      transform: isMenuOpen ? "translateY(0)" : "translateY(-10px)",
                    }}
                  >
                    <button
                      onClick={() => setOpenSubmenu((s) => (s === item.path ? null : item.path))}
                      className={`w-full flex items-center justify-center gap-1 py-2 px-2 transition-all ${isActive(item.path) ? "" : ""}`}
                      aria-expanded={openSubmenu === item.path}
                      aria-haspopup="true"
                      style={{
                        transitionDelay: `${index * 50}ms`,
                        opacity: isMenuOpen ? 1 : 0,
                        transform: isMenuOpen ? "translateY(0)" : "translateY(-10px)",
                      }}
                    >
                      <span className={isActive(item.path) || (item.children?.some((c) => isActive(resolvePath(item.path, c.path)))) ? "text-club-accent" : "text-white"}>{item.label}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${openSubmenu === item.path ? "rotate-180" : ""} ${(isActive(item.path) || (item.children?.some((c) => isActive(resolvePath(item.path, c.path)))) ) ? 'text-club-accent' : 'text-white'}`} />
                    </button>

                    <div className={`overflow-hidden transition-[max-height,opacity,transform] duration-300 ease-in-out transform origin-top ${openSubmenu === item.path ? "max-h-[480px] opacity-100 translate-y-0 pointer-events-auto" : "max-h-0 opacity-0 -translate-y-2 pointer-events-none"}`}>
                      <div className="flex flex-col items-center gap-1 py-2">
                        {item.children?.map((sub, si) => {
                          const fullPath = resolvePath(item.path, sub.path);
                          return (
                            <Link
                              key={fullPath}
                              to={fullPath}
                              className={`inline-block py-2 px-4 text-center transition-all ${isActive(fullPath) ? 'text-club-accent' : 'text-white'}`}
                              style={{
                                transitionDelay: `${index * 50 + 100 + si * 40}ms`,
                                opacity: openSubmenu === item.path ? 1 : 0,
                                transform: openSubmenu === item.path ? "translateY(0)" : "translateY(-6px)",
                              }}
                              onClick={() => { setIsMenuOpen(false); }}
                            >
                              {sub.label}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    to={item.path}
                    className={`relative group py-2 transition-all duration-300 w-full text-center ${
                      isActive(item.path) ? "text-club-accent" : "text-white"
                    }`}
                    style={{
                      transitionDelay: `${index * 50}ms`,
                      opacity: isMenuOpen ? 1 : 0,
                      transform: isMenuOpen ? "translateY(0)" : "translateY(-10px)",
                    }}
                    onClick={() => { setIsMenuOpen(false); }}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;