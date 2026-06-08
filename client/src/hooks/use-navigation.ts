import { useLocation } from "wouter";

/**
 * useNavigation — hook compartido para navegación con soporte de anclas y query params.
 *
 * fix Q1: eliminar duplicación de lógica de navegación (DRY)
 * S2-U1: agrega navigateToContact(lotNumber) para pre-llenar el formulario
 */
export function useNavigation() {
  const [location, navigate] = useLocation();

  const handleNavClick = (path: string) => {
    if (path.includes("#")) {
      const [route, hash] = path.split("#");
      if (location !== route) {
        navigate(route);
        setTimeout(() => {
          document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(path);
    }
  };

  const handleNavClickEvent = (
    e: React.MouseEvent,
    path: string,
    onNavigate?: () => void,
  ) => {
    e.preventDefault();
    onNavigate?.();
    handleNavClick(path);
  };

  /**
   * S2-U1: navega a /contacto con el número de lote como query param.
   * ContactForm lo lee para pre-llenar el mensaje con el lote seleccionado.
   * Ejemplo: navigateToContact("LR C12") → /contacto?lote=LR%20C12
   */
  const navigateToContact = (lotNumber?: string) => {
    if (lotNumber) {
      navigate(`/contacto?lote=${encodeURIComponent(lotNumber)}`);
    } else {
      navigate("/contacto");
    }
  };

  return { handleNavClick, handleNavClickEvent, navigateToContact, location, navigate };
}
