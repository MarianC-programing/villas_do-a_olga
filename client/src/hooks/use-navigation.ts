import { useLocation } from "wouter";

/**
 * useNavigation — hook compartido para navegación con soporte de anclas y query params.
 */
export function useNavigation() {
  const [location, navigate] = useLocation();

  const handleNavClick = (path: string) => {
    // Condición positiva primero — elimina negación anidada (SonarCloud S1940)
    if (!path.includes("#")) {
      navigate(path);
      return;
    }

    const [route, hash] = path.split("#");

    if (location === route) {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(route);
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
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

  const navigateToContact = (lotNumber?: string) => {
    if (lotNumber) {
      navigate(`/contacto?lote=${encodeURIComponent(lotNumber)}`);
    } else {
      navigate("/contacto");
    }
  };

  return { handleNavClick, handleNavClickEvent, navigateToContact, location, navigate };
}
