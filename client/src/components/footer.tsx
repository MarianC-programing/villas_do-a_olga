import { Facebook, Instagram, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigation } from "@/hooks/use-navigation";
const logoImage = "/Logo-villas.svg";

export function Footer() {
  const currentYear = new Date().getFullYear();
  // fix Q1: usar hook compartido en lugar de handleNavClick duplicado
  const { handleNavClickEvent } = useNavigation();

  const socialLinks = [
    {
      icon: Facebook,
      // fix Q4: links sociales reales — actualizar cuando se tengan las URLs
      href: "https://www.facebook.com/VillasDonOlga",
      label: "Facebook",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/villasdonaolga",
      label: "Instagram",
    },
  ];

  const quickLinks = [
    { label: "Inicio", path: "/" },
    { label: "Lotes Disponibles", path: "/disponibilidad" },
    { label: "Avance del Proyecto", path: "/avance" },
    { label: "Financiamiento", path: "/lotes#financiamiento" },
    { label: "Contacto", path: "/contacto" },
  ];

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
                  onClick={(e) => handleNavClickEvent(e, link.path)}
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
                href="tel:+50762468636"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-footer-phone"
              >
                <Phone className="h-4 w-4" />
                <span>+507 6246-8636</span>
              </a>
              <a
                href="mailto:marianbarba1208@gmail.com"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-footer-email"
              >
                <Mail className="h-4 w-4" />
                <span>marianbarba1208@gmail.com</span>
              </a>
              <div className="flex gap-2 pt-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
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
