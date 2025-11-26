import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Menu, X, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import logoImage from "/Logo-villas.svg";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location, navigate] = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Inicio", path: "/" },
    { label: "Lotes Disponibles", path: "/disponibilidad" },
    { label: "Avance del Proyecto", path: "/avance" },
    { label: "Financiamiento", path: "/lotes#financiamiento" },
    { label: "Contacto", path: "/lotes#contacto" },
  ];

  const handleNavClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    if (path.includes("#")) {
      const [route, hash] = path.split("#");
      if (location !== route) {
        navigate(route);
        setTimeout(() => {
          const element = document.getElementById(hash);
          element?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        const element = document.getElementById(hash);
        element?.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(path);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <button
            onClick={(e) => handleNavClick(e, "/")}
            data-testid="link-home"
            className="flex items-center gap-2 hover-elevate active-elevate-2 rounded-md px-2 py-1 -ml-2"
          >
            <img
              src={logoImage}
              alt="Villas Doña Olga"
              className="h-10 w-10 md:h-12 md:w-12"
            />
            <span className="font-serif text-lg md:text-xl font-semibold text-foreground">
              Villas Doña Olga
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Button
                key={link.path}
                variant="ghost"
                className={`${
                  location === link.path.split("#")[0]
                    ? "text-primary"
                    : "text-foreground"
                }`}
                onClick={(e) => handleNavClick(e, link.path)}
                data-testid={`link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {link.label}
              </Button>
            ))}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              data-testid="button-theme-toggle"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>
          </nav>

          <div className="flex md:hidden items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              data-testid="button-theme-toggle-mobile"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-menu-toggle"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Button
                  key={link.path}
                  variant="ghost"
                  className={`w-full justify-start ${
                    location === link.path.split("#")[0]
                      ? "text-primary bg-primary/10"
                      : "text-foreground"
                  }`}
                  onClick={(e) => handleNavClick(e, link.path)}
                  data-testid={`link-mobile-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {link.label}
                </Button>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
