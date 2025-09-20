import { useState, useCallback } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { navItems } from "./arrays/navItems";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const resolvePath = (parentPath: string, childPath: string) => {
    if (!childPath) return parentPath;
    if (childPath.startsWith(parentPath)) return childPath;
    const child = childPath.startsWith("/") ? childPath.slice(1) : childPath;
    const parent = parentPath.endsWith("/") ? parentPath.slice(0, -1) : parentPath;
    return `${parent}/${child}`;
  };

  const handleMenuClick = useCallback(() => {
    setIsMenuOpen((prevState) => !prevState);
  }, []);

  return (
    <header className="sticky top-0 bg-club-primary text-white py-4 w-full z-50" style={{ boxShadow: '0 -12px 24px rgba(0,0,0,0.24), 0 6px 12px rgba(0,0,0,0.06)' }}>
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center">
          
          {/* Mobile Link */}
          <Link to="/" className="lg:hidden text-2xl font-bold">
            Schachclub Laufenburg
          </Link>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={handleMenuClick}
              className="p-3 hover:text-club-accent transition-colors"
              aria-label="Menü öffnen"
            >
              {isMenuOpen ? (
                <X size={24} className="w-6 h-6" />
              ) : (
                <Menu size={24} className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex gap-8">
            {navItems.map((item) => {
              const parentActive = isActive(item.path) || (item.children?.some((c) => isActive(resolvePath(item.path, c.path))));

              if (item.children) {
                return (
                  <div key={item.label} className="relative group">
                    <Link
                      to={item.path}
                      className={`relative inline-block py-2 ${parentActive ? "text-club-accent" : "text-white"}`}
                      aria-haspopup="true"
                      aria-expanded={parentActive}
                    >
                      {item.label}
                    </Link>

                    <div className="absolute left-0 top-full w-44 bg-club-primary text-white rounded shadow-lg opacity-0 -translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 transform transition-all duration-300 ease-out pointer-events-none group-hover:pointer-events-auto origin-top">
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

          {/* Mobile Navigation */}
          <div
            className={`absolute left-0 right-0 top-full w-full bg-club-primary lg:hidden overflow-auto transition-all duration-300 ease-in-out transform shadow-lg z-[100] ${
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
                      <span className={isActive(item.path) ? "text-club-accent" : "text-white"}>{item.label}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${openSubmenu === item.path ? "rotate-180" : ""}`} />
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
                              onClick={() => { setIsMenuOpen(false); setOpenSubmenu(null); }}
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
                    onClick={() => setIsMenuOpen(false)}
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