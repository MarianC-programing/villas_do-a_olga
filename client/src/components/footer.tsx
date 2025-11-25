import { useLocation } from "wouter";
import { Facebook, Instagram, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImage from "@assets/Venta de lotes_1764035428857.png";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [location, navigate] = useLocation();

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ];

  const quickLinks = [
    { label: "Inicio", path: "/" },
    { label: "Lotes Disponibles", path: "/lotes" },
    { label: "Financiamiento", path: "/lotes#financiamiento" },
    { label: "Contacto", path: "/lotes#contacto" },
  ];

  const handleNavClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    
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
    <footer className="bg-muted border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img
                src={logoImage}
                alt="Villas Doña Olga"
                className="h-12 w-12"
              />
              <span className="font-serif text-xl font-semibold">
                Villas Doña Olga
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Construye tu futuro en un entorno natural y tranquilo. Lotes
              exclusivos con financiamiento directo y servicios incluidos.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Enlaces Rápidos</h3>
            <nav className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <Button
                  key={link.path}
                  variant="ghost"
                  className="justify-start px-0 h-auto text-muted-foreground hover:text-foreground"
                  onClick={(e) => handleNavClick(e, link.path)}
                  data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {link.label}
                </Button>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contacto</h3>
            <div className="space-y-3">
              <a
                href="tel:+1234567890"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-footer-phone"
              >
                <Phone className="h-4 w-4" />
                <span>+52 123 456 7890</span>
              </a>
              <a
                href="mailto:info@villasdonaolga.com"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-footer-email"
              >
                <Mail className="h-4 w-4" />
                <span>info@villasdonaolga.com</span>
              </a>
              <div className="flex gap-2 pt-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    data-testid={`link-footer-${social.label.toLowerCase()}`}
                  >
                    <Button variant="ghost" size="icon" className="h-9 w-9">
                      <social.icon className="h-5 w-5" />
                    </Button>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>
            © {currentYear} Villas Doña Olga. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
